
exports.seed = function (knex) {
    return knex('task').insert([
        { title: '', description: "", complete: false, user_id: 1 },
        { title: '', description: "", complete: false, user_id: 2 },
        { title: '', description: "", complete: false, user_id: 2 },
        { title: '', description: "", complete: false, user_id: 3 }
    ]);
};
