import express from 'express';
import cors from 'cors';
const app = express();
import './db/conn.js';
import users from './routes/user.js';
import orders from './routes/order.js';

app.use(express.json());
app.use(cors());

app.use('/', users);
app.use('/', orders);


app.listen(5000, () => {
    console.log('server is running');
})

