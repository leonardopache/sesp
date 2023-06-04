> [!NOTE] PoC for Nodejs acting as a backend API
> - [ ] Rest API
> - [ ] Websocket API
> - [ ] gRPC API
> - [ ] Oauth/JWT API security 


### <ins>Rest API</ins>

##### Libraries used
```sh
npm i express --save
npm i body-parser 
npm i mongoose 
```

##### Code repo
- https://github.com/leonardopache/java-script/tree/main/nodejs/todo-list-api

##### _Knowledge sharing_  
![[Pasted image 20230604170652.png]]
##### API definition
###### Todo-list
	API for management of Todo's
		 Version: 1.0.0
	/todos
		GET
		Summary: Read all Todos
		Responses:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```
		POST
		Summary: Create new Todo
		Body:
```json
{
  "title": "string",
  "description": "string",
  "status": "PENDING"
}
```
		Responses:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```
	/todos/{todoId}
		GET
		Summary: Read a single Todo
		Parameters:
			todoId: path
		Responses
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```
		PUT
		Summary: Update a todo
		Parameters:
			todoId: path
		Body:
```json
{
  "title": "string",
  "description": "string",
  "status": "PENDING"
}
```
		Responses
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```
		DELETE
		Summary: Delete a Todo
		Parameters:
			todoId: path
		Responses
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "PENDING",
  "createdAt": "string",
  "updatedAt": "string"
}
```

##### Examples
- Create TODO
```sh
curl -d '{"title":"Todo1", "description":"My first TODO", "status": "PENDING"}' -H "Content-Type: application/json" -X POST http://localhost:3005/todos
```
- Retrieve all TODO's
```sh
curl http://localhost:3005/todos/
```
- Retrieve single TODO
```sh
curl http://localhost:3005/todos/_id
```
- Update one TODO (PUT)
```sh
curl -d '{"status": "DONE"}' -H "Content-Type: application/json" -X PUT http://localhost:3005/todos/_id
```
- Delete TODO
```sh
curl -X DELETE http://localhost:3005/todos/_id
```




### <ins>Websocket API</ins>

##### libraries used
```sh
npm i axios
```

##### Code repo
- http://github.com/leonardopache

##### _Knowledge sharing_  
##### API definition
##### Examples

### <ins>gRPC API</ins>

##### libraries used
```sh
npm i axios
```

##### Code repo
- http://github.com/leonardopache

##### _Knowledge sharing_  
##### API definition
##### Examples

### <ins>oauth/JWT API Security</ins>

##### libraries used
```sh
npm i axios
```

##### Code repo
- http://github.com/leonardopache

##### _Knowledge sharing_  
##### JWT (Jason Web Token)
##### API definition

##### Examples

### <ins>Useful commands</ins>

```sh
#init project
npm init 

# add debug mode with Nodemon
npm install -g nodemon
npm install --save-dev nodemon
nodemon [your node app]
```

Code of client API consumer
```js
npm i axios //install axios hybrid client based on promise

// GET 
const axios = require('axios');
getAllTodos();
async function getAllTodos() {
	try {
		const response = await axios.get(`${API_SERVER}/${ENDPOINT}`);
		console.log(response);
	} catch(error) {
		console.error(error);
	}
}
```

Using `process.env.VARIABLE_NAME` with React 
```js
/* For react project no lib is required if: 
* - Create .env filen at the root
* - Name the variable with prefix REACT_APP_varName=varValue
* - Get the value with process.env.REACT_APP_HELLO
*/
console.log(process.env.REACT_APP_HELLO);
```