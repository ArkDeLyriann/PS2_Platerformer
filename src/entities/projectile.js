export default class Tir extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, texture);

        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.init();
        
    }

    init(){
        this.speed = 250; 
        this.maxDistance = 150;
        this.traveledDistance = 0; 
        this.dir = null; 
         
        
        
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta); 
        this.traveledDistance += this.body.deltaAbsX();
        if(this.traveledDistance >= this.maxDistance){
            this.particleEmmiter.stop(); 
            this.residuEmmiter.stop(); 
            this.destroy(); 
        }

        this.particleEmmiter.setPosition(this.x, this.y); 
        this.residuEmmiter.setPosition(this.x, this.y); 
       
    }
    
    
    fire(caster){
    
        if(caster.dir == "right"){
            this.dir = "right"; 
            this.x = caster.x + 15; 
            this.setVelocityX(this.speed); 
        }else if(caster.dir == "left"){
            this.dir= "left";
            this.x = caster.x - 15;
            this.setFlipX(true); 
            this.setVelocityX(-this.speed); 
        }
        
        this.anims.play("projectile"); 
    }


    hit(target){
        new SpriteEffect(this.scene, 0,0, "projectile_impact").playOn(target, this.y);
        if(target.protected){
            this.getDeflected(); 
        }else{
            this.particleEmmiter.stop(); 
            this.residuEmmiter.stop(); 
            this.destroy();
        }
    }



}