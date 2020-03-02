const db = require('../database/dbconfig');

module.exports = {
    find,
    findCategories,
    findTaskCategories,
    findCategoryTasks,
    findById,
    findCategoryById,
    add,
    addCategory,
    update,
    remove,
};

function find() {
    return db('task');
}

function findCategories() {
    return db('category');
}

function findById(id) {
    return db('task')
        .where({ id })
        .first()
}

function findCategoryById(id) {
    return db('category')
        .where({ id })
        .first()
}

function findTaskCategories(task_id) {
    return db('task_category as tc')
        .join('task as t', 't.id', 'tc.task_id')
        .join('category as c', 'c.id', 'tc.category_id')
        .select('c.id', 'c.category', 't.id', 't.title', 't.description', 't.completeDate', 't.complete')
        .where({ task_id })
}

async function add(task) {
    const [id] = await db('task').insert(task)
    return findById(id)
}

function update(banana, id) {
    return db('task')
        .where({ id })
        .update(banana, '*')
        .then(id => {
            return findById(id)
        })
}

function remove(id) {
    return db('task')
        .where({ id })
        .del()
}

function findCategoryTasks(category_id) {
    return db('task_category as tc')
        .join('category as c', 'c.id', 'tc.category_id')
        .join('task as t', 't.id', 'tc.task_id')
        .select('c.id', 'c.category', 't.id', 't.title', 't.description', 't.completeDate', 't.complete')
        .where({ category_id })
}

async function addCategory(category) {
    const [id] = await db('category').insert(category)
    return findCategoryById(id);
}