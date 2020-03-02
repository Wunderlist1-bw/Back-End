exports.seed = function (knex, Promise) {
    return knex('task_category').truncate()
        .then(function () {
            return knex('task_category').insert([
                { task_id: 1, category_id: 1 },
                { task_id: 1, category_id: 2 }
            ]);
        });
};
