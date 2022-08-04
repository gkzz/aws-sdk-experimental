// Import required AWS SDK clients and commands for Node.js
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/index.html

import {
  InstanceStateChange,
  RunInstancesCommandInput
} from "@aws-sdk/client-ec2";
import { Client  } from "./client"

export const runInstancesCommandInput: RunInstancesCommandInput ={
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
    const client = new Client();
    const res = await client.runInstance(runInstancesCommandInput);
    const instanceId = <string>(
        res?.Instances?.[0]?.InstanceId
    );
    //console.log(`instanceId: ${instanceId}`);
    //console.log(`describeInstance: ${JSON.stringify(await client.describeInstance([instanceId]), null, 2)}`);
    const output = await client.terminateInstance([instanceId])
    //console.log(`output: ${JSON.stringify(output, null, 2)}`);
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

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
})
