import express, { Application, NextFunction, Request, Response } from 'express';

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

const authenticate = () => {

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


app.get('/users', authenticate, (req: Request, res: Response) => {
    res.json([{name: 'user1'}]);
});

app.get('/users/:username', validate, authenticate, (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.query);
    res.send(`Your name is:${req.params.username}- ${req.query.type}`);
});

// app.use(logger);

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});


app.listen(3000, () => {
    console.log('listening on 3000');
});