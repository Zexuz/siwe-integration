
# Sign in with Ethereum

# Auth flow
1. User receives a nonce from the backend (stored in the database)
2. User signs message with their private key
3. User sends the signature to the backend
4. Backend verifies the signature + nonce, returns a JWT token
5. Delete the nonce from the database to prevent replay attacks

## What to improve
* Add better logging, send it to Prometheus or something similar
* Add a CI/CD pipeline and IaC. Currently, the backend is using AWS EC2 previous setup from another project.
* Add more tests, especially for the frontend, at least an end-to-end test using synpress to test frontend -> backend happy-path.


# Frontend
The frontend is built with Reactl, Zustard TailwindCSS and ethers.js. The frontend is hosted on Vercel.

It uses the container/view pattern for the components.

### How to run

1. Rename env.example to .env
2. Update the .env file in the `/app` folder with the correct values
3. Run the following commands
```bash
cd app 
npm install
npm run dev
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
1. Rename env.example to .env
2. Update the .env file in the `root` folder with the correct values
3. Run the following commands
```bash
docker-compose up -d
```
