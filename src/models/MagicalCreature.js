import creatures from '../creatures.js'

class MagicalCreature {
  constructor(name, magicalAbility, age = null) {
    this.name = name
    this.magicalAbility = magicalAbility
    this.age = age
  }

  isAncient() {
    if (this.age <= 200) {
      return false
    }
    return true
  }

  static findAll() {
    let magicalCreatures = []
    creatures.map(creature => {
      magicalCreatures.push(new MagicalCreature(creature.name, creature.magicalAbility, creature.age))
    })
    return magicalCreatures
  }

  static find(creatureName) {
    creatures.find(creature => { creature.name === creatureName })
  }
}

export default MagicalCreature