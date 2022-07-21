import { s3Client } from "./sampleClient.js";
import  { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { envConfig } from "./envConfig.js";

 export const uploadImage = async (name, image, type) => {
    // Set the parameters
    const params = {
  Bucket: envConfig.aws.bucketName, 
  Key: name + '.' + type, 
  Body: image,
  ContentType: type,
  ACL: 'public-read'
  
};
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params))
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteImage = async (key) => {
  
  const params = {
  Bucket: envConfig.aws.bucketName, 
  Key: key
};

try {
  const results = await s3Client.send(new DeleteObjectCommand(params))
  return results; // For unit tests.
} catch (err) {
  console.log("Error", err);
}
};




