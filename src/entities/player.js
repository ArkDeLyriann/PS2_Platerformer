export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.clavier = scene.input.keyboard.addKeys('A,D,SPACE,SHIFT,E');
        this.canDash = true
        this.canMove = true
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
            console.log(this.canJump)
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
            if (this.facing == "right"){
                
            }
            else if (this.facing == "left")
            {
                
                
            }
        }
        
        mouvement.normalize();
        this.setVelocityX(mouvement.x * 300);
    }

        

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if(this.body.blocked.down){
                this.setVelocityY(-700);
            }
            else if (this.canJump){
                this.canJump = false;
                console.log(this.canJump);
                this.setVelocityY(-700);
            }
        }   
        
        if (Phaser.Input.Keyboard.JustDown(this.clavier.SHIFT) && this.canDash) {
            this.canJump = true
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
                this.canDash = true
                this.canMove = true
                this.body.setAllowGravity(true)
            }, 250);
        }
        

       
        
        this.x = Math.round(this.x);

        if (mouvement.x < 0) {
            this.goingLeft = true
            this.goingRight = false
            this.anims.play("run_left", true);
        }
        else if (mouvement.x > 0) {
            this.goingRight = true
            this.goingLeft = false
            this.anims.play("run_left", true);
        }
        
    }
}