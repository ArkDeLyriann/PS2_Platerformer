import Melee from "../entities/meleePlayer.js";
import Player from "../entities/player.js";
import Spectres from "../entities/spectres.js";

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
        this.load.tilemapTiledJSON("testRoom", "src/assets/maps/Level.json");
        this.load.spritesheet("player", "src/assets/sprites/player/player_run.png",{
            frameWidth: 128,
            frameHeight: 128,})
        this.load.spritesheet("ennemy1", "src/assets/sprites/trashmob.png",{
            frameWidth: 64,
            frameHeight: 64,})
            
                
                
        this.load.spritesheet("spectre", "src/assets/sprites/trashMobs/spectre.png",{
            frameWidth: 64,
            frameHeight: 64
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
                
                this.clavier = this.input.keyboard.addKeys('A,Z,SPACE,E');
                
                const carteDuNiveau = this.add.tilemap("testRoom");
                
                const tileset = carteDuNiveau.addTilesetImage(
                    "tileset_temp",
                    "tileset"
                    );
                    const fond = carteDuNiveau.createLayer(
                        "background",
                        tileset
                        );      
                        
                        const plateformes = carteDuNiveau.createLayer(
                            "Plateformes",
                            tileset
                            );
                            
                        const spawnSpectres  = carteDuNiveau.getObjectLayer("spectres");   
                            
                            
                            this.player = new Player(this, 0, 32*64, 'player');
                            this.player.refreshBody();
                            this.player.setSize(32,64);
                            this.player.setOffset(48,44);
                            this.physics.add.collider(this.player, plateformes);
                            //this.physics.add.collider(this.testFly, plateformes, this.drift, null, this);
                            //this.testCollide = this.physics.add.collider(this.testFly, this.player, this.flyReset,null, this );
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
                            this.anims.create({
                                key: "hit",
                                frames: this.anims.generateFrameNumbers("player", { start: 24, end: 27 }),
                                frameRate: 10,
                                repeat: -1
                            });
                            
                            this.physics.world.setBounds(0, 0, 44800, 4480);
                            this.cameras.main.setBounds(0, 0, 44800, 4480);
                            this.cameras.main.setZoom(0.75);
                            this.cameras.main.startFollow(this.player);

                            //this.physics.add.overlap(this.player.coups, this.trash, this.taper, null, this);
                            //this.physics.add.overlap(this.player.projectiles, this.trash, this.projectHit, null, this);
                            const enemies = this.createEnemies(spawnSpectres, plateformes);
                            this.physics.add.overlap(this.player.projectiles, enemies, this.projectHit, null, this);
                            this.physics.add.overlap(this.player.coups, enemies, this.taper, null, this);
                        }
                        update(){
                            
                            this.player.update();
                            
                        }

                        createEnemies(layer, plateformes){
                            const enemies = new Phaser.GameObjects.Group; 
                    
                            
                            layer.objects.forEach(spawn => {
                                let enemy = null; 
                                
                                
                                enemy = new Spectres(this,spawn.x, spawn.y);
                                console.log("je crée un ennemi") 
                                
                               
                                 
                    
                                 
                                enemies.add(enemy); 
                                
                            });
                            return enemies ;
                        }
                        
                        flyReset(){
                            this.player.canFly = true;
                            console.log(this.player.canFly)
                        }

                        taper(coup, ennemy){
                            ennemy.getHit();
                            console.log("hého")
                        }
                        
                        projectHit(projectile, ennemy){
                            ennemy.getHit();
                            projectile.hit();
                            console.log("ca touche")
                        }

                    }


                    // Pour résoudre le problème d'attaque ==> mettre les attaques dans la classe joueur