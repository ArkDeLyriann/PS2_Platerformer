export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.clavier = scene.input.keyboard.createCursorKeys();
        

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
    }


    
    update(){

        this.healthPoints = 6

        var mouvement = new Phaser.Math.Vector2(0, 0);
        // Mouvement
        if (this.clavier.left.isDown) {
            mouvement.x = -1;
            this.direction = "left";
            this.facing = "left";
            
            
        } 
        else if (this.clavier.right.isDown) {
            mouvement.x = 1;
            this.direction = "right";
            this.facing = "right";
            
            
        } 
        else {
            mouvement.x = 0;
            if (this.facing == "right"){
                this.anims.play("iddle_right", true);
            }
            else if (this.facing == "left")
            {
                this.anims.play("iddle_left", true);
            }
        }

        if (this.clavier.up.isDown) {
            mouvement.y = -1;
            this.direction = "up"; 
            this.facingUp = true;
        } 
        else {
            mouvement.y = 0;
          
        }

        

        mouvement.normalize();
        this.setVelocity(mouvement.x * PLAYER_SPEED, mouvement.y * PLAYER_SPEED);
        console.log(this.direction);

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        if (mouvement.x < 0) {
            this.anims.play("move_left", true);
        }
        else if (mouvement.x > 0) {
            this.anims.play("move_right", true);
        }
        else if (this.facing == "right"){
            this.anims.play("iddle_right", true);
        }
        else if (this.facing == "left")
        {
            this.anims.play("iddle_left", true);
        }
    }
}