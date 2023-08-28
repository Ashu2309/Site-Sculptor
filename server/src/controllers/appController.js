import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator"

// middleware
export const verifyUser = async (req, res, next) => {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(500).send({ error: "Cant find User" })
        next();

    } catch (error) {
        res.status(500).send({ error: "Authentication error" })
    }
}

export const register = async (req, res) => {
    const { username, password, email, profile } = req.body;
    if (password) {
        bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
                const user = new UserModel({
                    username,
                    password: hashedPassword,
                    email,
                });

                // return save result as a response
                user
                    .save()
                    .then((result) =>
                        res.status(201).send({ msg: "User Register Successfully" })
                    )
                    .catch((error) => res.status(500).send({ error }));
            })
            .catch((err) => {
                return res.status(500).send({
                    error: "unable to hashed password",
                });
            });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then((user) => {
                bcrypt.compare(password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck) {
                            res.status(500).send({ err: "Password doesn't match" });
                        }
                        else {
                            const token = jwt.sign({
                                userId: user._id,
                                username: user.username
                            }, "secret", { expiresIn: "24h" })

                            return res.status(201).send({ msg: "User Logged in Successfully", username: username, token })
                        }

                    })
                    .catch(err => {
                        res.status(500).send({ err: "Password doesn't match" });
                    })


            })
            .catch(err => {
                res.status(500).send({ err: "Username not found" });
            })

    } catch (error) {
        res.status(500).send({ error });
    }
}

export const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        if (!username) return res.status(500).send({ error: "Invalid Username" })

        UserModel.findOne({ username })
            .then((user) => {
                if (!user) {
                    res.status(500).send({ error: "Invalid Username" });
                }
                else {
                    const { password, ...rest } = Object.assign({}, user.toJSON());
                    return res.status(200).send(rest);
                }
            })
    } catch (error) {
        res.status(500).send({ error: "Cannot Find User" });
    }
}

export const updateUser = (req, res) => {
    try {
        const { userId } = req.user;

        if (userId) {
            const body = req.body;
            UserModel.findByIdAndUpdate({ _id: userId }, body).then((user) => {
                if (!user) {
                    res.status(500).send({ error: "Invalid ID" });
                }
                else {
                    return res.status(200).send({ msg: "Updated Successfully" });
                }
            })
        }
        else {
            res.status(500).send({ error: "Cannot get ID" });
        }

    } catch (error) {
        res.status(500).send({ error: "Cannot Update User" });
    }
}

export const generateOTP = async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ "code": req.app.locals.OTP })
}

export const verifyOTP = async (req, res) => {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSessions = true;
        return res.status(200).send("OTP verified");
    }
    return res.status(400).send("Invalid OTP sorry!");
}

export const createResetSession = (req, res) => {
    if (req.app.locals.resetSessions) {
        req.app.locals.resetSessions = false;
        res.status(200).send({ msg: "Access Granted" })
    }
    res.status(500).send("Session Expired")
}

export const resetPassword = (req, res) => {
    try {
        // if(!req.app.locals.resetSessions) res.send("Invalid user!").status(500)
        try {
            const { username, password } = req.body;
            bcrypt.hash(password, 10).then(hashedPassword => {

                UserModel.updateOne({ username: username }, { password: hashedPassword }).then(() => {
                    res.status(200).send("Record Updated")
                    req.app.locals.resetSessions = false;

                }).catch((err) => {
                    res.status(400).send(err)
                })

            })


        } catch (error) {
            res.status(400).send("Cannot reset password!")
        }
    } catch (error) {
        res.status(500).send(error)
    }

}