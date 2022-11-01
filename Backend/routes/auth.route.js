const router=require('express').Router();
const passport=require('passport');
const users = require('../schema/auth.schema');
router.get("/",authMiddleware, async (req,res)=>{
    let u = await users.find()
    res.send(u);
})
router.get("/:id",authMiddleware, async (req,res)=>{
    let id=req.params.id ;
    let u = await users.find({_id:id})
    res.send(u);
})
router.delete("/", authMiddleware, async(req,res)=>{
    let id = req.userId;
    let delete_user = await users.deleteOne({id});
    res.send("User Id deleted Successfully!");
})
router.patch("/", authMiddleware, async(req,res)=>{
    let id = req.userId;
    let update = await users.updateOne({"_id":id},{$set: {...req.body}});
    res.send("User Details Updated Successfully!"+ update);
})
router.patch("/:id", authMiddleware, async(req,res)=>{
    let id = req.userId;
    let update = await users.updateOne({"_id":id},{$set: {...req.body}});
    res.send(update);
})
router.post("/login", async (req,res)=>{
    let { email, password } = req.body;
    try {
        let user = await users.findOne({"email":email,"password": password});
        if(!user){
            let e = await users.findOne({"email":email});
            if(e){
                return res.status(401).send("Password doesn't match");
            }
            return res.status(401).send("Incorrect credentials");
        }
        res.status(200).send({
            token : `${user.id}:${user.email}:${user.password}`
        })
    }catch(e) {
        res.status(500).send(e.message)
    }
})
router.get('/login/success',(req,res)=>{
    if(req.user){
        res.status(200).json({
            success:true,
            message:'Authentication successful',
            user:req.user,
            cookies:req.cookies
        })
    }
})
router.get('/login/failed',(req,res)=>{
    res.status(401).json({
        success:false,
        message:'Authentication failed'
    })
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('https://timecamp1clone.netlify.app/')
})
router.get('/google',passport.authenticate('google',{scope:['profile']}));
router.get('/google/callback',passport.authenticate('google',{
    successRedirect:'https://timecamp1clone.netlify.app/timesheet',
    failureRedirect:'/login/failed'
}))
router.get('/facebook',passport.authenticate('facebook',{scope:['profile']}));
router.get('/facebook/callback',passport.authenticate('facebook',{
    successRedirect:'https://timecamp1clone.netlify.app/timesheet',
    failureRedirect:'/login/failed'
}))
module.exports=router;