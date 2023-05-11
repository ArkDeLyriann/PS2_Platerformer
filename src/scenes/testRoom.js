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
        this.load.image("tileset", "src/assets/maps/tileset_temp.png");
        this.load.tilemapTiledJSON("testRoom", "src/assets/maps/test.json");
        this.load.spritesheet("player", "src/assets/sprites/player/player.png",{
            frameWidth: 96,
            frameHeight: 96,})
            
            
            
        }
        
        create(){
            
            const carteDuNiveau = this.add.tilemap("testRoom");
            
            const tileset = carteDuNiveau.addTilesetImage(
                "tileset_temp",
                "tileset"
                );
                
                const plateformes = carteDuNiveau.createLayer(
                    "platerformes",
                    tileset
                    );
                    
                    const fond = carteDuNiveau.createLayer(
                        "background",
                        tileset
                        );
                        
                        this.player = new Player(this, 1376, 1888, 'player');
                        this.player.refreshBody();
                        this.physics.add.collider(this.player, carteMurs);
                        carteMurs.setCollisionByExclusion(-1, true);
                        
                        
                        
                        this.anims.create({
                            key: "iddle_left",
                            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 12 }),
                            frameRate: 24,
                            repeat: -1
                        });
                    }
                    
                }
