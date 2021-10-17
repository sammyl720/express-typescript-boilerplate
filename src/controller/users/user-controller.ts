import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import IUser from '../../model/user/user-model';
import { v4 } from 'uuid';
import UserModel from '../../data/models/user';
import UserData from '../../data/user';

const JWT_SECRET = process.env.JWT_SECRET || 'notAG00dS3cr3t';

export default class UserController extends UserData {
  static async newUser(username: string, password: string){
    // check if user with given username already exists
    const userAlreadyExists = await UserModel.findOne({ username })
    if(userAlreadyExists){
      const error = { message: `User with username ${username} already exists` };
      return { error, token: null }
    }

    // hash the password
    const hashPassword = bcryptjs.hashSync(password, 12);

    // create new user;

    const newUser: Omit<IUser, "id"> = {
      password: hashPassword,
      username
    }

    // save the user to db data
    const dbUser = await UserController.AddUser(newUser);
    return {
      error: null,
      token: this.genereteUserToken(dbUser)
    }
  }

  static async loginUser(username: string, password: string){
    const user = await UserModel.findOne({ username })
    // check if user exists
    if(!user) {
      return {
        error: {
          message: "Invalid Credentials"
        },
        token: null
      }
    }

    // compare given password with user hashed password
    const passwordIsValid = bcryptjs.compareSync(password, user.password)

    if(!passwordIsValid){
      return {
        error: {
          message: "Invalid Credentials"
        },
        token: null
      }
    }

    // now that there is a user with the correct password
    // return jwt token
    return {
      error: null,
      token: this.genereteUserToken(user)
    }
  }

  /**
   * will throw an error if token can't be verified
   * @param token a JWT Token
   * @returns user IUser
   */
  
  static async getUserFromToken(token: string){
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const user = await UserController.GetUser(decoded.user.id);
    return user as Omit<IUser, "password">;
  }

  /**
   * 
   * @param user IUser
   * @param expiresIn time to expiration
   * @returns a jwt token
   */
  static genereteUserToken(user: IUser, expiresIn: string | number | undefined = '2d'){
    // set id prop from mongoose getter id
    const filteredUser: Omit<IUser, "password"> = {
      username: user.username,
      id: user.id
    }
    const token = jwt.sign({ user: filteredUser }, JWT_SECRET, { expiresIn })

    return token;
  }
}