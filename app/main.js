import SpellController from "./Controllers/SpellController.js";

class App {
  spellController = new SpellController();
}

window["app"] = new App();
