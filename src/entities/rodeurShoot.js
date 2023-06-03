export default class RodeurShoot extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, "rodeurPew");

        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet
        
        this.init();
        
    }

    init(){
        this.speed = 200; 
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

        if(this.body){
        this.y = this.scene.player.y
    }
       
    }
    
    
    fire(rodeur){
        
        let direction = rodeur.x - this.scene.player.x
        console.log(direction)
        if(direction <0){
            
            this.setVelocityX(this.speed);
            
             
        }else if(direction >0){

            this.setVelocityX(-this.speed);
            
        }
        
        //this.anims.play("projectile"); 
    }


    hit(target){
        
        this.destroy();
        
    }



}