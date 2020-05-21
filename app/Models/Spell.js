export default class Spells {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title
    this.name = data.name
    this.description = data.description || data.desc.join("\n")
    this.level = data.level
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.mySpell = data.description != undefined
  }



  get ApiTemplate() {
    return /*html*/`
<li class="my-2" type="button" onclick="app.spellController.addActiveSpell('${this.id}')">${this.name}</li>
`

  }

  get ActiveTemplate() {
    return /*html*/`
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center">${this.name}</h5>
                                <p class="card-text">${this.description}</p>
                                <p class="card-text">Level: ${this.level}</p>
                                <p class="card-text">Range: ${this.range}</p>
                                <p class="card-text">Duration: ${this.duration}</p>
                                <p class="card-text">Components: ${this.components}</p>
                                ${this.SubTemplate}

                            </div>
                        </div> 
    `
  }

  get MyTemplate() {
    return /*html*/`
    <li class="my-2" type="button" onclick="app.spellController.setActiveSpell('${this.id}')">${this.name}</li>
    `
  }

  get SubTemplate() {
    if (this.mySpell) {
      return /*html*/`
      <button class="btn btn-danger" onclick="app.spellController.dispel()">Dispel</button>
      `
    }
    return /*html*/`
      <button class="btn btn-success" onclick="app.spellController.addSpell()">Add Spell</button>
      `

  }
}