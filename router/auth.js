const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// router.use("/uploads", express.static('uploads')); 
// const authentication = require('../middleware/authentication');
require('../db/conn');
const User = require('../model/userSchema');
const cookieParser = require('cookie-parser')
// const express = require('express');
const app = express();
// app.use(cookies());
router.use(cookieParser())
// var cookies = require('browser-cookies');
const multer  = require('multer')
// SET STORAGE
const storage = multer.diskStorage({
    destination:(req, file, callback) => {
      callback(null, './uploads')
    },
    filename:(req, file, callback) => {
      callback(null, file.originalname);
    }
  })
   
  const upload = multer({ storage: storage })




const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log(tokenss);
        // res.send(req.cookies);
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) { throw new Error('user not found') };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        console.log(rootUser)
        next();

    } catch (err) {
        res.status(401).send("unauthrisdzwd person");
        console.log(err);
    }
}






router.post('/register', upload.single('photo'), (req, res) => {
    const { name, email, work, password, cpassword } = req.body;        // object destructing in ecma6
    const photo = (req.file) ? req.file.filename : null ;
   
    if (!name || !email || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }
    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email already exist" })
            }

            const user = new User({ name, email, work, password, cpassword, photo });     // creating new document  actualy ye new User({name,email,work,password,cpassword}); aise hai new User({name(database wala name):name(input wala name),email:email,work:work,password,cpassword});
            user.save().then(() => {
                res.status(201).json({ message: "success" });
            }).catch((err) => res.send(500).json({ error: "err" }));
        })
})

// login route 
router.post('/signin', async (req, res) => {
    try {
        // let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "fill data" });
            // window.alert("invalid");
        }
        const userlogin = await User.findOne({ email: email });
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            const token = await userlogin.generateAuthToken();

            res.cookie("jwt", token, {
                expire: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });
            if (!isMatch) {
                res.json({ message: "password not match" })
            } else {
                res.json({ message: "success" })
            }
        } else {
            res.status(400).json({ error: "User not found" });
            console.log("error hai cred");
        }

    } catch (err) {
        console.log(err);
    }
})
router.get('/about', authentication ,(req, res) => {                   // for the sake of authtication we use middle ware betwenn path and callbCK FUNCTION
   console.log(`about page is here`);
    res.send(req.rootUser);
})
router.get('/logout',(req, res) => {                   // for the sake of authtication we use middle ware betwenn path and callbCK FUNCTION
   console.log(`about page is here`);
   res.clearCookie('jwt', {path:'/'});
    res.status(200).send('user logout');
});
router.get('/getdata', async (req, res) => { 
    try{
        const userdata = await User.find()
        res.status(201).json(userdata);
    } catch (error)  {
        res.status(404).json(error);
    }             

});

router.get('/viewss/:id', async (req, res) => { 
    try{
        const {id} = req.params;
        const userdataview = await User.findById({_id:id})
        res.status(201).json(userdataview);
    } catch (error)  {
        res.status(404).json(error);
    }             

});


router.patch('/update/:id', upload.single('photo'), async (req, res) => { 
    try{
        const {id} = req.params;
        console.log(req.body)
        // const { name, email, work, password, cpassword } = req.body;        // object destructing in ecma6
        // const photo = (req.file) ? req.file.filename : null ;
        if(req.file){
        const updateUser = await User.findByIdAndUpdate(id,{...req.body,photo:(req.file) ? req.file.filename : null},{
            new:true
        });
    }else{
        const updateUser = await User.findByIdAndUpdate(id,{...req.body},{
            new:true
        });
    }
        res.status(201).json(updateUser);
    } catch (error)  {
        res.status(404).json(error);
    }             

});
router.delete('/delete/:id', async (req, res) => { 
    try{
        const {id} = req.params;
        const delUser = await User.findByIdAndDelete({_id:id})
        res.status(201).json(delUser);
    } catch (error)  {
        res.status(404).json(error);
    }             

});
module.exports = router;