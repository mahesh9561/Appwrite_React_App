import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwwriteUrl)
      .setProject(conf.appwwritePROJECTID);
    this.databases = new Databases();
  }

  // Create Post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwwriteDATABASEID,
        conf.appwwriteCOLLECTIONID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  // Update
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwwriteDATABASEID,
        conf.appwwriteCOLLECTIONID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: UpdatePost :: error ", error);
    }
  }

  // Delete
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwwriteDATABASEID,
        conf.appwwriteCOLLECTIONID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeletePost :: error ", error);
      return false;
    }
  }

  // GetDocument
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwwriteDATABASEID,
        conf.appwwriteCOLLECTIONID,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: GetPost :: error ", error);
      return false;
    }
  }

  // ListDocument
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwwriteDATABASEID,
        conf.appwwriteCOLLECTIONID,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: ListData :: error ", error);
      return false;
    }
  }

  // File Upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwwriteBUCKETID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: ListData :: error ", error);
      return false;
    }
  }

  // Delete File
  async deleteFile(fileid) {
    try {
      return await this.bucket.deleteFile(conf.appwwriteBUCKETID, fileid);
    } catch (error) {
      console.log("Appwrite service :: ListData :: error ", error);
      return false;
    }
  }

  // File Preview
  getFilePreview(fileid){
    return this.bucket.getFilePreview(
      conf.appwwriteBUCKETID,
      fileid
    )
  }
}

const service = new Service();
export default Service;
