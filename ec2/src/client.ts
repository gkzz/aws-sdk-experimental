import {
    EC2Client,
    RunInstancesCommand,
    RunInstancesCommandInput,
    RunInstancesCommandOutput,
    DescribeInstancesCommand,
    DescribeInstancesCommandOutput,
    TerminateInstancesCommand,
    TerminateInstancesCommandOutput,
    InstanceStateChange
} from "@aws-sdk/client-ec2";
import { fromIni } from "@aws-sdk/credential-providers";

export class Client {
    constructor(private readonly ec2Client: EC2Client = new EC2Client({
        credentials: fromIni({profile: "sdk-user"}),
        region: process.env["REGION"]
    })) {}

    async runInstance(cmd: RunInstancesCommandInput): Promise<RunInstancesCommandOutput | void> {
        const output: RunInstancesCommandOutput | void = await this.ec2Client
            .send(new RunInstancesCommand(cmd))
            .catch((error) => {
                console.error("Create EC2 Instance error!! \n\n", error);
            });
        if (!output) {
            throw new Error("Failed to run the EC2 Instance");
        }
        //console.log(`output: ${JSON.stringify(output, null, 2)}`);
        return output;
    }

    async describeInstance(instanceIds: string[] | undefined): Promise<DescribeInstancesCommandOutput | void> {
        const output: DescribeInstancesCommandOutput | void = await this.ec2Client
            .send(new DescribeInstancesCommand({ InstanceIds: instanceIds }))
            .then((instance) => {
                //console.log(JSON.stringify(instance, null, 2));
                return instance;
            })
            .catch((error) => {
                console.error("Failed to describe the EC2 Instance error!! \n\n", error);
            });
        if (!output) {
            throw new Error("Failed to describe the EC2 Instance");
        }
        return output;
    }

    async terminateInstance(instanceIds: string[] | undefined): Promise<TerminateInstancesCommandOutput | void> {
        const output: TerminateInstancesCommandOutput | void = await this.ec2Client
            .send(new TerminateInstancesCommand({ InstanceIds: instanceIds  }))
            .then((instance ) => {
                //console.log(JSON.stringify(instance, null, 2));
                return instance;
            })
            .catch((error) => {
                console.error("Failed to terminate EC2 Instance! \n\n", error);
            });
        if (!output) {
            throw new Error("Failed to terminate the EC2 Instance");
        }
        return output;
    }

    parseTerminateInstanceOutput(output: TerminateInstancesCommandOutput | void): InstanceStateChange {
        const result: InstanceStateChange | undefined = output?.TerminatingInstances?.[0];
        if (
          result === undefined
          || result.InstanceId === undefined
          || result.CurrentState === undefined
          || result.PreviousState === undefined) {
            throw new Error("Failed to parse terminated the EC2 Instance");
        }
        return result;
    }
}