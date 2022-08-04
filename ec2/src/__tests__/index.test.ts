import { EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  TerminateInstancesCommand,
} from "@aws-sdk/client-ec2";
import { main, runInstancesCommandInput } from "../index";
import { mockClient } from "aws-sdk-client-mock";

const ec2ClientMock = mockClient(EC2Client);
beforeEach(() => {
  ec2ClientMock.reset()
})
afterEach(() => {
  ec2ClientMock.restore();
});

const dummyOutput = {
  $metadata: {
    httpStatusCode: 200,
  },
  TerminatingInstances: [{
    CurrentState: {
      "Code": 32,
      "Name": "shutting-down"
    },
    InstanceId: "i-0000dummy",
    PreviousState: {
      "Code": 32,
      "Name": "shutting-down"
    }
  }]
}

// https://jestjs.io/docs/tutorial-async#asyncawait
describe("run main", () => {
  it("run main", async () => {
    ec2ClientMock
        .on(RunInstancesCommand, runInstancesCommandInput)
        .resolves({
          $metadata: {
            httpStatusCode: 200,
          },
          Instances: [{"InstanceId": "i-0000dummy"}]})
    ec2ClientMock
        .on(DescribeInstancesCommand, { InstanceIds: ["i-0000dummy"] })
        .resolves({
          $metadata: {
            httpStatusCode: 200,
          }})
    ec2ClientMock
        .on(TerminateInstancesCommand, { InstanceIds: ["i-0000dummy"] })
        .resolves(dummyOutput)

    const ret = await main();
    expect(ret).toBe(dummyOutput["TerminatingInstances"][0]);

    expect(ec2ClientMock).toHaveReceivedCommandTimes(RunInstancesCommand, 1);
    expect(ec2ClientMock).toHaveReceivedCommandTimes(DescribeInstancesCommand, 0);
    expect(ec2ClientMock).toHaveReceivedCommandTimes(TerminateInstancesCommand, 1);
  });
});
