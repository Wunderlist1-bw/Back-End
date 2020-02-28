const db = require('../database/dbconfig');

module.exports = {
    find,
    // findAll,
    findById,
    add,
    update,
    remove,
};

function find() {
    return db('task');
}

function findById(id) {
    return db('task')
        .where({ id })
        .first()
}

// function findAll(id) {
//     return db('task as t')
//         .join('projects as p', 't.projects_id', 'p.id')
//         .where({ projects_id: id })
//         .select('p.id', 'p.projects_name', 'p.projects_description', 't.tasks_notes', 't.tasks_description')
// }

async function add(task) {
    const [id] = await db('task').insert(task)
    return findById(id)
}

function update(banana, id) {
    return db('task')
        .where({ id })
        .insert(banana)
        .then(id => {
            return findById(id)
        })
}

function remove(id) {
    return db('task')
        .where({ id })
        .del()
}