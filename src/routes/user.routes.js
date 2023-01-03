import {Router} from 'express'
import {createUser, getUsers, getUser} from "../controllers/user.controller";
import {checkExistingRoles, checkExistingUser} from "../middlewares/verifySignup"
import {verifyToken, isAdmin} from "../middlewares/authJwt"
const router = Router()


router.get('/',[verifyToken, isAdmin], getUsers);
router.post('/',[verifyToken, isAdmin, checkExistingUser, checkExistingRoles], createUser)
router.get('/:userId', [verifyToken, isAdmin], getUser)

export default router;