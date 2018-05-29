"Use strict";

let lines = [];
let scenes = [];
let choices = [];

const app = new PIXI.Application(900, 600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

let stage;
let startScene, gameScene, endScene;
let currentScene = 0;

let currentText;
let again;

let title;

let lead = [];
let leadTextures;
let sub = [];
let subTextures;
let mom = [];
let momTextures;
let dad = [];
let dadTextures;

let back;
let fore;

let left;
let right;

let run = false;
let together = false;
let leadDir;
let subDir;
let leadSpeed = Math.random() * (5 - 2) + 2;
let subSpeed = Math.random() * (5 - 2) + 2;

// pre-load the images
PIXI.loader.
add([]).
on("progress", e => {
  console.log(`progress=${e.progress}`)
}).
load(setup);

function setup()
{
  stage = app.stage;

  setTimeout(function()
  {
      loadGrammar();
  }, 10);

  startScene = new PIXI.Container();
  stage.addChild(startScene);

  gameScene = new PIXI.Container();
  gameScene.visible = false;
  stage.addChild(gameScene);
  menu();

  app.ticker.add(gameLoop);
}

function loadGrammar()
{
    var grammar = tracery.createGrammar(grammars["youme"]);
    for (var i = 0; i < 3; i++)
    {
        var s = grammar.flatten("#origin#");
        lines.push(s);
        console.log(s);
    }
}

function loadSpriteSheet(name){
	let spriteSheet = PIXI.BaseTexture.fromImage("media/" + name);
	let width = 64;
	let height = 64;
	let numFrames = 8;
	let textures = [];
	for(let i = 0; i < numFrames; i++)
  {
		let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * width, 0, width, height));
		textures.push(frame);
	}

	return textures;
}

function createAnim(spriteSheet)
{
	let anim = new PIXI.extras.AnimatedSprite(spriteSheet);
	anim.animationSpeed = 1/10;
	anim.loop = true;
  anim.play();
	return anim;
}

function startGame()
{
  startScene.visible = false;
  gameScene.visible = true;

  parseScenes();
  createScenes();
  createUI();
  displayText();
}

function createScenes()
{
  gameScene.removeChild(back);
  gameScene.removeChild(lead);
  gameScene.removeChild(sub);
  gameScene.removeChild(sub);
  gameScene.removeChild(mom);
  gameScene.removeChild(fore);
  mom.visible = false;
  dad.visible = false;

  if(scenes[currentScene] == "clouds")
  {
    back = PIXI.Sprite.fromImage("media/hillsback.png");
    back.x = 0;
    back.y = 0;

    if(choices[currentScene] == "fish")
    {
      fore = PIXI.Sprite.fromImage("media/fish.png");
    }
    if(choices[currentScene] == "robo")
    {
      fore = PIXI.Sprite.fromImage("media/robots.png");
    }
    if(choices[currentScene] == "dino")
    {
      fore = PIXI.Sprite.fromImage("media/dinos.png");
    }
    if(choices[currentScene] == "lame")
    {
      fore = PIXI.Sprite.fromImage("media/lame.png");
    }
    fore.x = 0;
    fore.y = 0;

    lead.x = Math.floor(Math.random() * 380) + 100;
    lead.y = 400;

    sub.x = Math.floor(Math.random() * 480) + 500;
    sub.y = 400;

    leadDir = Math.random() >= 0.5;
    subDir = Math.random() >= 0.5;

    if(together)
    {
      sub.x = lead.x + 50;
    }

    gameScene.addChild(back);
    gameScene.addChild(lead);
    gameScene.addChild(sub);
    gameScene.addChild(mom);
    gameScene.addChild(dad);
    gameScene.addChild(fore);
  }

  if(scenes[currentScene] == "church")
  {
    back = PIXI.Sprite.fromImage("media/churchback.png");
    back.x = 0;
    back.y = 0;

    lead.x = Math.floor(Math.random() * 380) + 300;
    lead.y = 420;
    sub.x = Math.floor(Math.random() * 480) + 200;
    sub.y = 420;

    fore = PIXI.Sprite.fromImage("media/churchfore.png")

    gameScene.addChild(back);
    gameScene.addChild(lead);
    gameScene.addChild(sub);
    gameScene.addChild(fore);
  }

  if(scenes[currentScene] == "parents")
  {
    back = PIXI.Sprite.fromImage("media/home.png");
    back.x = 0;
    back.y = 0;

    mom.visible = true;
    dad.visible = true;

    if(choices[currentScene] == "love")
    {
      mom.x = 450;
      mom.y = 350;
      dad.x = 525;
      dad.y = 350;
      mom.visible = true;
      dad.visible = true;
    }
    if(choices[currentScene] == "hate")
    {
      mom.x = 620;
      mom.y = 150;
      dad.x = 338;
      dad.y = 163;
    }

    lead.x = Math.floor(Math.random() * 380) + 300;
    lead.y = 300;

    sub.x = 415;
    sub.y = 350;

    gameScene.addChild(back);
    gameScene.addChild(lead);
    gameScene.addChild(sub);
    gameScene.addChild(mom);
    gameScene.addChild(dad);
  }

  if(scenes[currentScene] == "chai")
  {
    back = PIXI.Sprite.fromImage("media/apt.png");
    back.x = 0;
    back.y = 0;

    mom.visible = true;
    dad.visible = true;

    if(choices[currentScene] == "pacific")
    {
      fore = PIXI.Sprite.fromImage("media/pacif.png");
    }
    if(choices[currentScene] == "clock")
    {
      fore = PIXI.Sprite.fromImage("media/clock.png");
    }
    if(choices[currentScene] == "emoji")
    {
      fore = PIXI.Sprite.fromImage("media/emoji.png");
    }

    lead.x = 454;
    lead.y = 200;

    sub.x = 453;
    sub.y = 225;

    gameScene.addChild(back);
    gameScene.addChild(lead);
    gameScene.addChild(sub);
    gameScene.addChild(fore);
  }
}

function displayText()
{
  gameScene.removeChild(currentText);
  currentText = new PIXI.Text(lines[currentScene], {font: "bold 20px Roboto", fill: '#FFFFFF'});
  currentText.x = 20;
  currentText.y = 525;
  gameScene.addChild(currentText);
}

function createUI()
{
  gameScene.removeChild(left);
  gameScene.removeChild(right);

  if(currentScene != 0)
  {
    left = PIXI.Sprite.fromImage("media/left.png");
    left.buttonMode = true;
    left.interactive = true;
    left.anchor.set(.5);
    left.x = 50;
    left.y = 300;
    left.on("pointerup", changeScene);
    left.on('pointerover', e => e.target.alpha = 0.5);
    left.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(left);
  }

  if(currentScene != 2)
  {
    right = PIXI.Sprite.fromImage("media/right.png");
    right.buttonMode = true;
    right.interactive = true;
    right.anchor.set(.5);
    right.x = 850;
    right.y = 300;
    right.on("pointerup", changeScene);
    right.on('pointerover', e => e.target.alpha = 0.5);
    right.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(right);
  }

  let line = new PIXI.Graphics();
  line.lineStyle(4, 0xFF0000, 1);
  line.moveTo(0, 0);
  line.lineTo(900, 0);
  line.x = 0;
  line.y = 500;
  gameScene.addChild(line);

  let square = new PIXI.Graphics();
  square.beginFill(0x333333);
  square.lineStyle(1,0x333333,1);
  square.drawRect(0,500,900,100);
  square.endFill();
  square.x = 0;
  square.y = 0;
  gameScene.addChild(square);

  if (currentScene == 2)
  {
    again = new PIXI.Text("again?", {
      font: "bold 30px Roboto",
      fill: '#e8df25'
    });
    again.x = 800;
    again.y = 25;
    again.interactive = true;
    again.buttonMode = true;
    again.on("pointerup", reset);
    gameScene.addChild(again);
  }
}

function changeScene()
{
  if(this.x == 850)
  {
    currentScene++;
  }
  else {
    currentScene--;
  }

  createScenes();
  createUI();
  displayText();
}

function menu()
{
  let mainMenu = PIXI.Sprite.fromImage("media/title.png");
  startScene.addChild(mainMenu);

  let startB = PIXI.Sprite.fromImage("media/start.png");
  startB.buttonMode = true;
  startB.anchor.set(0.5);
  startB.x = 433;
  startB.y = 455;
  startScene.addChild(startB);

  leadTextures = loadSpriteSheet("guy1.png");
  lead = createAnim(leadTextures);
  lead.x = 50;
  lead.y = 300;
  startScene.addChild(lead);

  subTextures = loadSpriteSheet("girl1.png");
  sub = createAnim(subTextures);
  sub.scale.x = -1;
  sub.x = 850;
  sub.y = 300;
  startScene.addChild(sub);

  momTextures = loadSpriteSheet("mom.png");
  mom = createAnim(momTextures);
  mom.visible = false;

  dadTextures = loadSpriteSheet("dad.png");
  dad = createAnim(dadTextures);
  dad.visible = false;

  startB.interactive = true;
  startB.on('pointerup', startGame);
  startB.on('pointerover',e=>{e.target.tint=0xdebd66});
  startB.on('pointerdown',e=>{e.target.tint=0x888888});
  startB.on('pointerup',e=>{e.target.tint=0xBBBBBB});
  startB.on('pointerout',e=>{e.currentTarget.tint=0xFFFFFF});
  startB.on('pointerupoutside',e=>{e.target.tint=0xFFFFFF});
}

function parseScenes()
{
  for(var i = 0; i < lines.length; i++)
  {
    if(lines[i].substring(0, 5) == "One d")
    {
      scenes[i] = "clouds";
      let newString = "";

      for(var x = 0; x < lines[i].length; x++)
      {
        if(lines[i].substring(x, x+1) == "!")
        {
          if(lines[i].substring(x+1, x+2) == "d")
          {
            choices[i] = "dino";
          }
          if(lines[i].substring(x+1, x+2) == "f")
          {
            choices[i] = "fish";
          }
          if(lines[i].substring(x+1, x+3) == "ro")
          {
            choices[i] = "robo";
          }
          if(lines[i].substring(x+1, x+2) == "l")
          {
            choices[i] = "lame";
          }
          if(lines[i].substring(x+1, x+2) == "h")
          {
            together = true;
          }
          if(lines[i].substring(x+1, x+3) == "ra")
          {
            run = true;
          }
          if(lines[i].substring(x+1, x+3) == "s")
          {
            run = false;
            together = false;
          }
        }
        else
        {
          newString += lines[i].substring(x, x+1);
        }
      }

      lines[i] = newString;
    }

    if(lines[i].substring(0, 5) == "We we")
    {
      scenes[i] = "church";
      choices[i] = "church";
    }

    if(lines[i].substring(0, 5) == "We fo")
    {
      scenes[i] = "chai";
      let newString = "";

      for(var x = 0; x < lines[i].length; x++)
      {
        if(lines[i].substring(x, x+1) == "!")
        {
          if(lines[i].substring(x+1, x+2) == "P")
          {
            choices[i] = "pacific";
          }
          if(lines[i].substring(x+1, x+2) == "C")
          {
            choices[i] = "clock";
          }
          if(lines[i].substring(x+1, x+2) == "T")
          {
            choices[i] = "emoji";
          }
        }
        else
        {
          newString += lines[i].substring(x, x+1);
        }
      }

      lines[i] = newString;
    }

    if(lines[i].substring(0, 5) == "After")
    {
      scenes[i] = "parents";
      let newString = "";

      for(var x = 0; x < lines[i].length; x++)
      {
        if(lines[i].substring(x, x+1) == "!")
        {
          if(lines[i].substring(x+1, x+2) == "h")
          {
            choices[i] = "hate";
          }
          if(lines[i].substring(x+1, x+2) == "l")
          {
            choices[i] = "love";
          }
        }
        else
        {
          newString += lines[i].substring(x, x+1);
        }
      }

      lines[i] = newString;
    }
  }
}

function reset()
{
  lines = [];
  currentScene = 0;
  left.visible = false;

  setTimeout(function()
  {
      loadGrammar();
  }, 10);

  setup();
}

function gameLoop()
{
  if(scenes[currentScene] == "clouds")
  {
    if(run)
    {
      if(leadDir)
      {
        lead.x += leadSpeed;
      }
      else
      {
        lead.x -= leadSpeed;
      }
      if(lead.x > sceneWidth + 50 || lead.x < -50)
      {
        leadSpeed = Math.random() * (4 - 1) + 1;
        leadDir = !leadDir;
      }

      if(subDir)
      {
        sub.x += subSpeed;
      }
      else
      {
        sub.x -= subSpeed;
      }
      if(sub.x > sceneWidth + 50 || sub.x < -50)
      {
        subSpeed = Math.random() * (4 - 2) + 1;
        subDir = !subDir;
      }
    }

    if(together)
    {
      if(leadDir)
      {
        lead.x += leadSpeed;
        sub.x += leadSpeed;
      }
      else
      {
        lead.x -= leadSpeed;
        sub.x -= leadSpeed;
      }
      if(subDir)
      {
        sub.x += leadSpeed;
      }
      else
      {
        sub.x -= leadSpeed;
      }

      if(lead.x > sceneWidth + 50 || lead.x < -50)
      {
        leadDir = !leadDir;
      }
      if(sub.x > sceneWidth + 50 || sub.x < -50)
      {
        subDir = !subDir;
      }
    }
  }
}
