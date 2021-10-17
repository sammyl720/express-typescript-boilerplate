import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import users from '../../data/user';
import IUser from '../../model/product/user-model';
import { v4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'notAG00dS3cr3t';

export default class UserController {
  static newUser(username: string, password: string){
    // check if user with given username already exists
    const userAlreadyExists = users.findIndex(user => user.username == username);
    if(userAlreadyExists !== -1){
      const error = { message: `User with username ${username} already exists` };
      return { error, token: null }
    }

    // hash the password
    const hashPassword = bcryptjs.hashSync(password, 12);

    // create new user;

    const newUser: IUser = {
      id: v4(),
      password: hashPassword,
      username
    }

    // save the user to in memory data
    users.push(newUser);

    return {
      error: null,
      token: this.genereteUserToken(newUser)
    }
  }

  static loginUser(username: string, password: string){
    const user = users.find(u => u.username === username);
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
  
  static getUserFromToken(token: string){
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return decoded.user as IUser;
  }

  /**
   * 
   * @param user IUser
   * @param expiresIn time to expiration
   * @returns a jwt token
   */
  static genereteUserToken(user: IUser, expiresIn: string | number | undefined = '2d'){
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn })

    return token;
  }
}