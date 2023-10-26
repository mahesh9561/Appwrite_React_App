import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwwriteUrl)
      .setProject(conf.appwwritePROJECTID);
    this.account = new Account(this.client);
  }

  //   Create Account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call Another Method Login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //   Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  //   Check
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      //   throw error;
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  //   Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: Logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService