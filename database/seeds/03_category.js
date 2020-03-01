exports.seed = function (knex, Promise) {
    return knex('category').truncate()
        .then(function () {
            return knex('category').insert([
                { category: 'home' },
                { category: 'work' },
                { category: 'school' }
            ]);
        });
};
