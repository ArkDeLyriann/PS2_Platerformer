export default class bossP3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        
    }


    init(){
        this.attaques = new Phaser.GameObjects.Group;
        this.lasers = new Phaser.GameObjects.Group;
        this.hp = 200

        this.setCollideWorldBounds(true);  
        this.setImmovable(true);  

    }



    getHit(hitbox){
        this.hp -= 1; 
        console.log(this.hp)
        if(this.hp <= 0){
            this.destroy();

            //VISUAL EFFECT PARTICLES
        }
    }
}