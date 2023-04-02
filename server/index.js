const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//const dotenv = require("dotenv");

// dotenv.config()

const app  = express();

app.use(express.json());
app.use(cors());


mongoose.set('strictQuery', false);

mongoose.connect(
    "mongodb+srv://admin-lavesh:admin123@cluster0.agz64.mongodb.net/todoDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)   .then(()=>{
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

    
const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/todo/new", async (req,res) => {
    const todo = new Todo({
        list: req.body.list,
        // position: req.body.position
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
});

app.delete("/todo/delete/:id", async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.get("/todo/complete/:id", async (req,res) => {
    const { id } = req.params;
    // const { position } = req.body;

    const todo = await Todo.findById(id);

    // todo.position = position;
    todo.complete = !todo.complete;
    
    await todo.save();

    res.json(todo);
});



app.listen(3001, () => console.log("Sever started!"));