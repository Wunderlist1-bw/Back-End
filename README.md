Wunderlist - Backend

Section Contents:

/api/auth/login POST
/api/auth/register POST
/api/task GET
/api/task POST
/api/task/:id GET
/api/task/:id PUT
/api/task/:id DELETE


/api/auth/register POST

Expects an object with this format as the request body:

{
  "email": "user1@gmail.com",   //string
  "username": "User1",   //string
  "password": "password" //string
}

/api/auth/login POST
Expects an object with this format as the request body:

{
  "username": "User1",   //string
  "password": "password" //string
}


/api/task GET

Requires an authorization header with a JWT. it will return an array of objects in this format:

  "task": [
            {
                "id": 1,
                "title": "Study for assessment",
                "description": "Read over notes and tk to get ready for assessment",
                "completeDate": "03/01/2020",
                "category": "school",
                "complete": 0,
                "created_at": "2020-02-28 03:17:24",
                "updated_at": "2020-02-28 03:17:24",
                "users_id": 1
            },
            {
                "id": 2,
                "title": "Update Resume",
                "description": "Add new skills to my resume",
                "completeDate": null,
                "category": "work",
                "complete": 0,
                "created_at": "2020-02-28 03:17:24",
                "updated_at": "2020-02-28 03:17:24",
                "users_id": 1
            }
        ]


/api/task POST

Requires an authorization header with a JWT. Expects an object with this format as the request body:

    "task": {
                "id": 1,
                "title": "Study for assessment",
                "description": "Read over notes and tk to get ready for assessment",
                "completeDate": "03/01/2020",
                "category": "school",
                "complete": 0,
                "created_at": "2020-02-28 03:17:24",
                "updated_at": "2020-02-28 03:17:24",
                "users_id": 1
            }


/api/task/:id GET

Requires an authorization header with a JWT. The object represents the recipe with the ID specified in the path:

    "task": {
                "id": 1,
                "title": "Study for assessment",
                "description": "Read over notes and tk to get ready for assessment",
                "completeDate": "03/01/2020",
                "category": "school",
                "complete": 0,
                "created_at": "2020-02-28 03:17:24",
                "updated_at": "2020-02-28 03:17:24",
                "users_id": 1
            }
        

/api/task/:id PUT

Requires an authorization header with a JWT. Expects an object with this format as the request body:

    "task": {
                "id": 1,
                "title": "Study for assessment",
                "description": "Read over notes and tk to get ready for assessment",
                "completeDate": "03/01/2020",
                "category": "school",
                "complete": 0,
                "created_at": "2020-02-28 03:17:24",
                "updated_at": "2020-02-28 03:17:24",
                "users_id": 1
            }



/api/task/:id DELETE

Requires an authorization header with a JWT. Deletes the selected recipe if it exists and is associated with the current user.
