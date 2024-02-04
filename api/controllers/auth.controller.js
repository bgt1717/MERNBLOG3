import { errorHandler } from '../../utils/error.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    // return res.status(400).json({ message: 'All fields are required' });
    next(errorHandler(400,'All fields required.'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username, //After ES6, don't need to put username:username if key value is similar. 
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Tries to find a user in the database by the provided email using User.findOne({ email }). If no user is found with 
    // The provided email, it returns a 404 error using the errorHandler middleware with a message "User not found"
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    // Compares the password from the body and from the database. bcrypt compares the hashed in DB and the entered password 
    // If the user exists, validPassword is valid. 
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    //_id from each user is unique in MongoDB. Used to authenticate the user. 
    // No expiration for token. {expiresIn: '1d'}. Token will expire when user closes window.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    // Doesn't return the password in post request. 
    // It omits the password field from the user object and extracts the remaining fields into a new object.
    // validUser._doc is accessing the underlying JavaScript object representing the user retrieved from the database, which contains the user's data. 
    // It's used to destructure the user object and extract its properties, excluding the password, into a new object for response.
    const { password: pass, ...rest } = validUser._doc;
    //..rest syntax is used in an object destructuring assignment. This syntax is used to gather the remaining properties of an object into a new object. 

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      //responds with the rest in JSON. 
      .json(rest);
  } catch (error) {
    next(error);
  }
};