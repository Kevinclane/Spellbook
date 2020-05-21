import _store from "../store.js";
import Spells from "../Models/Spell.js";
import store from "../store.js";

// @ts-ignore
const _apiSpells = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/spells/",
  timeout: 15000
})

// @ts-ignore
const _myApiSpells = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/kevin/spells",
  timeout: 15000
})

class SpellService {



  constructor() {
    this.getApiSpells()
    this.getMySpells()
  }

  getApiSpells() {
    _apiSpells.get("")
      .then(res => {
        // let spells = res.data.map(s => new Spells(s))
        _store.commit("apiSpells", res.data)
      })
      .catch(e => console.error(e))
  }

  getMySpells() {
    _myApiSpells.get("")
      .then(res => {
        let spells = res.data.data.map(s => new Spells(s))
        _store.commit("mySpells", spells)
      })
      .catch(e => console.error(e))
  }

  addActiveSpell(id) {
    let newId = id.toString()
    _apiSpells.get(newId)
      .then(res => {
        let activeSpell = new Spells(res.data)
        _store.commit("activeSpell", activeSpell)
      })
      .catch(e => console.error(e))
  }

  setActiveSpell(id) {
    let foundSpell = _store.State.mySpells.find(s => s.id == id)
    _store.commit("activeSpell", foundSpell)
  }


  addSpell() {
    _myApiSpells.post("", _store.State.activeSpell)
      .then(res => {
        this.getMySpells()
      })
      .catch(e => console.error(e))
  }

  dispel() {
    _myApiSpells.delete(_store.State.activeSpell.id)
      .then(res => {
        this.getMySpells()
        _store.commit("activeSpell", null)
      })
      .catch(e => console.error(e))
  }

}

const service = new SpellService();
export default service;