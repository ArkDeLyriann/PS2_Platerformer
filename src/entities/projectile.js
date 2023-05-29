export default class Tir extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, "pew");

        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet
        
        this.init();
        
    }

    init(){
        this.speed = 400; 
        this.maxDistance = 700;
        this.traveledDistance = 0; 
        this.dir = null; 
        this.body.setAllowGravity(false);
        
        
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta); 
        this.traveledDistance += this.body.deltaAbsX();
        if(this.traveledDistance >= this.maxDistance){
            
            this.destroy(); 
        }

 
       
    }
    
    
    fire(player){
    
        if(player.facing == "right"){
            this.dir = "right"; 
            this.x = player.x + 15; 
            this.setVelocityX(this.speed); 
        }else if(player.facing == "left"){
            this.dir= "left";
            this.x = player.x - 15;
            this.setFlipX(true); 
            this.setVelocityX(-this.speed); 
        }
        
        //this.anims.play("projectile"); 
    }


    hit(target){
        
        this.destroy();
        
    }



}