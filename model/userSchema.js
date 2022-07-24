const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
name:{
    type: String,
    required:true
},
email:{
    type: String,
    required:true
},
work:{
    type: String,
    required:true
},
password:{
    type: String,
    required:true
},
cpassword:{
    type: String,
    required:true
},
photo:{
    type: String,
    
},
tokens:  [
    {
        token : {
            type: String,
            required:true
        }
    }
]

});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token 
userSchema.methods.generateAuthToken = async function (){
try{
let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
}catch (errr) {
    console.log(errr);
}
}
// definig model 
// const User = new mongoose.model('User  - name of collection , first letter apital(called pascal convention), must be singular ',userSchema - name of model); 
const User = new mongoose.model('User',userSchema);
module.exports = User;