const Collection = require('../models/collection.model');
const Library = require('../models/library.model');
const Volume = require('../models/volume.model');
const config = require('../../config.json');
const {promises: fs} = require('fs');
const utils = require('../utils/utils');
const path = require('path');

/**
 * Create a new Collection
 * @param {Request} req 
 * @param {Result} res 
 * @returns 
 */
exports.create = async (req, res) => {
    const { title, slug, library_id } = req.body;
    try{
        let collection = await Collection.findOne({slug});
        if(collection){
            return res.status(400).json({ msg: "Collection Already Exists" });
        }
        collection = new Collection({ title, slug, library_id });
        await collection.save();
        res.status(200).json({ message: "Collection Created" });
    } catch (e){
        res.status(500).json({ message: "Error during collection creation" });
    }
}

/**
 * Get all Collection from a Library
 * @param {Request} req 
 * @param {Result} res 
 */
exports.getAllFromLibrary = async (req, res) => {
    const { slug } = req.body;
    try {
        let library = await Library.findOne({slug: slug});
        let collections = await Collection.find({library_id: library.id});
        res.status(200).json(collections);
    } catch (e) {
        res.status(500).json({ message: "Error during getting collections" });
    }
}

/**
 * Delete a Collection
 * @param {Request} req 
 * @param {Result} res 
 */
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        await Collection.deleteOne({id: id});
        res.status(200).json({message: "Collection deleted"});
    } catch (e) {
        res.status(500).json({ message: "Error during collection deletion" });
    }
}

/**
 * Update a Collection
 * @param {Request} req 
 * @param {Result} res 
 */
exports.update = async (req, res) => {
    const { id, title, slug, library_id } = req.body;
    try {
        let collection = Collection.findOne({ id: id});
        if(!collection){
            res.status(500).json({ message: "No Collection found" });
        }
        collection.title = title;
        collection.slug = slug;
        collection.library_id = library_id;
        collection.save();
        res.status(200).json({message: "Collection updated"});
    } catch (e) {
        res.status(500).json({ message: "Error during collection deletion" });
    }
}

/**
 * Scan Volumes
 * @param {Request} req 
 * @param {Result} res 
 */
 exports.scanCollection = async (req, res) => {
    const { id } = req.body;
    const datas = [];
    try {
        let collection = await Collection.findOne({id: id});
        let library = await Library.findOne({id: collection.library_id});
        (await Volume.find({collection_id: id}).select('title -_id')).forEach(collection => {
            datas.push(collection.title);
        })
        let dir = await fs.readdir(config.root_path + library.title + '\\' + collection.title);
        let diff = utils.arr_diff(dir, datas);
        diff.forEach(d => {
            let volume = new Volume({title: path.parse(d).name, slug: utils.stringToSlug(path.parse(d).name), filename: d, collection_id: collection.id})
            volume.save();
        })
        res.status(200).json("OK");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

