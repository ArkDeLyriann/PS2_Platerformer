export default class TrashEnemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, sprite){
        super(scene, x,y, sprite); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        //Mixins collisions
        

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        
        

        this.damages = 20; 
        this.attackDamages = 0; 

        this.hp = 50; 
        this.protected = false;
        

 

        //Physique avec le monde
         
        this.setCollideWorldBounds(true);  
        this.setImmovable(true);  
        
        
    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }
update(time,delta){
        
    }


    getHit(hitbox){
        this.hp -= 1; 
        console.log(this.hp)
        if(this.hp <= 0){
            this.destroy();

            //VISUAL EFFECT PARTICLES
        }
    }

    playDamageTween(){
        return this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 2,
            tint: 0xff0000
        })
    }

    setPlatformColliders(layer){
        this.platformCollidersLayer = layer; 
    }

}