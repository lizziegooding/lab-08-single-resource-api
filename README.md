![cf](https://i.imgur.com/7v5ASc8.png) lab-08-single-resource-api
=====

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
* include an .eslintrc
* include a .gitignore
* include a readme with project description
* include any npm scripts for starting server, linting, testing, etc

# Directions
* Create these directories to organize your code:
 * lib
 * model
 * test
X * Create a HTTP Server using the http module
X Create a Object Constructor that creates a _simple resource_ with at least 3 properties
  X An `id` property that is set to a unique **node-uuid** id is required
 X Also include two other properties of your choice (like name, creationDate, etc.)
X Create a body parser to parse the json in the body of `POST` and `PUT` requests
X Create a url parser that uses nodes `url` and `querystring` modules parse the request url
X Create a Router Constructor that manages requests to `GET`, `POST`, `PUT`, and `DELETE` requests
X Create a route for doing `CREATE`, `READ`, and `DELETE` operations on your _simple resource_
X Create a storage module that will store resources by their type and id

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
  * pass data as stringifed json in the body of a post request to create a resource
* `GET` request
  * pass an `?id=<uuid>` in the query string to retrieve a specific resource as json
* `DELETE` request
  * pass an `?id=<uuid>` in the query string to delete a specific resource
  * should return 204 status with no content in the body
* `PUT` request
  * pass an `?id=<uuid>` in the query string to update a specific resource
  * pass data as stringified json in the body of a put request to update a resource
  * optionally decide whether the id of the resource is passed through the body or via the request url

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/simple-resource-name` endpoint responds as described for each condition below:
  * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `GET` - test 400, responds with 'bad request' for if no id is provided in the query string
  * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
  * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `POST` - test 201, response body like  `{<data>}` for a post request with a valid body
  * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `PUT` - test 202, response body like  `{<data>}` for a put request with a valid  id
  * `DELETE` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `DELETE` - test 204, response for a delete request with a valid id


## Bonus
* **2pts** a `GET` request to `/api/simple-resource-name` with no **?id=** should return an **array** of all of the ids for that resource
  * if you do this you dont have to test 400 to `GET /api/simple-resource-name`
