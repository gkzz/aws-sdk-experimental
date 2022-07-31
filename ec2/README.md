# aws-sdk-experimental-ec2

```
$ direnv edit .
export AWS_PROFILE=sdk-user
export REGION=ap-northeast-1
export AWS_SDK_LOAD_CONFIG=true
export INSTANCE_IDS="id1 id2"
#export INSTANCE_IDS="id1"
$ direnv allow
$ npm install
$ npx ts-node src/index.ts  | jq -r '.Reservations[].Instances[] | {LaunchTime: .LaunchTime, State: .State.Name}'
{
  "LaunchTime": "xxxxxx",
  "State": "stopped"
}
{
  "LaunchTime": "xxxxxx",
  "State": "running"
}
```

- [EC2 Client - AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/index.html)
- [AWS SDK for JavaScript v3で多要素認証(MFA)をしてAssumeRole(スイッチロール)やEC2インスタンスを作成してみた | DevelopersIO](https://dev.classmethod.jp/articles/aws-sdk-for-javascript-v3-assume-role-and-create-ec2-instance/)
