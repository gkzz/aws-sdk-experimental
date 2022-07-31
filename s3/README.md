# aws-sdk-experimental-s3

```
$ aws --endpoint-url=http://localhost:4566 --profile example s3api create-bucket --bucket localstack-experimental-bucket
$ npx ts-node src/index.ts
```

```
$ cat ~/.aws/config
[profile example]
aws_access_key_id = dummy
aws_secret_access_key = dummy
$ direnv edit .
export AWS_PROFILE=example
export REGION=<region>
export AWS_SDK_LOAD_CONFIG=true
export ENDPOINT_URL=http://localhost:4566
```

- [What's the AWS SDK for JavaScript? - AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
- [AWS SDK for JavaScriptでS3にファイルをアップロードする - くらげになりたい。](https://www.memory-lovers.blog/entry/2021/11/19/025610)
