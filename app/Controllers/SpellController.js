import SpellService from "../Services/SpellService.js";
import _store from "../store.js";

//Private
function _draw() {
  let spells = _store.State.spells;
  console.log(spells);
}

//Public
export default class SpellController {
  constructor() {
    _store.subscribe("spells", _draw);
  }
}
