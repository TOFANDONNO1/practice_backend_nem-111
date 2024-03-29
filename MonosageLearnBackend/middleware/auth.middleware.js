const jwt=require("jsonwebtoken");

const auth=(req,res,next) => {
    const token=req.headers.authorization;
     if(token){
        try {
            const decoded=jwt.verify(token.split(" ")[1],'monosage');
            if(decoded){
                req.body.authorID=decoded.authorID
                req.body.author=decoded.author
                // console.log(decoded);
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        } catch (error) {
            res.send({"err":error.message})
        }
     }else{
        res.send({"msg":"Please Login"})
     }
};


module.exports ={
    auth
}