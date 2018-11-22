
import { Router } from 'express';
import bodyParser from 'body-parser';
import async from 'express-async-await';
import fetch from 'node-fetch';
import fs from 'fs';

const searchRouter = module.exports = new Router();

searchRouter.get('/search', (req, res) => {
    fs.readFile('src/data.json', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data);
        res.status(201).json(jsonData);
    });
});

const createTaskFromBody = (body) => {
    const newTask = {}
    Object.keys(body).forEach(key => newTask[key] = body[key]);
    return newTask;
}

const appendOrUpdateJSON = (object, update) => {
    fs.readFile('src/data.json', (err, data) => {
        const jsonData = JSON.parse(data);
        if (update) {
            const index = jsonData.findIndex(item => item.ID === object.ID);
            const oldItem = jsonData[index];
            Object.keys(oldItem).forEach(key => oldItem[key] = object[key]);
            oldItem.updated = Date.now();
        } else {
            jsonData.push(object);
        }
        const content = JSON.stringify(jsonData);
        fs.writeFile('src/data.json', content);
    });
}

searchRouter.post('/create', (req, res) => {
    const newTask = createTaskFromBody(req.body);
    newTask.status = 'open';
    appendOrUpdateJSON(newTask);
    res.status(200).json(newTask);
});

searchRouter.post('/update', (req, res) => {
    const newTask = createTaskFromBody(req.body);
    appendOrUpdateJSON(newTask, true);
    res.status(200).json(newTask);
});
