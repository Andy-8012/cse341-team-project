const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['cds']
    try {
        const db = mongodb.getDatabase().db();
        const cds = await db
            .collection('cds')
            .find()
            .toArray();

        res.status(200).json(cds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    //#swagger.tags=['cds']
    try {
        const cdID = new ObjectId(req.params.id);

        const db = mongodb.getDatabase().db();
        const cd = await db
            .collection('cds')
            .findOne({ _id: cdID });

        if (!cd) {
            return res.status(404).json({ message: 'CD not found' });
        }

        res.status(200).json(cd);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createCD = async (req, res) => {
    //#swagger.tags=['cds']
    try {
        const cd = {
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            label: req.body.label
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('cds')
            .insertOne(cd);

        return res.status(201).json({
            message: 'Created new CD.',
            cd: { id: response.insertedId, ...cd }
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error creating CD.',
            error: err.message
        });
    }
};


const updateCD = async (req, res) => {
    //#swagger.tags=['cds']
    try {
        const cdId = new ObjectId(req.params.id);

        const cd = {
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            label: req.body.label
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('cds')
            .replaceOne({ _id: cdId }, cd);

        if (response.modifiedCount === 0) {
            return res.status(404).json({
                message: 'CD not found or no changes applied.'
            });
        }

        return res.status(200).json({
            message: 'Successfully updated CD.',
            updatedcd: { id: cdId, ...cd }
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error updating CD.',
            error: err.message
        });
    }
};


const deleteCD = async (req, res) => {
    //#swagger.tags=['cds']
    try {
        const cdId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('cds')
            .deleteOne({ _id: cdId });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                message: 'CD not found.'
            });
        }

        return res.status(200).json({
            message: 'Deleted CD.',
            deletedId: cdId
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error deleting CD.',
            error: err.message
        });
    }
};


module.exports = {
    getAll,
    getById,
    createCD,
    updateCD,
    deleteCD
}