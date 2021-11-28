const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
// import in the User model
const { User } = require('../models');
const { createRegistrationForm, createLoginForm, bootstrapField } = require('../forms');


//user registration
router.get('/register', (req,res)=>{
    const registerForm = createRegistrationForm();
    res.render('users/register', {
        'form': registerForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})
module.exports = router;
//process user reg
router.post('/register', (req, res) => {
    const registerForm = createRegistrationForm();
    registerForm.handle(req, {
        success: async (form) => {
            const user = new User({
                'username': form.data.username,
                'password': getHashedPassword(form.data.password),
                'email': form.data.email,
                'image_url': form.data.image_url
            });
            await user.save();
            req.flash("success_messages", "Registration Complete, you may log in now.");
            res.redirect('/users/login')
        },
        'error': (form) => {
            res.render('users/register', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//update user by id
router.get('/users/:user_id/update', async (req, res) => {
    
    const userId = req.params.user_id;
    const keebUser = await User.where({
        'id': user_id}).fetch({
            require: true,
        });
        console.log(userId);

        const userForm = createLoginForm();
        
        userForm.fields.username.value = keebUser.get('username');
        userForm.fields.email.value = keebUser.get('email');
        
        

        res.render('users/userupdate', {
            'form': productForm.toHTML(bootstrapField),
            'users':keebUser.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            // cloudinaryName: process.env.CLOUDINARY_NAME,
            // cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            // cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })
})


//login
router.get('/login', (req, res) => {
    const loginForm = createLoginForm();
    res.render('users/login', {
        'form': loginForm.toHTML(bootstrapField)
    })
})


//process login
router.post('/login', async (req, res) => {
const loginForm = createLoginForm();
    loginForm.handle(req, {
        'success': async (form) => {
            // process the login
            // ...find the user by email and password
            let user = await User.where({
                'email': form.data.email
            }).fetch({
                require: false
            });
            if (!user) {
                req.flash("error_messages", "Sorry, the login details that you have provided is not correct.")
                    res.redirect('/users/login');
            }
                else {
                    // check if the password matches
                    if (user.get('password') === getHashedPassword(form.data.password)) {
                        // add to the session that login succeed
                        // store the user details
                        req.session.user = {
                            id: user.get('id'),
                            username: user.get('username'),
                            email: user.get('email')
                        }
                        req.flash("success_messages", "Welcome back, " + user.get('username'));
                        res.redirect('/users/profile');
                    } 
                    else {
                        req.flash("error_messages", "Sorry, the login details that you have provided is not correct.")
                            res.redirect('/users/login')
                    }
                }
        }, 
        'error': (form) => {
            req.flash("error_messages", "There is a problem with the login, please fill in the form again ")
                res.render('users/login', {
                    'form': form.toHTML(bootstrapField)
                })
        }
    })
})


//profile
router.get('/profile', (req, res) => {
    const user = req.session.user;
    if (!user) {
        req.flash('error_messages', 'You do not have permission to view this page')
        return res.redirect('/users/login');
    }
    else {
    res.render('users/profile',{
        'user': user})
    }
})


//logout
router.get('/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_messages', "Logged out successfully, Goodbye");
    res.redirect('/users/login');
    })
    

       