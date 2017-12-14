## Description
ctDoctor RESTful API to complement the CTcue frontend assignment

## Requirements
- Latest NodeJS
- A running instance of the latest version of MongoDB

## Loading the demo data
You can load the mongoDB demo data using the following command on the commandline:

```
> mongorestore -d ctdoctor ctDoctorData/
```

This should insert the 3 required collections: `medications`, `patients` and `visits` in the `ctdoctor` database.

## Running
Install dependencies
```
npm install
```

Start a Local Server
```
npm start
```

Building and Running Production Server
```
npm run prod
```

**Note : Please make sure your MongoDB is running before using ```npm start``` or ```npm run prod```**
