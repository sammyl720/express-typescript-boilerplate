import IUser from "../model/user/user-model";;
import UserModel from "./models/user";

export default class UserData {
  static async GetUser(userId: string){
    
    const user = await UserModel.findById(userId).select('-password')
    return user || null;
  }

  static async AddUser(user: Omit<IUser, 'id'>){
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }
}