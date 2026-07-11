**Part 1.**

1. a. A socket provides a low level endpoint for network communication andis what many network protocols are built on top of.
b. On top of a socket, HTTP provides a standardized structure to the messages that are being sent over sockets.
c. Most API's do not directly expose raw socket protocols because the standardation provided by protocols such as http allows users to communicate with the api without as much time learning the ins and outs of the system they are interacting with

2. In a request/response pattern the client sends messages (request) to the server to be answered in a response. For example, if a client sent a request for the contents of a file, the server would return the contents of that file to the client in a following message
a. In a TCP command server example of request and response, the request can be sent from the client as a simple string with no structure such as "echo what-i-say-here" and the response from the server would also be a raw data string such as "what-i-say-here"
b. In the HTTP API version of the request response server, the request and response would both have more structure. For example, in many of our labs we have sent over a body as part of our request and response that may contain JSON in the request so that the server is able to parse out the information that is passed in with the request. The response also would contain json so that the client would be able to parse the information
c. In express, the request comes in, gets parsed by express and stores the request in a variable. Express then calls next to pass the request to the appropriate route handler. Once the request handler has completed processing, a response defined in express is then sent back to the client.

3. If an API is stateless then it has no memory of prior request, while a stateful api would remember previous interactions within the current session. 
An advantage of stateless systems is that they are easier to recover since they would only need to recover transactions that were in progress in the event of a failure rather than recovering the entire session in a stateful system. 
A disadvantage of stateless systems is that since they do not carry context from previous request, the user may have to repeatedly insert information such as credentials since an authenticated session was never started.

4. a. A new resource was successfully created - Code 201 is used to show a resource was created
b. The client requested an item that does not exist - Code 404 would be returned since 404 is shown for resources not found
c. The client sent JSON missing a required field - Code 400 would be returned since 400 used for malformed request
d. The server had an unexpected error - Code 500 would be returned since codes in the 500s are used to say the problem was server side.
e. A successful request returns JSON data - Code 200 would be used to show that the request was successful.

**Part 2.**
1. /tasks       - get all tasks with GET HTTP Method
/tasks/{id}     - get single task by id with GET HTTP Method
/tasks          - create a new task with the POST HTTP Method
/tasks/{id}     - replace task with the PUT HTTP Method
/tasks/{id}     - partially update task with the PATCH HTTP Method
/tasks/{id}     - delete task with the DELETE HTTP Method

2. /tasks       - get all tasks with GET HTTP Method - SAFE AND IDEMPOTENT
/tasks/{id}     - get single task by id with GET HTTP Method - SAFE AND IDEMPOTENT
/tasks          - create a new task with the POST HTTP Method - NOT SAFE OR IDEMPOTENT
/tasks/{id}     - replace task with the PUT HTTP Method - IDEMPOTENT, BUT NOT SAFE
/tasks/{id}     - partially update task with the PATCH HTTP Method - NOT SAFE OR IDEMPOTENT
/tasks/{id}     - delete task with the DELETE HTTP Method - IDEMPOTENT, BUT NOT SAFE

3. json itself on next line, full command as the line below that

'{"title": "Watch Week 4 lecture", "course": "CS453", "completed": true}'

curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json" -d '{"title": "Watch Week 4 lecture", "course": "CS453", "completed": true}'

**Part 3.**

See source code, this is an adapted version of lab3 since the midterm says that we are allowed to use our labs as a resource

**Part 4.**

The middleware that takes care of repeated functions such as validating json for put and post, as well as the logging function that runs on every request has been moved outside of the routes themselves to prevent inconsistencies in repitions of the code as well as to increase conciseness and readability.

**Part 5.**

again, this is mainly an adapted version of lab3's test, it can be run with the same "npm test" command that is used to test the lab

**Part 6.**

See openapi.yaml

**Part 6.**

**Part 7.**

**Part 8.**


