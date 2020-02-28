
exports.up = function (knex) {
    return knex.schema.createTable('task', task => {
        task.increments();
        task.string('title', 128).notNullable();
        task.string('description', 225).notNullable();
        task.string('completeDate');
        task.string('category');
        task.boolean('complete').notNullable().defaultTo(false);
        task.timestamp('created_at').defaultTo(knex.fn.now());
        task.timestamp('updated_at').defaultTo(knex.fn.now());
        task.integer('users_id')
            .notNullable()
            .unsigned()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('task')
};
