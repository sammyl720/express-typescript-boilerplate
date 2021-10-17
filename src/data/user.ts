import IUser from "../model/user/user-model";
import fs from 'fs';
import path from "path";

export default class UserData {
  private static _filePath = path.resolve(__dirname, 'users-data.json');
  protected static _getUsers(){
    const jsonUsers = fs.readFileSync(UserData._filePath, 'utf-8');
    const users = JSON.parse(jsonUsers) as IUser[];
    return users;
  }
  static GetUser(userId: string){
    const user = UserData._getUsers().find(u => u.id === userId);
    return user || null;
  }

  static AddUser(user: IUser){
    const users = UserData._getUsers();
    users.push(user);
    fs.writeFileSync(UserData._filePath, JSON.stringify(users, null, 2));
  }
}