
exports.seed = function (knex) {
    return knex('task').insert([
        { title: 'Clean Room', description: "Clean room before spring break trip", completeDate: "02/28/2020", complete: false, users_id: 1 },
        { title: 'Study for assessment', description: "Read over notes and tk to get ready for assessment", completeDate: "03/01/2020", complete: false, users_id: 1 },
        { title: 'Update Resume', description: "Add new skills to my resume", complete: false, users_id: 1 },
        { title: 'Build Week', description: "work on API", completeDate: "03/08/2020", complete: false, users_id: 1 },
    ]);
};
