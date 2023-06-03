import Melee from "./meleePlayer.js";
import Tir from "./projectile.js";


export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.clavier = scene.input.keyboard.addKeys('A,Z,SPACE,E,R');
        
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.init();
    }
    
    
    init(){

        this.hp = 100
        this.canDash = true
        this.canHit = true
        this.canMove = true
        this.regardeBas = false
        this.isJumping = false
        this.canFly = true
        this.canMoveFly = true
        this.isDashing = false
        this.coups = new Phaser.GameObjects.Group;
        this.projectiles = new Phaser.GameObjects.Group;
    }
    update(){
        

        
        var mouvement = new Phaser.Math.Vector2(0, 0);

        
        if(this.canMove){
            if (this.body.blocked.down){
                this.canJump = true
                this.isJumping = false
                
            }
            // Mouvement
            if (this.cursors.left.isDown) {
                
                mouvement.x = -1;
                this.direction = "left";
                this.facing = "left";
                
                
            } 
            else if (this.cursors.right.isDown) {
                mouvement.x = 1;
                this.direction = "right";
                this.facing = "right";
                
                
            } 
            else {
                mouvement.x = 0;
                this.goingLeft = false
                this.goingRight = false
                this.regardeBas = false
                
            }
            if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                this.regardeBas = true
                this.goingLeft = false
                this.goingRight = false
            }
            
            mouvement.normalize();
            this.setVelocityX(mouvement.x * 300);
        }else if(this.isFlying && this.canMoveFly){
            
            if (this.cursors.left.isDown) {
                
                mouvement.x = -1;
                this.direction = "left";
                this.facing = "left";
                
                
            } 
            else if (this.cursors.right.isDown) {
                mouvement.x = 1;
                this.direction = "right";
                this.facing = "right";
                
                
            }else {
                mouvement.x = 0;
                this.goingLeft = false
                this.goingRight = false
                this.regardeBas = false
            } 
            
            if (this.cursors.down.isDown) {
                mouvement.y = 1;

                
                
            }else if (this.cursors.up.isDown) {
                mouvement.y = -1;

                
                
            } 
            else {
                mouvement.y = 0;
                this.goingLeft = false
                this.goingRight = false
                this.regardeBas = false
            }
            
            mouvement.normalize();
            this.setVelocity(mouvement.x * 500, mouvement.y * 500 );
            
            
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.clavier.R)) {
            if (this.canFly){
                this.isFlying = true
                this.canMove = false
                this.canDash = false
                console.log(this.isFlying)
                this.body.setAllowGravity(false)
            }


        }  
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.aimUP = true;
            this.goingLeft = false;
            this.goingRight = false;
            this.regardeBas = false;
            if(this.body.blocked.down){
                this.isJumping = true;
                this.setVelocityY(-550);
            }
            else if (this.canJump){
                this.isJumping = true;
                this.canJump = false;
                this.setVelocityY(-550);
            }
        }   
        
        if (Phaser.Input.Keyboard.JustDown(this.clavier.SPACE) && this.canDash) {
            this.canJump = true
            this.isDashing = true
            this.canDash = false
            
            
            if (!this.isFlying){
                if(this.goingLeft){
                    this.canMove = false
                    this.body.setAllowGravity(false)
                    this.setVelocityX(-950)               
                }
                if(this.goingRight){
                    this.canMove = false
                    this.body.setAllowGravity(false)
                    this.setVelocityX(950)
                }
                setTimeout(() => {
                    this.canMove = true
                    this.isDashing = false
                    this.body.setAllowGravity(true)
                }, 250);
                setTimeout(() => {
                    this.canDash = true
                    
                    
                }, 2000);
            }else{
                if(this.goingLeft){
                    this.canMoveFly = false;
                    this.setVelocityX(-950);               
                }
                if(this.goingRight){
                    this.canMoveFly = false;
                    this.setVelocityX(950);
                }
                setTimeout(() => {
                    this.isDashing = false;
                    this.canMoveFly = true;
                }, 250);
                setTimeout(() => {
                    this.canDash = true;
                    
                    
                }, 2000);

            }
            
        }
        
        
        
        if (this.isFlying){
            this.canDash = false;
            setTimeout(() => {
                this.canFly = false;
                this.canMove = true;
                this.body.setAllowGravity(true);
                this.isFlying = false;
                this.canDash = true;
            }, 3000);
        }
        
        
        this.x = Math.round(this.x);
        
        if (this.punching){
            this.anims.play("hit", true);
        }
        else if (mouvement.x > 0) {
            this.goingRight = true
            this.goingLeft = false
            this.regardeBas = false
            this.anims.play("run_left", true).flipX=false;
        }else if(mouvement.x < 0) {
            this.goingLeft = true
            this.goingRight = false
            this.regardeBas = false
            this.anims.play("run_left", true).flipX=true;
        }
        else{
            this.anims.play("iddle", true);
        }
        
    
        if (Phaser.Input.Keyboard.JustDown(this.clavier.A)){
            if(this.canHit){
                this.canHit = false
                this.attaque()
                
            }
        }
    
    }

    takeDmg(ennemy){
        
        if (this.hp >0){
            console.log(this.hp)
            this.hp-= ennemy.dmg
        }
    }

    attaque(){
        
        if (this.isFlying){        
            if (this.goingLeft){

            }
            else if (this.goingRight){

            }
            else{

            }
        }else if (this.isJumping){
            if (this.goingLeft){
                console.log('gauche');
                this.coup = new Melee (this.scene, this.x -64 , this.y, 'hitBoite' )
                this.coups.add(this.coup);
                setTimeout(() => {
                    this.coup.destroy();
                    this.canHit = true
                }, 30);
            }
            else if (this.goingRight){
                this.coup = new Melee (this.scene, this.x +64 , this.y, 'hitBoite' )
                this.coups.add(this.coup);
                setTimeout(() => {
                    this.coup.destroy();
                    this.canHit = true
                }, 30);
            }
            else{
                const pew = new Tir(this.scene, this.x, this.y + 5); 
                this.projectiles.add (pew); 
                pew.fire(this);
                this.canHit = true
            } 
        }
        else{
            if (this.goingLeft){
                console.log('gauche');
                this.coup = new Melee (this.scene, this.x -64 , this.y, 'hitBoite' )
                this.coups.add(this.coup);
                this.punching = true
                setTimeout(() => {
                    this.coup.destroy();
                    this.punching =false
                    this.canHit = true
                }, 500);

            }
            else if (this.goingRight){
                console.log('droite');
                this.coup = new Melee (this.scene, this.x +64 , this.y, 'hitBoite' )
                this.coups.add(this.coup);
                this.punching= true
                setTimeout(() => {
                    this.coup.destroy();
                    this.punching = false
                    this.canHit = true
                }, 500);
            }
            else{
               
               if(this.facing== "left"){
                    console.log('gauche');
                    this.coup = new Melee (this.scene, this.x -32 , this.y, 'hitBoite' )
                    this.coups.add(this.coup);
                    this.punching = true
                    setTimeout(() => {
                        this.coup.destroy();
                        this.punching = false
                        this.canHit = true
                    }, 500);
                this.anims.play("hit", true).flipX=true;
                }else if(this.facing = "right"){
                    console.log('droite');
                    this.coup = new Melee (this.scene, this.x +32 , this.y, 'hitBoite' )
                    this.coups.add(this.coup);
                    this.punching = true
                    setTimeout(() => {
                        this.coup.destroy();
                        this.punching = false
                        this.canHit = true
                    }, 500);
                    
                }    
             
            }
        }
    }
    
    
}