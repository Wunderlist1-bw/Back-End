
exports.up = function (knex) {
    return knex.schema.createTable('task', task => {
        task.increments();
        task.string('title', 128).notNullable();
        task.string('description', 225).notNullable();
        task.string('completeDate');
        task.boolean('complete').defaultTo(false);
        task.timestamp('created_at').defaultTo(knex.fn.now());
        task.timestamp('updated_at').defaultTo(knex.fn.now());
        task.integer('users_id')
            .unsigned()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })

        .createTable('category', catagory => {
            catagory.increments();
            catagory.string('category', 128).unique();
        })

        .createTable('task_category', tbl => {
            tbl.integer('task_id')
                .unsigned()
                .notNullable()
                .references('task.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('category_id')
                .unsigned()
                .notNullable()
                .references('category.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');;
            tbl.primary(['task_id', 'category_id'])

        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('task_category')
        .dropTableIfExists('category')
        .dropTableIfExists('task')
};
