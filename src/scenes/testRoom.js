import Melee from "../entities/meleePlayer.js";
import Player from "../entities/player.js";
import TrashEnemy from "../entities/trashEnemy.js";

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
        this.load.spritesheet("ennemy1", "src/assets/sprites/trashmob.png",{
            frameWidth: 64,
            frameHeight: 64,})
            
                
                
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
        this.load.spritesheet("pew", "src/assets/sprites/player/pew.png",{
            frameWidth: 16,
            frameHeight: 16,})
                
                
                
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
                            this.trash = new TrashEnemy(this, 0, 0, 'ennemy1');
                            this.physics.add.collider(this.trash, plateformes); 
                            
                            
                            this.player = new Player(this, 0, 32*64, 'player');
                            this.player.refreshBody();
                            this.player.setSize(32,64);
                            this.player.setOffset(48,32);
                            this.physics.add.collider(this.player, plateformes);
                            this.physics.add.collider(this.player.coups, this.ttrash, this.taper, null, this);
                            this.physics.add.collider(this.testFly, plateformes, this.drift, null, this);
                            this.testCollide = this.physics.add.collider(this.testFly, this.player, this.flyReset,null, this );
                            this.physics.add.overlap(Melee, this.testFly, this.taper , null, this)
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
                            
                        }
                        
                        flyReset(){
                            this.player.canFly = true;
                            console.log(this.player.canFly)
                        }
                        
                        taper(){
                            
                            this.testFly.setVelocityY(-150);
                            this.testFly.setVelocityX(150);
                        }

                    }


                    // Pour résoudre le problème d'attaque ==> mettre les attaques dans la classe joueur