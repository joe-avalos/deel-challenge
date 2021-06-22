# DEEL TASK

The app requires [Docker](https://docs.docker.com/get-docker/) to be installed.



1. Start by cloning this repository.



2. In the repo root directory, run `docker compose up` to start containers.

## Frontend App

Frontend app built with [React](https://create-react-app.dev/). The UI should be intuitive.  
`/contracts` route and `/jobs` route will not work until you "login" (select a user profile from the home `/` route. 



## Implemented APIs


Below is a list of the exposed endpoints for the backend server. Prefix with `http://localhost:8080/api`


1. ***GET*** `/contracts/:id` - returns selected contract info

1. ***GET*** `/contracts` - Returns 
```
[{'id', 'status', 'terms'}]
```
3. ***GET*** `/jobs/unpaid` - Returns
   ```
   [{"id", "description", "price", "paid", "paymentDate", "createdAt", "updatedAt", "ContractId"}]
   ```

1. ***POST*** `/jobs/:job_id/pay` - Returns status (success/error) message.

1. ***POST*** `/balances/deposit/:userId` - Returns status (success/error) message.

1. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money.

1. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - Returns
```
[{"id", "fullName", "paid"}]
```

## File structure

- 📂 __deel__
    - 📂 __backend__
        - 📄 [Dockerfile](backend_git/Dockerfile)
        - 📄 [README.md](backend_git/README.md)
        - 📄 [node\_modules](backend_git/node_modules)
        - 📄 [package.json](backend_git/package.json)
        - 📂 __scripts__
            - 📄 [seedDb.js](backend_git/scripts/seedDb.js)
        - 📂 __src__
            - 📄 [app.js](backend_git/src/app.js)
            - 📂 __middleware__
                - 📄 [getProfile.js](backend_git/src/middleware/getProfile.js)
            - 📄 [model.js](backend_git/src/model.js)
            - 📂 __routes__
                - 📄 [admin.router.js](backend_git/src/routes/admin.router.js)
                - 📄 [balances.router.js](backend_git/src/routes/balances.router.js)
                - 📄 [contracts.router.js](backend_git/src/routes/contracts.router.js)
                - 📄 [jobs.router.js](backend_git/src/routes/jobs.router.js)
                - 📄 [users.router.js](backend_git/src/routes/users.router.js)
            - 📄 [server.js](backend_git/src/server.js)
        - 📄 [yarn.lock](backend_git/yarn.lock)
    - 📄 [docker\-compose.yml](docker-compose.yml)
    - 📂 __frontend__
        - 📄 [Dockerfile](frontend/Dockerfile)
        - 📄 [README.md](frontend/README.md)
        - 📄 [node\_modules](frontend/node_modules)
        - 📄 [package.json](frontend/package.json)
        - 📂 __public__
            - 📄 [favicon.ico](frontend/public/favicon.ico)
            - 📄 [index.html](frontend/public/index.html)
            - 📄 [manifest.json](frontend/public/manifest.json)
            - 📄 [robots.txt](frontend/public/robots.txt)
        - 📂 __src__
            - 📄 [App.css](frontend/src/App.css)
            - 📄 [App.js](frontend/src/App.js)
            - 📄 [App.test.js](frontend/src/App.test.js)
            - 📂 __components__
                - 📄 [Admin.js](frontend/src/components/Admin.js)
                - 📄 [BestClient.js](frontend/src/components/BestClient.js)
                - 📄 [BestProfession.js](frontend/src/components/BestProfession.js)
                - 📄 [ContractDetails.js](frontend/src/components/ContractDetails.js)
                - 📄 [Contracts.js](frontend/src/components/Contracts.js)
                - 📄 [ContractsList.js](frontend/src/components/ContractsList.js)
                - 📄 [Jobs.js](frontend/src/components/Jobs.js)
                - 📄 [JobsList.js](frontend/src/components/JobsList.js)
                - 📄 [NavBar.js](frontend/src/components/NavBar.js)
                - 📄 [PrivateRoute.js](frontend/src/components/PrivateRoute.js)
                - 📄 [UserList.js](frontend/src/components/UserList.js)
                - 📄 [Users.js](frontend/src/components/Users.js)
            - 📂 __contexts__
                - 📄 [admin.context.js](frontend/src/contexts/admin.context.js)
                - 📄 [app.context.js](frontend/src/contexts/app.context.js)
                - 📄 [balances.context.js](frontend/src/contexts/balances.context.js)
                - 📄 [contracts.context.js](frontend/src/contexts/contracts.context.js)
                - 📄 [jobs.context.js](frontend/src/contexts/jobs.context.js)
                - 📄 [users.context.js](frontend/src/contexts/users.context.js)
            - 📄 [index.css](frontend/src/index.css)
            - 📄 [index.js](frontend/src/index.js)
            - 📄 [setupTests.js](frontend/src/setupTests.js)
            - 📂 __static__
                - 📄 [favicon.png](frontend/src/static/favicon.png)
            - 📂 __util__
                - 📄 [checkStatus.js](frontend/src/util/checkStatus.js)
        - 📄 [yarn.lock](frontend/yarn.lock)
    - 📂 __nginx__
        - 📄 [nginx.conf](nginx/nginx.conf)
    - 📄 [readme.md](readme.md)




## Comments

Didn't write tests and focused on developing a fully working app with frontend and backend that works in docker containers.
