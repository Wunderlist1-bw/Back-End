exports.seed = function (knex, Promise) {
    return knex('users').truncate()
        .then(function () {
            return knex('users').insert([
                { username: 'user100', password: 'pass100' },
            ]);
        });
};
