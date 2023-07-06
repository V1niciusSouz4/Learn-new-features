import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();

app.set('view engine', 'ejs');
let access_token = '';

app.get('/', (req, res) => {
  res.render('pages/index', { client_id: process.env.GITHUB_CLIENT_ID });
});

app.get('/github/callback', (req, res) => {
  const requestToken = req.query.code;
  console.log('requestToken ==>', requestToken);

  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then(response => {
    console.log('response data ==>', response.data);
    access_token = response.data.access_token;

    res.redirect('/success');
  });
});

app.get('/success', (req, res) => {
  axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: `token ${access_token}`,
    },
  }).then(response => {
    console.log('response success', response.data);

    res.render('pages/github', { userData: response.data });
  });
});

const port = 9090;

app.listen(port, () => console.log(`App Listen on port ${port}`));
