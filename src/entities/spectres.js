export default class Spectres extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, maxX, minX){
        super(scene, x,y,"spectre"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.minX = minX;
        this.maxX = maxX;
        

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        
        this.anims.create({
            key: "spectreIdle",
            frames: this.anims.generateFrameNumbers("spectre", { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });

        this.dir ="" 
        this.setVelocityX(150);

        this.hp = 50; 

 

        //Physique avec le monde
        this.body.setAllowGravity(false); 
        this.setCollideWorldBounds(true);  
          
        
        
    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }
    update(time,delta){
        

        if(this.hp >0){
        this.deplacement();
        this.anims.play("spectreIdle", true);
        }else{
            this.destroy()
        }
        
        
    }

    explode(){
        this.hp = 0
        console.log("j'explose")
        //let boom = this.physics.add.sprite(this.x,this.y, "explosion")
    }

    deplacement(){
       if(!this.body){
            return; 
        }
        

        if(this.x <= this.minX){
            
            this.setVelocityX(150);
            this.dir = "right";
        }else if(this.x >= this.maxX){
            
            this.setVelocityX(-150);
            this.dir = "left"; 
        }

        if(this.dir == "right"){
            this.setFlipX(false);
        }else if(this.dir == "left"){
            this.setFlipX(true); 
        }

    }

    getHit(hitbox){
        if(this.hp >0){
            this.hp -=25
            console.log(this.hp)
        }
    }

   

}