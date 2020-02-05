const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const fs = require("fs")
const flash = require("flash")
const hbsMiddleware = require("express-handlebars")

const app = express()

const dataPath = path.join(__dirname, "../data.csv")
const fields = ["title", "url", "description"]

// view engine setup
app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())
app.use(
  expressSession({
    secret: "Launch Academy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)
app.use(flash())

// flush session
app.use((req, res, next) => {
  if (req.session && req.session.flash && req.session.flash.length > 0) {
    req.session.flash = []
  }
  next()
})

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))

//your code below
const creaturePath = path.join(__dirname, "../creatures.json")

const getCreatures = () => {
  let fileContents = fs.readFileSync(creaturePath).toString()
  return JSON.parse(fileContents)
}

app.get("/", (req, res) => {
  res.redirect("/creatures")
})

app.get("/creatures", (req,res) => {
  res.render("index", {creatures:getCreatures()})
})

app.get("/creatures/new", (req,res) => {
  creature = {name:"", age:"", ability:""}
  res.render("new", {creature:creature})
})

app.get("/creatures/:creature", (req,res) => {
  creatures = getCreatures()
  creature = creatures.find(creature => {
    return creature.name === req.params.creature
  })
  if (creature) {
    res.render("show", {creature:creature})
  } else {
    res.status(404).send("You must have imagined it")
  }
})

app.post("/creatures", (req,res) => {
  let creaturesArray = getCreatures()
  const newCreature = {name:req.body.name, age: req.body.age, ability: req.body.ability}
  if (newCreature.name) {
    creaturesArray.push(newCreature)
    fs.writeFileSync(creaturePath, JSON.stringify(creaturesArray))
    res.redirect("/")
  } else {
    res.render("new")
  }
})

module.exports = app
