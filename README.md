## Pinzonbase

A open-source API to store your data with any application.

## Supported Applications
Currently **pinzonbase** just have unity support. More options will be added in the future.

# Installation
This installation guide gonna use terminal. You will need [git bash](https://git-scm.com/downloads) and [.NET Core ( At least 3.1 )](https://dotnet.microsoft.com/download) and [MongoDB Shell](https://www.mongodb.com/try/download/shell).
 - Clone the repository into your local machine
 
	 ```bash
	 cd location/of/parent/folder
	 git clone https://github.com/[your_username]/pinzonbase
	 ```

- Install all required dependencies
	```bash
	npm install
	```

- Setup your local environment variables
	```
	MONGODB_URL=[YOUR_MONGODB_URI]
	PORT=[PORT_TO_SERVE_APP]
	```

- Start MongoDB server if you gonna use local database
	```bash
	mongod
	```
- Start the node.js server
	```bash
	npm run start
	```

# Usage
Coming Soon