import Player from "../entities/player.js";

export default class test extends Phaser.Scene {
    constructor() {
        super({
            key: "test"
        });
    }
    init(data){

    }
    
    preload(){
        this.load.image("tileset", "src/assets/maps/tileset_temp.png");
        this.load.tilemapTiledJSON("testRoom", "src/assets/maps/map_test.json");
        this.load.spritesheet("player", "src/assets/sprites/player/player.png",{
            frameWidth: 96,
            frameHeight: 96,})


        this.load.spritesheet('testFly', "src/assets/sprites/possion.png",{
            frameWidth: 32,
            frameHeight: 32
            })
            
            
            
        }
    
    create(){
            
        const carteDuNiveau = this.add.tilemap("testRoom");
            
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset_temp",
            "tileset"
            );
        const fond = carteDuNiveau.createLayer(
            "Background",
            tileset
            );      
        
            const plateformes = carteDuNiveau.createLayer(
            "plateformes",
            tileset
            );

        this.testFly = this.physics.add.sprite(32*32, 21*32, 'testFly');
                    

                        
        this.player = new Player(this, 0, 32*64, 'player');
        this.player.refreshBody();
        this.physics.add.collider(this.player, plateformes);
        this.physics.add.collider(this.testFly, plateformes);
        this.physics.add.collider(this.testFly, this.player, this.flyReset,null, this );
        plateformes.setCollisionByExclusion(-1, true);
                        
                        
                        
        this.anims.create({
            key: "run_left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
            frameRate: 24,
            repeat: -1
        });

        this.physics.world.setBounds(0, 0, 3500, 3500);
        this.cameras.main.setBounds(0, 0, 3500, 3500);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.player);

            
    }
    update(){
        console.log(this.player.canFly);
        this.player.update();

    }

    flyReset(){
        this.player.canFly = true;
        console.log(this.player.canFly)
    }
                    
}
