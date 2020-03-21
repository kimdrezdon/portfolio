//Require express
const express = require("express");
const app = express();

//Require JSON data object
const data = require("./data/data.json");
const { certifications, profiles, technologies, projects } = data;

//Serve static files
app.use("/static", express.static("public"));

//Set Pug as the templating engine
app.set("view engine", "pug");

//Route for Index page
app.get("/", (req, res) => {
  const templateData = { projects };

  res.render("index", templateData);
});

//Route for About page
app.get("/about", (req, res) => {
  const templateData = { technologies, profiles, certifications };

  res.render("about", templateData);
});

//Route for project pages
app.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  if (id > projects.length || isNaN(id)) {
    return next();
  }
  const project = projects[id];
  const projectName = project.project_name;
  const { description, technologies } = project;
  const liveLink = project.live_link;
  const githubLink = project.github_link;
  const imageUrls = project.image_urls.slice(1);

  const templateData = {
    projectName,
    description,
    technologies,
    liveLink,
    githubLink,
    imageUrls
  };

  res.render("project", templateData);
});

//Error route
app.use((req, res, next) => {
  const err = new Error("Looks like you may have gotten lost!");
  err.status = 404;
  next(err);
});

//Error middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

//Heroku port setup
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
