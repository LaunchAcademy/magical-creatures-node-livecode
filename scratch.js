Talk about the start script


const creaturePath = path.join(__dirname, "../creatures.json")

const getCreatures = () => {
  let fileContents = fs.readFileSync(creaturePath).toString()
  return JSON.parse(fileContents)
}
