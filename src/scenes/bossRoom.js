import Player from "../entities/player.js";
import TrashEnemy from "../entities/trashEnemy.js";

export default class boss extends Phaser.Scene {
    constructor() {
        super({
            key: "boss"
        });
    }


    preload(){
        this.load.image("tileset2", "src/assets/maps/tileset_temp.png");
        this.load.tilemapTiledJSON("bossRoom", "src/assets/maps/bossRoom.json");

        this.load.spritesheet("boss", "src/assets/sprites/boss/BOssP3.png",{
            frameWidth: 256,
            frameHeight: 256,})

    }
    
    
    create(){

        const carteDuNiveau = this.add.tilemap("bossRoom");
                
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset_temp",
            "tileset2"
            );
        const fond = carteDuNiveau.createLayer(
            "fond",
            tileset
            );      
                        
        const plateformes = carteDuNiveau.createLayer(
            "plateformes",
            tileset
            );

        
            this.player = new Player(this, 0, 16*64, 'player');
            this.player.refreshBody();
            this.player.setSize(32,64);
            this.player.setOffset(48,32);
            this.physics.add.collider(this.player, plateformes);
            plateformes.setCollisionByExclusion(-1, true);


            this.physics.world.setBounds(0, 0, 1920, 1280);
            this.cameras.main.setBounds(0, 0, 1920, 1280);
            this.cameras.main.setZoom(1);
            this.cameras.main.startFollow(this.player);
    }

    update(){
        this.player.update();
    }


}