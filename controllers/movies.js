const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const movies = await mongodb
            .getDatabase()
            .db()
            .collection('movies')
            .find({})
            .toArray();

        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid movies id' });
        }
        const moviesId = new ObjectId(req.params.id);
        const movie = await mongodb
            .getDatabase()
            .db()
            .collection('movies')
            .findOne({ _id: moviesId });
        if (!moviesId) {
            return res.status(404).json({ message: 'Movies not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const addMovie = async (req, res) => {
    try {
        const movie = {
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            durationMinutes: req.body.durationMinutes,
            rating: req.body.rating,
            available: req.body.available
        };
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the movie.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid movie id to update a movie.');
        }
        const movieId = new ObjectId(req.params.id);
        const movie = {
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            durationMinutes: req.body.durationMinutes,
            rating: req.body.rating,
            available: req.body.available
        };
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the movie.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid movie id to delete a movie.');
        }
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    addMovie,
    updateMovie,
    deleteMovie
};