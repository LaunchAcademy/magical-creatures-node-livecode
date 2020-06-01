const createError = require("http-errors")
const express = require("express")
const path = require("path")
const fs = require("fs")
const logger = require("morgan")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
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

const creaturesPath = path.join(__dirname, "../creatures.json")

const getCreatures = () => {
  let fileContents = fs.readFileSync(creaturesPath).toString()
  if (fileContents.length >0) {
  return JSON.parse(fileContents)
}  else {
  return new Array
}
}


app.get("/", (req, res) => {
  res.redirect("/creatures")
})

app.get("/creatures", (req,res) => {
  res.render('index', {creatures: getCreatures()})
})


app.get("/creatures/new", (req,res) => {
  let creature = {name:"", ability:"", age:""}
  res.render("new", {creature:creature})
})

app.get("/creatures/:creature", (req,res) => {
  let creatures = getCreatures()
  let creature = creatures.find(creature => {
    return creature.name === req.params.creature
  })

  if (creature) {
    res.render("show", {creature:creature})
  } else {
    res.status(404).send("No Creature of that type")
  }
})

app.post("/creatures", (req,res) => {
  let creature = {name:req.body.name, ability:req.body.ability, age: req.body.age}
  let creatures = getCreatures()
  creatures.push(creature)
  fs.writeFileSync(creaturesPath, JSON.stringify(creatures))
  res.render("index", {creatures:getCreatures()})
})

module.exports = app
