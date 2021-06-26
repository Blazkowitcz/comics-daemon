const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Collection = require('../models/collection.model');
const Volume = require('../models/volume.model');
const fs = require('fs');
var mkdirp = require('mkdirp');

/**
 * Register a new user in database
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ msg: "User Already Exists" });
        }
        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user: { id: user.id }};
        jwt.sign(payload, "randomString", { expiresIn: "2h" },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Savings");
    }
}

/**
 * Connect a user
 * @param {Request} req 
 * @param {*} res 
 * @returns 
 */
exports.signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Error during login 1"});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: "Error during login 2"})
        }
        const payload = { user: { id: user.id }};
        jwt.sign(
            payload,
            "randomString",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              if (!fs.existsSync(process.cwd() + '\\public\\' + user.username)) {
                mkdirp(process.cwd() + '\\public\\' + user.username, function(err) {});
              }
              res.status(200).json({
                token
              });
            }
          );
    } catch (e){
        res.status(500).json({
          message: "Server Error"
        });
    }
}

exports.logout = async (req, res) => {
  try{
    req.user = {}
    res.status(200).json({
      message: "Disconnected"
    });
  } catch (e) {
    res.status(500).json({
      message: "Error during disconnection"
    });
  }
}

exports.me = async (req, res) => {
    try {
        const user = await User.findOne({id: req.user.id});
        let volume = await Volume.findOne({id: user.volume_read});
        let collection = await Collection.findOne({id: volume.collection_id});
        user._doc.volume = volume.slug;
        user._doc.collection = collection.slug;
        res.json(user);
      } catch (e) {
        console.log(e);
        res.send({ message: "Error in Fetching user" });
      }
}