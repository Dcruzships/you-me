"Use strict";

let lines = [];

function loadGrammar(name)
{
    var grammar = tracery.createGrammar(grammars[name]);
    for (var i = 0; i < 3; i++)
    {
        var s = grammar.flatten("#origin#");
        lines.push(s);
    }
}
setTimeout(function()
{
    loadGrammar("youme");
}, 10);

const app = new PIXI.Application(900, 600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
PIXI.loader.
add(["images/Spaceship.png", "images/explosions.png"]).
on("progress", e => {
  console.log(`progress=${e.progress}`)
}).
load(setup);
