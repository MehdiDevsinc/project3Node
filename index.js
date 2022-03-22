import express from 'express';
import bodyParser from 'body-parser';
//---import post router from posts
import post from './routes/post'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;
app.use ('/posts', post)
app.get('/', (req, res) => res.status(200).send({
   message: 'Hi this is sample node'
}));

app.listen(port, () => console.log(`Server is running on PORT ${port}`));