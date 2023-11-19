import conf from "../conf/conf";
import { Client, Account, Databases, Storage, Query, ID } from "appwrite";

// const client = new Client();
// const databases = new Databases(client);
// client
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('5df5acd0d48c2') // Your project ID
// ;
// const promise = databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]', {});
// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   CreatePost
  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      await this.databases.createDocument(
        // [DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Services createPost :: ", error);
    }
  }

  //   Update Post
  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Services UpdatePost :: ", error);
    }
  }

  //   Delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Services DeltePost :: ", error);
      return false;
    }
  }

  //   GetPost
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Services GetPost :: ", error);
    }
  }

  //   ListPost
  async listPost(queries = [(Query.equal = ("status", "active"))]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Services GetPost :: ", error);
    }
  }

  //   -------------File Upload Services--------------------
  //   Upload File
  async uploadFile(fileId) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        fileId
      );
    } catch (error) {
      console.log("Appwrite Services UploadFile :: ", error);
      return false;
    }
  }

  //   Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Services DeleteFile :: ", error);
      return false;
    }
  }

  //   Preview FIle
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}
