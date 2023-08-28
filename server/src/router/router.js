import { Router } from "express";
import * as controller from '../controllers/appController.js';
import { Auth, localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mail.js"
import * as profileController from "../controllers/portfolioController.js"
const router = Router();

/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app


// /** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


// /** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

// ===============================portfolio============================
router.route('/getdata').get(profileController.getdata);
router.route('/getdata/:user').get(profileController.getdata);

router.route('/setdata').post(profileController.setdata);
router.route('/updatedata/:user').put(profileController.updatedata);
router.route('/deletedata/:user').delete(profileController.deletedata);

router.route('/setexpdata/:user').post(profileController.setexpdata);
router.route('/updateexpdata/:user').put(profileController.updateexpdata);
router.route('/deleteexpdata/:user/:index').delete(profileController.deleteexpdata);

router.route('/setprojectdata/:user').post(profileController.setprojectdata);
router.route('/updateprojectdata/:user').put(profileController.updateprojectdata);
router.route('/deleteprojectdata/:user/:index').delete(profileController.deleteprojectdata);

export default router;