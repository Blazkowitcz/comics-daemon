const Library = require('../models/library.model');
const Collection = require('../models/collection.model');
const config = require('../../config.json');
const {promises: fs} = require('fs');
const utils = require('../utils/utils');

/**
 * Create a new Library
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.create = async (req, res) => {
    const { title, slug } = req.body;
    try {
        let library = await Library.findOne({ slug });
        if (library) {
            return res.status(400).json({ msg: "Library Already Exists" });
        }
        library = new Library({ title, slug });
        await library.save();
        res.status(200).json({ message: "Library Created" });
    } catch (e) {
        res.status(500).json({ message: "Error during library creation" });
    }
}

/**
 * Delete a Library
 * @param {Request} req 
 * @param {Result} res 
 */
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        await Library.deleteOne({ id: id });
        res.status(200).json({ message: "Library deleted" });
    } catch (e) {
        res.status(500).json({ message: "Error during library deletion" });
    }
}

/**
 * Update a Library
 * @param {Request} req 
 * @param {Result} res 
 */
exports.update = async (req, res) => {
    const { id, title, slug } = req.body;
    try {
        let library = await Library.findOne({ id: id });
        if (!library) {
            res.status(500).json({ message: "Library not found" });
        }
        library.slug = slug;
        library.title = title;
        await library.save();
        res.status(200).json({ message: "Library Updated" });
    } catch (e) {
        res.status(500).json({ message: "Error during library update" });
    }
}

/**
 * Get all Libraries
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getAll = async (req, res) => {
    try {
        let libraries = await Library.find({});
        res.status(200).json(libraries);
    } catch (e) {
        res.status(500).json({ message: "Error getting libraries" });
    }
}

/**
 * Scan Collections
 * @param {Request} req 
 * @param {Result} res 
 */
exports.scanLibrary = async (req, res) => {
    const { id } = req.body;
    const datas = [];
    try {
        let library = await Library.findOne({id: id});
        (await Collection.find({}).select('title -_id')).forEach(collection => {
            datas.push(collection.title);
        })
        let dir = await fs.readdir(config.root_path + library.title);
        let diff = utils.arr_diff(dir, datas);
        diff.forEach(d => {
            let collection = new Collection({title: d, slug: utils.stringToSlug(d), library_id: library.id});
            collection.save();
        })
        res.status(200).json("OK");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}


