import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {User} from './models/user_model.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Allow all origins with default of CORS
//app.use(cors());
/*app.use(
    cors({
        origin: 'http://localhost3000',
        methods: ['GET', 'POST', 'PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
*/

//Landing Page Route 
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Sortify');
});

//Example POST Route
app.post('/users', async (request, response) => {
    try{
        if(
            !request.body.name ||
            !request.body.metric2 ||
            !request.body.metric3
        ) {
            return response.status(400).send({
                message: "Send all required fields: name, metric2, metric3",
            });
        }
        const newUser = {
            name: request.body.name,
            metric2: request.body.metric2,
            metric3: request.body.metric3
        }

        const user = await User.create(newUser);

        return response.status(201).send(user);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


mongoose
 .connect(mongoDBURL)
 .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    
    });
 })
 .catch((error) => {
    console.log(error);
 });