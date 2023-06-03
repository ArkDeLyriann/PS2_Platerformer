import Player from "../entities/player.js";
import bossP3 from "../entities/bossP3.js";
import TrashEnemy from "../entities/spectres.js";


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

            this.load.spritesheet("eclair", "src/assets/sprites/boss/pattern.png",{
                frameWidth: 32,
                frameHeight: 128,})
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

            this.eclairs = new Phaser.GameObjects.Group;

            this.player = new Player(this, 0, 12*64, 'player');
            this.player.refreshBody();
            this.player.setSize(32,64);
            this.player.setOffset(48,32);
            this.physics.add.collider(this.player, plateformes);
            plateformes.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.eclairs, this.player, this.patternToucheJoueur, null, this);

            this.physics.world.setBounds(0, 0, 1600, 960);
            this.cameras.main.setBounds(0, 0, 1600, 960);
            this.cameras.main.setZoom(0.75);
            this.cameras.main.startFollow(this.player);

            
    }

    update(){
        this.player.update();
        this.boss.update();
    }

    pattern1(){
        if(this.boss.pattern1Dispo){

        
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

        this.boss.pattern1Dispo = false
        }    
    }

    pattern2(){
        if(this.boss.pattern2Dispo){        
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

            this.boss.pattern2Dispo = false
        }    
    }

    pattern3(){
        if(this.boss.pattern3Dispo){     
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
                
                console.log(eclair.body.velocity);
                
                nbInterval++;
                angle += 0.3 * Math.PI;
                

                if(nbInterval > 12) clearInterval(interval);
            
            }, 100);
                
            

            this.boss.pattern3Dispo = false
        }    
    }

    patternToucheJoueur(eclair, joueur){
        console.log("VRIOUCH ECLAIR")
        eclair.destroy();
        joueur.takeDmg();


    }

}