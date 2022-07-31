import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    ListObjectsCommand,
    ListObjectsCommandInput,
    DeleteObjectsCommand,
    DeleteObjectsCommandInput
} from "@aws-sdk/client-s3";

export async function main(){
    const BUCKET = "localstack-experimental-bucket";

    const s3Client = new S3Client({
        region: process.env["REGION"],
        endpoint: process.env["ENDPOINT_URL"],
        forcePathStyle: true });

// アップロード: PutObjectCommand
    const uploadParams: PutObjectCommandInput = {
        Bucket: BUCKET,
        Key: "your/file.txt",
        Body: "File Contents"
    };
    const uploadRes = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", uploadRes);


// 一覧の取得: ListObjectsCommand
    const listParams: ListObjectsCommandInput = {
        Bucket: BUCKET,
        Prefix: "my",
    };
    const listRes = await s3Client.send(new ListObjectsCommand(listParams));
    console.log("Success", listRes); // listRes.Contentsにファイルの情報が含まれる


// 削除: DeleteObjectsCommand
    const deleteParams: DeleteObjectsCommandInput = {
        Bucket: BUCKET,
        Delete: { Objects: [{ Key: "your/file.txt" }] },
    };
    const deleteRes = await s3Client.send(new DeleteObjectsCommand(deleteParams));
    console.log("Success", deleteRes);
}

main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});


