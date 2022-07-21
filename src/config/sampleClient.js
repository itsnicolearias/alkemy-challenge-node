import  { S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "./envConfig.js";



// Create an Amazon S3 service client object.
 export const s3Client = new S3Client({
     region: envConfig.aws.region,
     accessKeyId: envConfig.aws.accessKey,
     secretAccessKey: envConfig.aws.secretKey
     
    
 });