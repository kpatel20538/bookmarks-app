const Minio = require("minio");

const storage = new Minio.Client({
  endPoint: process.env.MINIO_SERVICE_HOST,
  port: parseInt(process.env.MINIO_SERVICE_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const STORAGE_ENDPOINT = "https://minio-kpatel20538.cloud.okteto.net";
const STORAGE_BUCKET = "screenshots";

const upload = async (objectName, object) => {
  await storage.putObject(STORAGE_BUCKET, objectName, object);
  return `${STORAGE_ENDPOINT}/${STORAGE_BUCKET}/${objectName}`;
};

module.exports = upload;