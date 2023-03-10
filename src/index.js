const express = require('express');
const faker = require('faker');
const app = express();

const utils = require('./utils');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let list = [
  {
    id: faker.datatype.number(),
    title: faker.lorem.words(3),
    isFinish: false,
  }
]

app.get('/api/v1/todo', async (req, res) => {
  await utils.sleep(2000)
  res.status(200);

  res.json({
    list
  })
});

app.post('/api/v1/todo', async (req, res) => {
  await utils.sleep(2000)
  res.status(200);

  const item = {
    id: faker.datatype.number(),
    title: req.body.title,
    isFinish: false,
  }

  list.push(item);

  res.json({
    ...item
  })
});

app.patch('/api/v1/todo/edit', async (req, res) => {
  res.status(200);

  list = list.map(x => ({
    ...x,
    title: x.id === req.body.id ? req.body.title : x.title
  }));

  res.json({
    list
  })
});

app.delete('/api/v1/todo', async (req, res) => {
  res.status(200);

  list = list.filter(x => x.id !== req.body.id);

  res.json({
    list
  })
});

app.patch('/api/v1/todo/finish', async (req, res) => {
  res.status(200);

  list = list.map(x => ({
    ...x,
    isFinish: x.id === req.body.id ? true : x.isFinish
  }));

  res.json({
    list
  })
});

app.patch('/api/v1/todo/revert', async (req, res) => {
  res.status(200);

  list = list.map(x => ({
    ...x,
    isFinish: x.id === req.body.id ? false : x.isFinish
  }));

  res.json({
    list
  })
});

app.listen(process.env.SERVER_PORT, () => {
  console.info(`Started webserver: http://localhost:${process.env.SERVER_PORT}`);
});
