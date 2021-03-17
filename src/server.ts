import { app } from "./app";

app.listen(4459, () => console.log("Server is running!"));

/*
CODIGO DA CONSOLE

yarn init -y                     
yarn add express                 
yarn add  @types/express -D   
yarn add typescript -D  
yarn tsc --init   
yarn add ts-node-dev -D  
yarn add typeorm reflect-metadata
yarn add sqlite3
yarn typeorm
yarn add jest @types/jest -
yarn add supertest @types/supertest -D
yarn add nodemailer
yarn add @types/nodemailer -D

yarn add handlebars

COMANDOS 
yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:run
yarn typeorm migration:revert
*/