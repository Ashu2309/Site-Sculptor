import jwt from "jsonwebtoken"

export const Auth=async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token,"secret")
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).send({err:"Authentication Failed"})
    }
}

export const localVariables=(req,res,next)=>{
    req.app.locals={ 
        OTP:null,
        resetSession:false
    }
    next()
}