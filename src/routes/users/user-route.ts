import { Router } from "express";
import UserController from "../../controller/users/user-controller";
import middleware, { IRequest } from '../../middleware/middleware';
interface IError {
  field?: string;
  error: string | string[];
}

function checkFields(username: string | undefined, password: string | undefined): IError[]{
  const errors: IError[] = [];

  if(!username){
    errors.push({
      field: "username",
      error: "username (string) is a required field"
    });
  }

  if(!password){
    errors.push({
      field: "password",
      error: "password is a required field"
    })
  }

  return errors;
}

const router = Router();
/**
 * Sign up a new user
 * Route /api/users/signup
 * Method Post
 * Body: { username: string, password: string }
 */
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  const errors = checkFields(username, password);

  if(errors.length > 0){
    return res.status(400).json(errors);
  }

  const { error, token } = await UserController.newUser(username, password);

  if(error){
    return res.status(400).json({error});
  } else {
    return res.json({ token })
  }
})

/**
 * get current user
 * route /api/users
 * method GET
 * auth header in the format of Bearer <token> required
 */
router.get('/', middleware.ensureAuth, (req, res) => {
  const user = (req as IRequest).user
  return res.json({
    user: {
      id: user._id,
      username: user.username
    }
  })
})

/**
 * login a user
 * route /api/users/login
 * method Post
 */
router.post('/login', async (req,res) => {
  const { username, password } = req.body;
  
  const errors = checkFields(username, password);

  if(errors.length > 0){
    return res.status(400).json(errors);
  }

  const { error, token } = await UserController.loginUser(username, password);

  if(error){
    console.log(error);
    return res.status(400).json({error: error.message});
  } else {
    return res.json({ token })
  }
});
export default router;