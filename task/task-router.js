const router = require('express').Router();
const Task = require('./task-model.js');
const TaskAuth = require('../auth/authenticate-middleware.js');





// ______________________ //
// GET ALL TASK
// ______________________ //

router.get('/', TaskAuth, (req, res) => {
    Task.find()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'users not found', err })
        });
})


// ______________________ //
// GET TASK BY ID
// ______________________ //

router.get('/:id', (req, res) => {
    const { id } = req.params

    Task.findById(id)
        .then(taskId => {
            if (taskId) {
                res.status(200).json(taskId)
            } else {
                res.status(404).json({ message: 'could not find task' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'you failed to get the id', err });
        });
})


// ______________________ //
// ADD NEW TASK
// ______________________ //

router.post('/', (req, res) => {
    const newTask = req.body;

    Task.add(newTask)
        .then(NewTask => {
            res.status(201).json(NewTask)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new task', err })
        });
})


// ______________________ //
// EDIT TASK (NEEDS TO BE FIXED)
// ______________________ //

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const banana = req.body;

    Task.findById(id)
        .then(updating => {
            if (updating) {
                Task.update(banana, id)
                    .then(updated => {
                        res.json(updated)
                    })
            } else {
                res.status(404).json({ message: 'Could not find task with given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update scheme', err });
        });
})


// ______________________ //
// DELETE TASK
// ______________________ //

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Task.remove(id)
        .then(deleteId => {
            if (deleteId) {
                res.json({ removed: deleteId })
            } else {
                res.status(404).json({ message: 'Could not find task with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete scheme' });
        });
})

module.exports = router;