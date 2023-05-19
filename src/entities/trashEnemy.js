export default class TrashEnemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, sprite){
        super(scene, x,y, sprite); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        //Mixins collisions
        Object.assign(this, collidable); 

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables entité
        this.speed = 50; 
        

        this.damages = 20; 
        this.attackDamages = 0; 

        this.hp = 5; 
        this.protected = false;
        

 

        //Physique avec le monde
        this.body.setGravityY(this.gravity); 
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
        this.playDamageTween(); 
        this.scene.time.delayedCall(500, () => {
            this.clearTint(); 
        });

        if(this.hp <= 0){
            this.rayGraphics.destroy(); 
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