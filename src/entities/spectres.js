export default class Spectres extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super(scene, x,y, "spectre"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        //Mixins collisions
        

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        
        

        this.damages = 20; 
        

        this.hp = 50; 
        this.protected = false;
        

 

        //Physique avec le monde
        this.body.setAllowGravity(false); 
        this.setCollideWorldBounds(true);  
        this.setImmovable(true);  
        
        
    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }
    update(time,delta){
        this.deplacement();
        
    }



    deplacement(){
        if(!this.body || !this.body.onFloor()){
            return; 
        }



    }

    getHit(hitbox){
        if(this.hp >0){
            this.hp -=1
        }else{
            this.destroy()
        }
    }

   

}