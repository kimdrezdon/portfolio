const express = require('express');

const app = express();

const data = require('./data/data.json');
const projects = data.projects

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const templateData = { projects };

    res.render('index', templateData);
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];

    const title = project.project_name;

    const { description } = project;

    const { technologies } = project;

    const liveLink = project.live_link;

    const githubLink = project.github_link;

    const imageUrls = project.image_urls.slice(1);

    const templateData = { title, description, technologies, liveLink, githubLink , imageUrls};

    res.render('project', templateData);
});

app.listen(3000);