import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
// '/deletepost/:postId/:userId': This is the route path pattern. It specifies that this route will match requests to a URL that looks like /deletepost/somePostId/someUserId, where :postId and :userId are placeholders for actual values that will be provided in the request.
// verifyToken: This is a middleware function that likely verifies the authenticity of a user's token before allowing access to the route.
// deletepost: This is the name of the function that will handle requests to this route. It's assumed to be defined elsewhere in the code.
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


export default router;