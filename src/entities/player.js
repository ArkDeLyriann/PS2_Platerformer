export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.clavier = scene.input.keyboard.addKeys('A,D,SPACE,SHIFT,E');

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
    }


    create(){
        this.dashCD1 = true;
        this.IsMoving = false;
        this.IsGoingLeft = false;
        this.IsGoingRight = false;
        this.isDashing = true;
        this.CanBDF = true;
    }

    update(){

        this.healthPoints = 6
        this.canJump = true

        if (this.clavier.SHIFT.isDown){
            console.log("SHIFT")
        }

        if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == false && this.dashCD1 == true) {
            
            this.IsGoingRight = false;
            this.IsMoving = true;
            this.setVelocityX(-900);
            this.setVelocityY(0);
            this.body.setAllowGravity(false)
            setTimeout(() => {
                this.dashCD1 = false
                this.isDashing = true;
                this.body.setAllowGravity(true)
            }, 200);

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                    this.isDashing = false
                },
            })
        }

        else if (this.clavier.SHIFT.isDown && this.IsMoving == true && this.IsGoingRight == true && this.dashCD1 == true) {
            console.log("dash droite")
            this.IsGoingLeft = false;
            this.IsMoving = true;
            this.setVelocityX(900);
            this.setVelocityY(0);
            this.body.setAllowGravity(false)
            setTimeout(() => {
                this.dashCD1 = false
                this.body.setAllowGravity(true)
            }, 200);

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                },
            })

        }


        else if (this.cursors.left.isDown) {
            this.IsGoingLeft = true;
            this.IsGoingRight = false;
            this.IsMoving = true;
            this.setVelocityX(-500);
        }

        else if (this.cursors.right.isDown) {
            this.IsGoingLeft = false;
            this.IsGoingRight = true;
            this.IsMoving = true;
            this.setVelocityX(500);
        }

        else {
            this.IsGoingLeft = false;
            this.IsGoingRight = false;
            this.IsMoving = false;
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.IsMoving = true

            this.setVelocityY(-700);

        }
    }
}