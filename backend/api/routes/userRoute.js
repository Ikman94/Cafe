const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const data = require('../../data');
const User = require('../models/userModel');
const generateToken = require('../../util');
const isAuth = require('../../utils')

let routes = (app) => {
    app.get('/users/seed', expressAsyncHandler(async (req, res) => {
        // await User.remove({});
        let createdUsers = await User.insertMany(data.users);
        res.send(createdUsers)
    }))

    app.post('/users/signin', expressAsyncHandler(async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
               console.log(req.headers.get("Authorization"));
                return;
            }
        }
        res.status(401).send({message:'Invalid email or password'})
    }));

    app.post(
        '/users/register',
        expressAsyncHandler(async (req, res) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            });
            const createdUser = await user.save();
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            });
        })
    );

    app.get('/users/:id', expressAsyncHandler(async(req,res) => {
        let user = await User.findById(req.params.id);
        if(user){
            res.send(user);
        } else{
            res.status(404).send({message: 'User not found'})
        }
    }));

    app.put(
        '/users/profile',
        isAuth,
        expressAsyncHandler(async (req, res) => {
            const user = await User.findById(req.user._id);
            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, 8);
                }
                const updatedUser = await user.save();
                res.send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken(updatedUser),
                });
            }
        })
    );
}
module.exports = routes;