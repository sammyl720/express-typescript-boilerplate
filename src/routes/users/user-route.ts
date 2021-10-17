import { Router } from "express";
import UserController from "../../controller/users/user-controller";

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
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  const errors = checkFields(username, password);

  if(errors.length > 0){
    return res.status(400).json(errors);
  }

  const { error, token } = UserController.newUser(username, password);

  if(error){
    return res.status(400).json({error});
  } else {
    return res.json({ token })
  }
})

/**
 * login a user
 * route /api/users/login
 * method Post
 */
router.post('/login', (req,res) => {
  const { username, password } = req.body;
  
  const errors = checkFields(username, password);

  if(errors.length > 0){
    return res.status(400).json(errors);
  }

  const { error, token } = UserController.loginUser(username, password);

  if(error){
    console.log(error);
    return res.status(400).json({error: error.message});
  } else {
    return res.json({ token })
  }
});
export default router;