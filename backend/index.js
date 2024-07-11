import app from "./server.js";
import mongodb from "mongodb";
import dotenv from 'dotenv';
import ReviewsDAO from "./dao/DAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.c2lizsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

MongoClient.connect(uri, {
    maxPoolSize: 100,
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).catch(err => {
    console.error(err);
    process.exit(1);
}).then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Listening port: ${port}`)
    })
});