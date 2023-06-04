import Melee from "../entities/meleePlayer.js";
import Player from "../entities/player.js";
import Spectres from "../entities/spectres.js";
import Boules from "../entities/boules.js";
import Rodeur from "../entities/rodeur.js";

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
            
        this.load.spritesheet("boule", "src/assets/sprites/trashMobs/boule.png",{
            frameWidth: 128,
            frameHeight: 128
        })  
                
        this.load.spritesheet("spectre", "src/assets/sprites/trashMobs/spectre.png",{
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet("rodeur", "src/assets/sprites/trashMobs/rodeur.png",{
            frameWidth: 64,
            frameHeight: 90
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

            this.load.spritesheet("life", "src/assets/sprites/player/lifebar.png",{
                frameWidth: 288,
                frameHeight: 96,})

            this.load.spritesheet("rodeurPew", "src/assets/sprites/trashMobs/projectile_rodeur.png",{
                frameWidth: 32,
                frameHeight: 32,})

            
                
                
                
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
                        

                        const spawnBoules  = carteDuNiveau.getObjectLayer("boules");

                        const boules = this.createBoules(spawnBoules);

                        const plateformes = carteDuNiveau.createLayer(
                            "Plateformes",
                            tileset
                            );

                            
                            
                        const spawnSpectres  = carteDuNiveau.getObjectLayer("spectres");
                        
                        const spawnRodeurs  = carteDuNiveau.getObjectLayer("rodeurs"); 

                        const checkPointsLayer = carteDuNiveau.getObjectLayer('checkpoints');

                        const sortieLayer = carteDuNiveau.getObjectLayer('sortie');




                            
                            
                            this.player = new Player(this, 0, 32*64, 'player');
                            this.player.refreshBody();
                            this.player.setSize(32,64);
                            this.player.setOffset(48,44);
                            this.physics.add.collider(this.player, plateformes);
                            
                            
                            //this.physics.add.collider(this.testFly, plateformes, this.drift, null, this);
                            //this.testCollide = this.physics.add.collider(this.testFly, this.player, this.flyReset,null, this );
                            plateformes.setCollisionByExclusion(-1, true);
                            this.barrePV = this.add.sprite(0  ,0, 'life').setScrollFactor(0, 0);
                            
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

                            const myCheckpoints = this.createCheckpoint(checkPointsLayer); 
                            this.physics.add.overlap(this.player, myCheckpoints, this.onCheckpointCollision,null, this);
                            const sortie = this.createSortie(sortieLayer); 
                            this.physics.add.collider(this.player, sortie, this.goNext,null, this);


                            this.anims.create({
                                key: "full",
                                frames: this.anims.generateFrameNumbers("life", { start: 0, end: 0 }),
                                frameRate: 10,
                                repeat: -1
                            });this.anims.create({
                                key: "-1",
                                frames: this.anims.generateFrameNumbers("life", { start: 1, end: 1 }),
                                frameRate: 10,
                                repeat: -1
                            });this.anims.create({
                                key: "-2",
                                frames: this.anims.generateFrameNumbers("life", { start: 2, end: 2 }),
                                frameRate: 10,
                                repeat: -1
                            });this.anims.create({
                                key: "-3",
                                frames: this.anims.generateFrameNumbers("life", { start: 3, end: 3 }),
                                frameRate: 10,
                                repeat: -1
                            });

                         
                            
                            this.physics.world.setBounds(0, 0, 44800, 4480);
                            this.cameras.main.setBounds(0, 0, 44800, 4480);
                            this.cameras.main.setZoom(0.75);
                            this.cameras.main.startFollow(this.player);

                            //this.physics.add.overlap(this.player.coups, this.trash, this.taper, null, this);
                            //this.physics.add.overlap(this.player.projectiles, this.trash, this.projectHit, null, this);
                            const spectres = this.createSpectres(spawnSpectres, plateformes);

                            const rodeurs = this.createRodeurs(spawnRodeurs, plateformes);


                            this.physics.add.overlap(this.player.projectiles, spectres, this.projectHit, null, this);
                            //this.physics.add.overlap(this.rodeur.projectiles, this.player, this.projectHit, null, this);
                            this.physics.add.overlap(this.player.coups, spectres, this.taper, null, this);
                            this.physics.add.overlap(this.player, spectres, this.spectreOnPlayer, null, this);

                            const projoRodeur = new Phaser.GameObjects.Group;

                            this.physics.add.overlap(projoRodeur, this.player,  this.projectHit, null, this);
                            this.physics.add.overlap(this.player.coups, projoRodeur, this.taper, null, this);
                        }
                        update(){
                            
                            this.player.update();


                            if(this.player.hp == 3){
                                this.barrePV.anims.play("full", true)
                            }else if(this.player.hp ==2){
                                this.barrePV.anims.play("-1", true)
                            }else if(this.player.hp ==1){
                                this.barrePV.anims.play("-2", true)
                            }else if(this.player.hp ==0){
                                this.barrePV.anims.play("-3", true)
                            }
                            
                        }

                        createSpectres(layer, plateformes){
                            const spectres = new Phaser.GameObjects.Group; 
                            
                            
                            layer.objects.forEach(spawn => {
                                let enemy = null; 
                                
                                
                                enemy = new Spectres(this,spawn.x, spawn.y, spawn.properties[0].value, spawn.properties[1].value);
                                console.log("je crée un ennemi") 
                                
                               
                                 
                    
                                
                                spectres.add(enemy); 
                                
                            });
                            return spectres ;
                            
                        }

                        createRodeurs(layer, plateformes){

                            const rodeurs = new Phaser.GameObjects.Group;
                            const projoRodeur = new Phaser.GameObjects.Group;
                            layer.objects.forEach(spawn => {
                                let enemy = null; 
                                
                                
                                enemy = new Rodeur(this,spawn.x, spawn.y, spawn.properties[0].value, spawn.properties[1].value);
                                console.log("je crée un ennemi") 
                                
                               
                                 
                    
                                projoRodeur.add(enemy.projectiles);
                                rodeurs.add(enemy); 
                                
                            });
                            return rodeurs ;
                            return projoRodeur;
                        }


                        createBoules(layer){
                            const boules = new Phaser.GameObjects.Group; 
                    
                            
                            layer.objects.forEach(spawn => {
                                let boule = null; 
                                
                                
                                boule = new Boules(this,spawn.x, spawn.y, spawn.properties[0].value, spawn.properties[1].value);
                                console.log("je crée un ennemi") 
                                
                               
                                 
                    
                                 
                                boules.add(boule); 
                                
                            });
                            return boules ;
                        }

                        createCheckpoint(layer){
                            const groupCheckpoint = new Phaser.GameObjects.Group; 
                    
                            layer.objects.forEach(checkpoint => {
                                const cp = this.physics.add.sprite(checkpoint.x, checkpoint.y, 'none')
                                cp.setOrigin(0,0)
                                cp.setAlpha(0)
                                cp.body.setAllowGravity(false)
                                cp.setSize(5, 2000); 
                               
                    
                                groupCheckpoint.add(cp); 
                            })
                    
                            return groupCheckpoint; 
                        }


                        createSortie(layer){
                            const groupSortie = new Phaser.GameObjects.Group; 
                    
                            layer.objects.forEach(checkpoint => {
                                const cp = this.physics.add.sprite(checkpoint.x, checkpoint.y, 'none')
                                cp.setOrigin(0,0)
                                cp.setAlpha(0)
                                cp.body.setAllowGravity(false)
                                cp.setSize(5, 2000); 
                               
                    
                                groupSortie.add(cp); 
                            })
                    
                            return groupSortie; 
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

                        spectreOnPlayer(player, spectre){
                            player.takeDmg(spectre)
                            spectre.explode(player, spectre)
                        }

                        toucheBoule(player, boule){
                            player.takeDmg(boule)
                            player.canMove = false;
                            boule.bounce(player,boule)
                        }
                        onCheckpointCollision(player, checkpoint){
                            player.savePosition(checkpoint);
                            console.log("checkpoint")
                        }


                        goNext(){

                            this.scene.stop();
      
                            this.scene.start("boss",{
                            })
                      
                          }

                    }


                    // Pour résoudre le problème d'attaque ==> mettre les attaques dans la classe joueur