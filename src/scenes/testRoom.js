import HitBoite from "../entities/hitboxJoueur.js";
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
        this.load.spritesheet("player", "src/assets/sprites/player/player_run.png",{
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
            this.load.spritesheet('vertiLaser', "src/assets/sprites/laser_vertical.png",{
                frameWidth: 64,
                frameHeight: 512
            })
            this.load.spritesheet('fSpin', "src/assets/sprites/firespin.png",{
                frameWidth: 256,
                frameHeight: 64
            })
            
            
            
        }
        
        create(){
            this.canHit = true
            this.hitBoxDroiteExiste = false
            this.hitBoxGaucheExiste = false
            this.hitBoxLaserExiste = false
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
                        this.physics.add.collider(this.testFly, plateformes, this.drift, null, this);
                        this.testCollide = this.physics.add.collider(this.testFly, this.player, this.flyReset,null, this );
                        this.physics.add.overlap(HitBoite, this.testFly, this.taper , null, this)
                        plateformes.setCollisionByExclusion(-1, true);
                        
                        
                        
                        this.anims.create({
                            key: "run_left",
                            frames: this.anims.generateFrameNumbers("player", { start: 12, end: 23 }),
                            frameRate: 12,
                            repeat: -1
                        });
                        this.anims.create({
                            key: "iddle",
                            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
                            frameRate: 12,
                            repeat: -1
                        });
                        
                        this.physics.world.setBounds(0, 0, 3200, 2240);
                        this.cameras.main.setBounds(0, 0, 3200, 2240);
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
                        if(this.player.isDashing){
                            this.testCollide.active = false;
                            this.invoqueAttaqueDash();
                            setTimeout(() => {
                                this.testCollide.active = true;
                            }, 250);
                        }
                        if (this.hitBoxDroiteExiste){
                            this.attaqueBox.x = this.player.x +64;
                            this.attaqueBox.y = this.player.y;
                        }
                        if (this.hitBoxGaucheExiste){
                            this.attaqueBox.x = this.player.x -64;
                            this.attaqueBox.y = this.player.y;
                        }
                        if (this.hitBoxBasExiste){
                            this.attaqueBox.x = this.player.x;
                            this.attaqueBox.y = this.player.y;
                        }
                        
                    }
                    
                    flyReset(){
                        this.player.canFly = true;
                        console.log(this.player.canFly)
                    }
                    invoqueAttaque(){
                        this.canHit = false

                        if (this.player.isJumping){
                            this.hitBoxBasExiste = true
                            
                            this.attaqueBox = new HitBoite(this, this.player.x,this.player.y, 'fSpin');
                            this.attaqueBox.setSize(256,96)

                            
                        }
                        else if(this.player.goingRight){
                            this.hitBoxDroiteExiste = true
                            this.attaqueBox = new HitBoite(this, this.player.x + 64,this.player.y, 'hitBoite');
                        }
                        else if(this.player.goingLeft){
                            this.hitBoxGaucheExiste = true
                            this.attaqueBox = new HitBoite(this, this.player.x - 64,this.player.y, 'hitBoite');
                        }else{
                            
                            this.hitBoxBasExiste = true
                            
                            this.attaqueBox = new HitBoite(this, this.player.x,this.player.y, 'fSpin');
                            this.attaqueBox.setSize(256,96)
                            
                        }
                        this.physics.add.overlap(this.attaqueBox, this.testFly, this.taper , null, this)
                        this.attaqueBox.body.setAllowGravity(false);
                        
                        setTimeout(() => {
                            this.canHit = true
                            this.attaqueBox.destroy();
                            this.hitBoxDroiteExiste = false;
                            this.hitBoxGaucheExiste = false;
                        }, 250);
                        
                    } 
                    
                    invoqueAttaqueDash(){
                        this.canHit = false
                        if(this.player.goingRight){
                            
                            this.attaqueDashBox = new HitBoite(this, this.player.x + 64,this.player.y, 'hitBoite');
                            
                        }
                        else if(this.player.goingLeft){
                            
                            this.attaqueDashBox = new HitBoite(this, this.player.x - 64,this.player.y, 'hitBoite');
                            
                        }else{
                            
                            this.attaqueDashBox = new HitBoite(this, this.player.x + 64,this.player.y, 'hitBoite');
                            
                        }
                        this.physics.add.overlap(this.attaqueDashBox, this.testFly, this.taper , null, this)
                        this.attaqueDashBox.body.setAllowGravity(false);
                        
                        setTimeout(() => {
                            this.canHit = true
                            this.attaqueDashBox.destroy();
                            this.hitBoxDroiteExiste = false;
                            this.hitBoxGaucheExiste = false;
                          
                        }, 300);
                        this.attaqueDashBox.destroy();
                    }
                    taper(){
                        
                        this.testFly.setVelocityY(-150);
                        this.testFly.setVelocityX(150);
                    }
                    drift(){
                        this.testFly.setVelocityX(0);
                    }         
                }
