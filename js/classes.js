class Lexia extends PIXI.Graphics{
  constructor(text, color=0xFF0000)
  {
    super();
    this.lineStyle(8, 0xFFFFFF);
    this.moveTo(0, 400);
    this.beginFill(color);
    this.lineTo(900, 400);
    this.endFill();
  }
}

class Char extends PIXI.Sprite{
  constructor(x=0,y=0,name="guy1.gif")
  {
    let sprite = "media/" + name;
    super(PIXI.loader.resources[sprite].texture);
    this.anchor.set(.5,.5);
    this.scale.set(1);
    this.x = x;
    this.y = y;
  }
}

class Stat extends PIXI.Graphics{

}
