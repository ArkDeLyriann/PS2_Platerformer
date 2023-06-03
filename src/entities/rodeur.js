import RodeurShoot from "./rodeurShoot.js";

export default class Rodeur extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, maxX, minX){
        super(scene, x,y,"rodeur"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.minX = minX;
        this.maxX = maxX;
        

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        
        this.projectiles = new Phaser.GameObjects.Group;
        this.canHit = true
        this.dir ="" 
        this.setVelocityX(300);

        this.hp = 300; 

        this.setScale(1.75)

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

            if(this.minX < this.scene.player.x &&  this.scene.player.x <this.maxX){
                if(this.scene.player.y >= this.y){
                console.log("hello")
                
                this.attaque();
                }
            }

        this.deplacement();
        //this.anims.play("spectreIdle", true);
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
            
            this.setVelocityX(300);
            this.dir = "right";
        }else if(this.x >= this.maxX){
            
            this.setVelocityX(-300);
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

    attaque(){
        if(this.canHit){
            this.canHit = false
            console.log(this.canHit)
        const pew = new RodeurShoot(this.scene, this.x, this.y); 
        this.projectiles.add (pew); 
        pew.fire(this);

        setTimeout(() => {
            this.canHit = true
            
            
        }, 2000);
        

    }
    }

   

}