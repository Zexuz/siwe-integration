
# Sign in with Ethereum

# Frontend
The frontend is built with Reactl, Zustard TailwindCSS and ethers.js. The frontend is hosted on Vercel.

It uses the container/view pattern for the components.

### How to run

1. Update the .env file in the `/app` folder with the correct values
2. Run the following commands
```bash
cd app 
npm install
npm dev
```

### Dependencies
* React
* Zustard
* TailwindCSS
* ethers.js

# Backend
Backend is a simple CRUD (Currently not supporting deleting) app.
The backend is hosted in AWS EC2 using docker and docker-compose.
It builds two docker images, one for the backend and one for the database. 

Since the app has little domain logic, test coverage is not that high.
To compensate for this, I wrote some end-to-end tests using supertest and jest.

* NodeJS
* Express
* MongoDB
* siwe
* joi (validation)
* jest (testing)
* supertest (testing)

### How to run
1. Update the .env file in the `root` folder with the correct values
2. Run the following commands
```bash
docker-compose up -d
```
