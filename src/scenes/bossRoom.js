import Player from "../entities/player.js";
import bossP3 from "../entities/bossP3.js";
import TrashEnemy from "../entities/spectres.js";


export default class boss extends Phaser.Scene {
    constructor() {
        super({
            key: "boss"
        });
    }

    init(data){
        
        //this.playerHP = data.playerHP
        
      }


    preload(){
        this.load.image("tileset2", "src/assets/maps/tileset_temp.png");
        this.load.image("survive", "src/assets/sprites/UI/survive.png");
        this.load.tilemapTiledJSON("bossRoom", "src/assets/maps/bossRoom.json");

        this.load.spritesheet("life", "src/assets/sprites/player/lifebar.png",{
            frameWidth: 288,
            frameHeight: 96,})

        this.load.spritesheet("boss", "src/assets/sprites/boss/BOssP3.png",{
            frameWidth: 256,
            frameHeight: 256,})

            this.load.spritesheet("eclair", "src/assets/sprites/boss/pattern.png",{
                frameWidth: 32,
                frameHeight: 128,})
    }
    
    
    create(){

        this.timer = 0
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

            this.barrePV = this.add.sprite(0  ,0, 'life').setScrollFactor(0, 0);

            this.anims.create({
                key: "idle",
                frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 24 }),
                frameRate: 8,
                repeat: -1
            });

            this.anims.create({
                key: "zap",
                frames: this.anims.generateFrameNumbers("eclair", { start: 0, end: 3 }),
                frameRate: 4,
                repeat: -1
            });

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

            this.eclairs = new Phaser.GameObjects.Group;

            this.player = new Player(this, 0, 12*64, 'player');
            this.player.refreshBody();
            this.player.setSize(32,64);
            this.player.setOffset(48,32);
            this.physics.add.collider(this.player, plateformes);
            plateformes.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.eclairs, this.player, this.patternToucheJoueur, null, this);
            this.player.hp = this.playerHP;
            this.physics.world.setBounds(0, 0, 1600, 960);
            this.cameras.main.setBounds(0, 0, 1600, 960);
            this.cameras.main.setZoom(0.75);
            this.cameras.main.startFollow(this.player);

            
    }

    update(){


        if(this.player.hp == 3){
            this.barrePV.anims.play("full", true)
        }else if(this.player.hp ==2){
            this.barrePV.anims.play("-1", true)
        }else if(this.player.hp ==1){
            this.barrePV.anims.play("-2", true)
        }else if(this.player.hp ==0){
            this.barrePV.anims.play("-3", true)
        }
        
        if(this.time.nowaa >90000){
            
            this.finDuJeu()
        }
        this.player.update();
        this.boss.update();


    }

    pattern1(){
        if(this.boss.pattern1Dispo){

        this.boss.pattern1Dispo = false

        
        for(let i = 0; i < 25; i++) {
            let eclair = null
            this.time.delayedCall(300 * i, () => {
                eclair = this.physics.add.sprite(i*64, 100, 'eclair')
                this.eclairs.add(eclair);
                eclair.setVelocityY(+300);
                eclair.body.setAllowGravity(false)
                eclair.anims.play("zap", true);
            });
        }   

        setTimeout(() => {
            this.boss.pattern1Dispo = true;

        }, 20000);
        }    
    }

    pattern2(){


        if(this.boss.pattern2Dispo){ 
            
            this.boss.pattern2Dispo = false
            for(let i = 0; i < 10; i++) {
                let eclair = null
                this.time.delayedCall(300 * i, () => {
                    eclair = this.physics.add.sprite(1600-i*64, 900, 'eclair')
                    this.eclairs.add(eclair);
                    eclair.setVelocityY(-600);
                    eclair.body.setAllowGravity(false)
                    eclair.anims.play("zap", true);
                });
            }
            for(let i = 0; i < 13; i++) {
                let eclair = null
                this.time.delayedCall(300 * i, () => {
                    eclair = this.physics.add.sprite(i*64, 900, 'eclair')
                    this.eclairs.add(eclair);
                    eclair.setAccelerationY(-300);
                    eclair.body.setAllowGravity(false)
                    eclair.anims.play("zap", true);
                });
            }    

            setTimeout(() => {
                this.boss.pattern2Dispo = true;
    
            }, 13000);
            }  
        }    
    

    pattern3(){
        if(this.boss.pattern3Dispo){  
            this.boss.pattern3Dispo = false   
            var angle = 0;
            
            var nbInterval = 0;
            var interval = setInterval(() => {
                var x = Math.cos(angle);
                var y = Math.sin(angle);
            
                var eclair = this.physics.add.sprite(13*64, 9*64, 'pew')
                this.eclairs.add(eclair);
                eclair.x += (x*50);
                eclair.y += (y*50);
                eclair.setVelocityX(x*300);
                eclair.setVelocityY(y*300);
                eclair.body.setAllowGravity(false)
                
                
                
                nbInterval++;
                angle += 0.3 * Math.PI;
                

                if(nbInterval > 12) clearInterval(interval);
            
            }, 100);
                
            
            setTimeout(() => {
                this.boss.pattern3Dispo = true;
    
            }, 3000);
           
        }    
    }

    pattern4(){
        if(this.boss.pattern4Dispo){  
            this.boss.pattern4Dispo = false   
            var angle = 0;
            
            var nbInterval = 0;
            var interval = setInterval(() => {
                var x = Math.cos(angle);
                var y = Math.sin(angle);
            
                var eclair = this.physics.add.sprite(13*64, 9*64, 'pew')
                this.eclairs.add(eclair);
                eclair.x += (x*50);
                eclair.y += (y*50);
                eclair.setVelocityX(x*300);
                eclair.setVelocityY(y*300);
                eclair.body.setAllowGravity(false)
                
                
                
                nbInterval++;
                angle += 0.5 * Math.PI;
                

                if(nbInterval > 12) clearInterval(interval);
            
            }, 100);
                
            
            setTimeout(() => {
                this.boss.pattern3Dispo = true;
    
            }, 3000);
           
        }    
    }

    patternToucheJoueur(eclair, joueur){
        console.log("VRIOUCH ECLAIR")
        eclair.destroy();
        joueur.takeDmg();


    }

    finDuJeu(){
        this.scene.stop()
        this.scene.start("fin",{
            
          })

    }

}