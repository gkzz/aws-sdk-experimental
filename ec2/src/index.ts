// Import required AWS SDK clients and commands for Node.js
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/index.html
import {
    EC2Client,
    RunInstancesCommand,
    RunInstancesCommandInput,
    DescribeInstancesCommand,
  TerminateInstancesCommand
} from "@aws-sdk/client-ec2";
import {fromIni} from "@aws-sdk/credential-providers";

// Set the parameters
/*
if (typeof process.env["INSTANCE_IDS"] === "undefined") {
    throw new Error("Invalid instance_ids");
}
const instance_ids: string[] | undefined = process.env["INSTANCE_IDS"].split(" ");
if (typeof instance_ids === "undefined") {
    throw new Error("Invalid instance_ids");
}
const params: {[InstanceIds: string] :string[]}= { InstanceIds: instance_ids };
*/

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/runinstancescommandinput.html
const runInstancesCommandInput: RunInstancesCommandInput ={
  ImageId: "ami-059755f6af2e54b66",
  InstanceType: "t2.micro",
  MinCount: 1,
  MaxCount: 1,
  TagSpecifications: [
    {
      ResourceType: "instance",
      Tags: [
        {
          Key: "Name",
          Value: "gkzz-ec2",
        },
      ],
    },
  ],
};

export async function main(){
    const ec2Client = new EC2Client({
      credentials: fromIni({profile: "sdk-user"}),
      region: process.env["REGION"] });

    const runInstancesCommandOutput = await ec2Client
      .send(new RunInstancesCommand(runInstancesCommandInput))
      .catch((error) => {
      console.error("Create EC2 Instance error!! \n\n", error);
    });
    if (!runInstancesCommandOutput) {
      throw new Error("Failed to run Instance");
    };

    const instanceId = <string>(
      runInstancesCommandOutput?.Instances?.[0]?.InstanceId
    );

    const describeInstancesCommandOutput = await ec2Client
      .send(new DescribeInstancesCommand({ InstanceIds: [instanceId] }))
      .then((instance) => {
          console.log(JSON.stringify(instance, null, 2));
          return instance;
      })
      .catch((error) => {
          console.error("Failed to describe the EC2 Instance error!! \n\n", error);
      });

    const terminateInstanceCommandOutput = await ec2Client
      .send(new TerminateInstancesCommand({ InstanceIds: [instanceId]  }))
      .then((instance ) => {
        console.log(JSON.stringify(instance, null, 2));
        return instance;
      })
      .catch((error) => {
        console.error("Failed to terminate EC2 Instance! \n\n", error);
      });

    return terminateInstanceCommandOutput;
};
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
})
