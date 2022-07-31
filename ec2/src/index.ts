// Import required AWS SDK clients and commands for Node.js
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/index.html
import {
    EC2Client,
    DescribeInstancesCommand
} from "@aws-sdk/client-ec2";
import {fromIni} from "@aws-sdk/credential-providers";

// Set the parameters
if (typeof process.env["INSTANCE_IDS"] === "undefined") {
    throw new Error("Invalid instance_ids");
}
const instance_ids: string[] | undefined = process.env["INSTANCE_IDS"].split(" ");
if (typeof instance_ids === "undefined") {
    throw new Error("Invalid instance_ids");
}
const params: {[InstanceIds: string] :string[]}= { InstanceIds: instance_ids };

export async function main(){
    const ec2Client = new EC2Client({
      credentials: fromIni({profile: "sdk-user"}),
      region: process.env["REGION"] });
    const describeInstancesCommandOutput = await ec2Client
      .send(new DescribeInstancesCommand(params))
      .then((instance) => {
          console.log(JSON.stringify(instance, null, 2));
          return instance;
      })
      .catch((error) => {
          console.error("Describe the EC2 Instance error!! \n\n", error);
      });

    return describeInstancesCommandOutput;
};
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
})
