const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
// To load the mongoose models
const { List, Task } = require('./db/models');


// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// ROUTE HANDLERS



// LIST ROUTES

/**
 * GET /lists
 * Purpose : Get all lists
 */
app.get('/lists', (req, res)=>{ // Array of all the lists
    List.find({}).then((lists)=>{
        res.send(lists);
    })
});

/**
 * POST /lists
 * Purpose : Create a list
 */
app.post('/lists', (req, res)=>{ // to create a new list and return the new list document back
    // the list information with be parsed via JSON reqest body
    let title = req.body.title;
    try{
        let newList = new List({
            title
        });
        newList.save().then((listDoc)=>{
            // the full list document is returned (incl. id)
            res.send(listDoc);
        })
    } catch (e) {
        console.log(e)
    }

});

/**
 * PATCH /lists/:id
 * Purpose : Update a specified list
 */
app.patch('/lists/:id', (req, res)=>{ // to update a specific list
    List.findOneAndUpdate({_id : req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists/:id
 * Purpose : Delete a specific list
 */
app.delete('/lists/:id',(req,res)=>{
    List.findOneAndRemove({
        _id : req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc)
    })
});

/**
 * GET /lists/listId/tasks
 * Purpose : Get the tasks of a specified list
 */
app.get('/lists/:listId/tasks', (req,res)=>{ // get all the tasks of a list
    Task.find({
        _listId : req.params.listId
    }).then((tasks)=>{
        res.send(tasks)
    })
});

/**
 * POST /lists/listId/tasks
 * Purpose : Add a new task to the list
 */
app.post('/lists/:listId/tasks', (req,res)=>{ // get all the tasks of a list
    let newTask = new Task({
        title: req.body.title,
        _listId : req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc)
    });
});

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose : Update a specified task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res)=>{ // to update a specific task
    Task.findOneAndUpdate({
        _id : req.params.taskId,
        _listId : req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose : Delete a specific task
 */
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id : req.params.taskId,
        _listId : req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc)
    })
});

// get a specific task of a specific list, not used..
/*
app.get('/lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOne({
        _id  : req.params.taskId,
        _listId : req.params._listId
    }).then((task)=>{
        res.send(task);
    })
});
*/

app.listen(3000, () => {
    console.log('Server is running on 3000...');
});

