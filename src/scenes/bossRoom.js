import Player from "../entities/player.js";
import bossP3 from "../entities/bossP3.js";
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

            this.boss = new bossP3(this, 13*64, 10*64, 'boss');
            this.physics.add.collider(this.boss, plateformes);
            this.boss.setScale(1.4);
            this.boss.setSize(150,256)

        
            this.player = new Player(this, 0, 12*64, 'player');
            this.player.refreshBody();
            this.player.setSize(32,64);
            this.player.setOffset(48,32);
            this.physics.add.collider(this.player, plateformes);
            plateformes.setCollisionByExclusion(-1, true);


            this.physics.world.setBounds(0, 0, 1600, 960);
            this.cameras.main.setBounds(0, 0, 1600, 960);
            this.cameras.main.setZoom(0.75);
            this.cameras.main.startFollow(this.player);
    }

    update(){
        this.player.update();
    }


}