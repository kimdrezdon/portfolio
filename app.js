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

app.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (id > 4 || isNaN(id)) {
        return next();
    }
    const project = projects[id];
    const projectName = project.project_name;
    const { description } = project;
    const { technologies } = project;
    const liveLink = project.live_link;
    const githubLink = project.github_link;
    const imageUrls = project.image_urls.slice(1);

    const templateData = { projectName, description, technologies, liveLink, githubLink , imageUrls};

    res.render('project', templateData);
});

app.use((req, res, next) => {
    const err = new Error('Looks like you may have gotten lost!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
})

app.listen(3000);