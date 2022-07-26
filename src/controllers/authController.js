const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/userModel");

const showLoginPage= (req,res)=>{
    res.render("login");
}

const showRegisterPage= (req,res)=>{
    res.render("register");
}
const postRegister =(req,res)=>{
    const {name,email,password,password2}=req.body;
    let errors=[];

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"});
    }

    //Check password match
    if(password!==password2){
        errors.push({msg: "Password do not match"});
    }

    //Check pass length
    if(password.length<6){
        errors.push({msg:"Password should be at least 6 characters"});
    }

    //errors
    if (errors.length>0) {
        res.render("register",{
            errors,
            name,
            email,
        });
    }else{
        //Validation passed
        errors.push({msg: "Email is already registered"});
        User.findOne({email:email})
            .then(user => {
                if(user){
                    //User  exists
                    res.render('register',{
                        errors,
                        name,
                        email,
                    });
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        //Set password to hashed
                        newUser.password =hash;
                        //Save user
                        newUser.save()
                            .then(user => {
                                req.flash("success_msg", "You are now registered and can log in")
                                res.redirect("/users/login");
                            })
                            .catch(err =>console.log(err));
                    }));
                   


                }
            });
    }
}

const postLogin =(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/dashboard",
        failureRedirect:"/users/login",
        failureFlash:true
    })(req,res,next);
}

const getLogout = (req,res)=>{
    req.logout();
    req.flash("success_msg","You are logged out");
    res.redirect("/users/login");
}

module.exports={
    showLoginPage,
    showRegisterPage,
    postRegister,
    postLogin,
    getLogout
}