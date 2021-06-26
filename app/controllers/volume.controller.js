const Library = require('../models/library.model');
const Collection = require('../models/collection.model');
const Volume = require('../models/volume.model');
const Read = require('../models/read.model');
const User = require('../models/user.model');
const config = require('../../config.json');
const fs = require('fs');
const fsExtra = require('fs-extra')
const unzipper = require('unzipper');
const volume_util = require('../utils/volume.util');

/**
 * Get all Collection from a Library
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getAllFromCollection = async (req, res) => {
    const { slug } = req.body;
    try {
        let user = await User.findOne({ id: req.user.id });
        let collection = await Collection.findOne({ slug: slug });
        let volumes = await Volume.find({ collection_id: collection.id }).sort('title');
        let reads = await Read.find({ user_id: 3 });
        volumes.forEach(volume => {
            volume._doc.logo_url = collection.logo_url;
            volume._doc.read = volume_util.volumeReaded(reads, volume);
            volume._doc.on_reading = volume_util.onReading(volume, user);
        });
        res.status(200).json(volumes);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error during getting collections" });
    }
}

/**
 * Uncompress the volume inside public folder
 * @param {Request} req 
 * @param {Result} res 
 */
exports.openVolume = async (req, res) => {
    try {
        let user = await User.findOne({ id: req.user.id });
        let library = await Library.findOne({ slug: req.body.library_slug });
        let collection = await Collection.findOne({ slug: req.body.collection_slug });
        let volume = await Volume.findOne({ slug: req.body.volume_slug });
        let volume_path = config.root_path + library.title + '\\' + collection.title + '\\' + volume.filename;
        if (user.volume_read != volume.id) {
            user.volume_read = volume.id;
            user.page = 0;
            user.save();
            fsExtra.emptyDirSync(process.cwd() + '\\public\\' + user.username);
            if (fs.existsSync(volume_path)) {
                let file_number = 0;
                fs.createReadStream(volume_path)
                    .pipe(unzipper.Parse())
                    .on('entry', function (page) {
                        page.pipe(fs.createWriteStream(process.cwd() + '\\public\\' + user.username + "\\" + (file_number < 10 ? "0" + file_number : file_number)));
                        file_number++;
                    })
                    .on('finish', function () {
                        res.status(200).json({ message: "OK" });
                    })
            }
        } else {
            res.status(200).json({ message: "OK" });
        }
    } catch (e) {
        res.status(500).json({ message: "Error during getting collections" });
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Resul} res 
 */
exports.changePage = async (req, res) => {
    let user = await User.findOne({ id: req.user.id });
    let readed = await Read.findOne({ user_id: user.id, volume_id: user.volume_read });
    if (user) {
        user.page = req.body.page;
        fs.readdir(process.cwd() + '\\public\\' + user.username, (err, files) => {
            if (req.body.page === files.length) {
                if (!readed) {
                    let read = new Read({ user_id: user.id, volume_id: user.volume_read });
                    read.save();
                }
                user.volume_read = 0;
            }
        });
        user.save();
        res.status(200).json({ message: "OK" });
    } else {
        res.status(500).json({ message: "Error during getting collections" });
    }
}

/**
 * Set a volume as read for the connected user
 * @param {Request} req 
 * @param {Result} res 
 */
exports.markAsRead = async (req, res) => {
    try {
        let user = await User.findOne({ id: req.user.id });
        let volume = await Volume.findOne({ id: req.body.volume_id });
        if (volume && user) {
            let volume_read = new Read({ user_id: user.id, volume_id: volume.id });
            volume_read.save();
            res.status(200).json({ message: "OK" });
        }
    } catch (e) {
        res.status(500).json({ message: "Error during getting collections" });
    }
}