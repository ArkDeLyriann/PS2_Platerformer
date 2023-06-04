

export default class bossP3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

        this.init();
    }


    init(){
        this.attaques = new Phaser.GameObjects.Group;
        this.eclairsVerti = new Phaser.GameObjects.Group;
        this.hp = 200
        this.pattern1Dispo = true;
        this.pattern2Dispo = true;
        this.pattern3Dispo = true;
        this.setCollideWorldBounds(true);  
        this.setImmovable(true);  

    }

    update(){
        this.anims.play("idle", true);
        this.scene.pattern1();
        
        
        this.scene.pattern2(); 

        

        
        this.scene.pattern3(); 
        this.scene.pattern4(); 

        

        
    }

    getHit(hitbox){
        this.hp -= 1; 
        console.log(this.hp)
        if(this.hp <= 0){
            this.destroy();

            
        }
    }

   
}