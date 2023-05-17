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
            frameWidth: 128,
            frameHeight: 128,})


        this.load.spritesheet('testFly', "src/assets/sprites/possion.png",{
            frameWidth: 32,
            frameHeight: 32
            })
        this.load.spritesheet('hitBoite', "src/assets/sprites/hitboxCoup.png",{
            frameWidth: 64,
            frameHeight: 64
            })
            
            
            
        }
    
    create(){
        this.canHit = true
        this.clavier = this.input.keyboard.addKeys('A,Z,SPACE,E');
            
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
        this.player.setSize(32,64);
        this.player.setOffset(48,32);
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

        if (Phaser.Input.Keyboard.JustDown(this.clavier.A)){
            if(this.canHit){
            this.invoqueAttaque();
            }
        }

    }

    flyReset(){
        this.player.canFly = true;
        console.log(this.player.canFly)
    }
    invoqueAttaque(){
        this.canHit = false
        if(this.player.goingRight){
        this.attaqueBox = this.physics.add.sprite(this.player.x + 64,this.player.y, 'hitBoite');
        }
        if(this.player.goingLeft){
            this.attaqueBox = this.physics.add.sprite(this.player.x - 64,this.player.y, 'hitBoite');
            }
        this.attaqueBox.body.setAllowGravity(false);

        setTimeout(() => {
            this.canHit = true
            this.attaqueBox.destroy();
        }, 250);
    }          
}
