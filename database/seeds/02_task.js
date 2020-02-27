
exports.seed = function (knex) {
    return knex('task').insert([
        { title: 'Clean Room', description: "Clean room before spring break trip", complete: false, users_id: 1 },
        { title: 'Study for assessment', description: "Read over notes and tk to get ready for assessment", complete: false, users_id: 1 },
        { title: 'Update Resume', description: "Add new skills to my resume", complete: false, users_id: 1 },
        { title: 'Build Week', description: "work on API", complete: false, users_id: 1 },
        // { title: 'test1', description: "desc1", complete: false, users_id: 2 },
        // { title: 'test2', description: "desc2", complete: false, users_id: 2 },
        // { title: 'test3', description: "desc3", complete: false, users_id: 3 },
    ]);
};
