import SpellService from "../Services/SpellService.js";
import _store from "../store.js";

//Private
function _drawApiSpells() {
  let spells = _store.State.apiSpells;
  let template = ""
  spells.forEach(s => template += `<li class="my-2" type="button" onclick="app.spellController.addActiveSpell('${s.id}')">${s.name}</li>`)
  document.getElementById("apiSpells").innerHTML = template
}

function _drawActiveSpell() {
  let spell = _store.State.activeSpell
  if (spell) {
    document.getElementById("activeSpell").innerHTML = spell.ActiveTemplate
  } else {
    document.getElementById("activeSpell").innerHTML = ""
  }
}

function _drawMySpells() {
  let spells = _store.State.mySpells;
  let template = ""
  spells.forEach(s => template += s.MyTemplate)
  document.getElementById("mySpells").innerHTML = template
}
//Public
export default class SpellController {
  constructor() {
    _store.subscribe("apiSpells", _drawApiSpells);
    _store.subscribe("activeSpell", _drawActiveSpell)
    _store.subscribe("mySpells", _drawMySpells)
  }

  addActiveSpell(id) {
    SpellService.addActiveSpell(id)
  }

  setActiveSpell(id) {
    SpellService.setActiveSpell(id)
  }

  addSpell() {
    SpellService.addSpell()
  }

  dispel() {
    SpellService.dispel()
  }
}
