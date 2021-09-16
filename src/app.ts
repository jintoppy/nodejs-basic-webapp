import express, { Application, NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';

const app: Application = express();

const users = [
    {
        username: 'user1',
        password: 'pwd' 
    },
    {
        username: 'user2',
        password: 'pwd2' 
    }
];

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.query;
    const matchingUser = users.find(u => u.username === username && u.password === password);
    if(matchingUser){
        next();
    }
    else {
        res.send('You are not allowd to access this url');
    }
};

//middleware
const validate = (req: Request, res: Response, next: NextFunction) => {    
    if(req.params.username === 'guest'){
        res.send('You are a guest user');
    }
    else {
        next();
    }    
}

app.use(express.static('./src/public'));
app.use(json());

app.get('/users', (req: Request, res: Response) => {
    res.json([{name: 'user1'}]);
    console.log('helo');
});

app.post('/users', (req: Request, res: Response) => {
    console.log(req.body);
    const { username, password } = req.body;
    if(username && password){
        users.push({username, password});
        res.send('done');
        return;
    }
    res.status(500).send({msg: 'not valid'});
});

app.get('/users/:username', validate, authenticate, (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.query);
    res.send(`Your name is:${req.params.username}- ${req.query.type}`);
});

// app.use(logger);

// app.get('/', (req: Request, res: Response) => {
//     res.send('hello');
// });


app.listen(3000, () => {
    console.log('listening on 3000');
});