export default class Boules extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, maxY, minY){
        super(scene, x,y,"boule"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.minY = minY;
        this.maxY = maxY;
        

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        
        

        this.dir ="" 
        this.setVelocityY(-300);

        this.damage = 25

 

        //Physique avec le monde
        this.body.setAllowGravity(false); 
        this.setCollideWorldBounds(true);  
          
        
        
    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }
    update(time,delta){
        

       this.deplacement(); 
        this.rotation += 0.1;
        
    }

    

    deplacement(){
       if(!this.body){
            return; 
        }
        

        if(this.y <= this.minY){
            this.y = this.maxY
            //console.log("reset")
        }else if(this.y >= this.maxY){
            //console.log("je monte")
            this.setVelocityY(-300);
            this.dir = "up"; 
        }

        

    }

    bounce(player, boule){
        if(player.x <= this.x){
            player.setVelocityX(-600);
            setTimeout(() => {
                player.canMove = true;
                
            }, 300);
        }else{
            player.setVelocityX(600);
            setTimeout(() => {
                player.canMove = true;
                
            }, 300);
        }

    }

    

   

}