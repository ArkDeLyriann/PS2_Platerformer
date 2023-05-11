export default class test extends Phaser.Scene {
    constructor() {
      super({
        key: "global"
      });
    }
    init(data){
      this.spawnX = data.x
      this.spawnY = data.y
      this.playerHP = data.playerHP
      this.thune = data.thune
      this.havePelle = data.havePelle
      this.haveGun = data.haveGun
      
    }

    preload(){
        this.load.image("tileset", "src/assets/tileset_temp.png");
        this.load.tilemapTiledJSON("testRoom", "src/assets/maps/test.json");
        this.load.spritesheet("player", "src/assets/sprites/player/player.png",{
        frameWidth: 96,
        frameHeight: 96,})
        


    }

    create(){
    


    }

}
