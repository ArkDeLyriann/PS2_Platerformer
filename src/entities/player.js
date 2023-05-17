export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.clavier = scene.input.keyboard.addKeys('A,Z,SPACE,E');
        this.canDash = true
        this.canMove = true
        this.regardeBas = false
        this.isJumping = false
        this.canFly = false
        this.isDashing = false
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
    }
    
    
    
    update(){
        
        this.healthPoints = 6
        
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
                
            }
            if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                this.regardeBas = true
                this.goingLeft = false
                this.goingRight = false
            }
            
            mouvement.normalize();
            this.setVelocityX(mouvement.x * 300);
        }else if(this.isFlying){
            
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
            if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                this.regardeBas = true
                this.goingLeft = false
                this.goingRight = false
            }
            
            mouvement.normalize();
            this.setVelocityX(mouvement.x * 300);
        }
        
        
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.canFly){
                this.isFlying = true
                this.setVelocityY(-700);
                this.body.setAllowGravity(false)
            }
            else if(this.body.blocked.down){
                this.isJumping = true
                this.setVelocityY(-700);
            }
            else if (this.canJump){
                this.isJumping = true
                this.canJump = false;
                this.setVelocityY(-700);
            }
        }   
        
        if (Phaser.Input.Keyboard.JustDown(this.clavier.SPACE) && this.canDash) {
            this.canJump = true
            this.isDashing = true
            this.canDash = false
            this.canMove = false
            this.body.setAllowGravity(false)
            if(this.goingLeft){
                this.setVelocityX(-950)               
            }
            if(this.goingRight){
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
            
        }
        
        
        
        if (this.isFlying){
            setTimeout(() => {
                this.canFly = false
                this.body.setAllowGravity(true)
                this.isFlying = false
            }, 4000);
        }
        
        
        this.x = Math.round(this.x);
        
        if (mouvement.x < 0) {
            this.goingLeft = true
            this.goingRight = false
            this.anims.play("run_left", true).flipX=true;
        }
        else if (mouvement.x > 0) {
            this.goingRight = true
            this.goingLeft = false
            this.anims.play("run_left", true).flipX=false;
        }else{
            this.anims.play("iddle", true);
        }
        
    }
    
}