require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require('./models/Notes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//GET All Notes
app.get("/api/notes", async (req, res) => {
    try {
        const data = await Notes.find({})
        /*console.log(data)*/
        if(!data){
            throw new Error('An error occured while fetching notes')
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'An error occured while fetching notes...'})
    }
});


//GET Note bi ID
app.get("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id;

        const data = await Notes.findById(noteId)
        /*console.log(data)*/
        if(!data){
            throw new Error('An error occured while fetching notes')
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'An error occured while fetching notes...'})
    }
});

//CREATE a Note
app.post("/api/notes/", async (req, res) => {
    try {
        const {title, description} = req.body;

        const data = await Notes.create({title, description})
        
        if(!data){
            throw new Error('An error occured while creating notes')
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'An error occured while creating notes...'})
    }
});

//UPDATE a Note
app.put("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id
        const {title, description} = req.body;

        const data = await Notes.findByIdAndUpdate(noteId, {title, description})
        
        if(!data){
            throw new Error('An error occured while updating notes')
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'An error occured while updating notes...'})
    }
});

//DELETE a Note
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id

        const data = await Notes.findByIdAndDelete(noteId)
        
        if(!data){
            throw new Error('An error occured while updating notes')
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: 'An error occured while updating notes...'})
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});