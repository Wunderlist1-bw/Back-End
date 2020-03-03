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
            res.status(500).json({ message: 'task not found', err })
        });
})

router.get('/category', TaskAuth, (req, res) => {

    Task.findCategories()
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(err => {
            res.status(500).json({ message: 'categories not found', err })
        });
})

// ______________________ //
// GET ALL TASK for specific Category
// ______________________ //

router.get('/category/:category_id', TaskAuth, (req, res) => {
    const { category_id } = req.params

    Task.findCategoryTasks(category_id)
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'task not found', err })
        });
})


// ______________________ //
// GET TASK BY WITH CATEGORY
// ______________________ //

// router.get('/:id', TaskAuth, (req, res) => {
//     const { id } = req.params

//     Task.findById(id)
//         .then(idTasks => {
//             if (idTasks) {
//                 Task.findById(id)
//                     .then(Tasks => {
//                         res.status(200).json(Tasks)
//                     })
//                     .catch(err => {
//                         res.status(500).json({ message: 'you failed to get all', err });
//                     });
//             } else {
//                 if (taskId) {
//                     Task.findTaskCategories(id)
//                         .then(task => {
//                             res.status(200).json(task)
//                         })
//                         .catch(err => {
//                             res.status(500).json({ message: 'you failed to get all', err });
//                         });
//                 }
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'you failed to get the id', err });
//         });
// })

router.get('/:id', TaskAuth, (req, res) => {
    const { id } = req.params

    Task.findById(id)
        .then(taskId => {
            if (taskId) {
                Task.findTaskCategories(id)
                    .then(task => {
                        console.log("task", task[0].category)
                        if (task[0].category) {

                            res.status(200).json(task)
                        } else {
                            console.log("taskID", taskId)
                            res.status(200).json(taskId)
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'you failed to get task', err });
                    });
            } else {
                res.status(404).json({ message: 'could not find task' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'you failed to get the id', err });
        });
})


// router.get('/:id', (req, res) => {
//     const { id } = req.params;

//     Task.findTaskCategories(id)
//         .then(tasksId => {
//             if (tasksId) {
//                 res.json(tasksId);
//             } else {
//                 res.status(404).json({ message: 'Could not find tasks with given id.' })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get tasks', err });
//         });
// });


// ______________________ //
// ADD NEW TASK
// ______________________ //

router.post('/', TaskAuth, (req, res) => {
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
// ADD NEW Category
// ______________________ //

router.post('/category', TaskAuth, (req, res) => {
    const newCategory = req.body;
    console.log(req.body);

    Task.addCategory(newCategory)
        .then(NewCategory => {
            res.status(201).json(NewCategory)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new task', err })
        });
})


// ______________________ //
// EDIT TASK (NEEDS TO BE FIXED)
// ______________________ //

router.put('/:id', TaskAuth, (req, res) => {
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

router.delete('/:id', TaskAuth, (req, res) => {
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