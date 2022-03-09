const { BlobServiceClient } = require("@azure/storage-blob");

const AZURE_STORAGE_CONNECTION_STRING = process.env.MyStorageAccountAppSetting;
const AZURE_STORAGE_SERVER_URL = process.env.AZURE_STORAGE_SERVER_URL;
var AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
var data = [];

module.exports = function (context, req) {
  async function getBlobs() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(
      AZURE_STORAGE_CONTAINER_NAME
    );

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
      myObj = new Object();
      myObj.name = blob.name;
      myObj.blobType = blob.properties.blobType;
      myObj.contentType = blob.properties.contentType;
      myObj.size = blob.properties.contentLength;
      myObj.id = blob.properties.etag;
      myObj.createdOn = blob.properties.createdOn;
      myObj.lastModified = blob.properties.lastModified;
      myObj.leaseState = blob.properties.leaseState;
      myObj.leaseStatus = blob.properties.leaseStatus;
      myObj.serverEncrypted = blob.properties.serverEncrypted;

      myObj.processed = false;
      myObj.isActive = blob.deleted === undefined ? false : true;
      myObj.url =
        AZURE_STORAGE_SERVER_URL +
        AZURE_STORAGE_CONTAINER_NAME +
        "/" +
        blob.name;

      data.push(myObj);
    } // end for
    context.log("Node.js Blob trigger function processed");

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: data,
    };
    context.done();
  }
  getBlobs();
};
