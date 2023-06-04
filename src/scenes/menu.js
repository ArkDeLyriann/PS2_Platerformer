export default class menu extends Phaser.Scene{

    constructor() {
        super({
            key: "menu"
            
        });
    }



preload(){
    this.load.image("bg", "src/assets/sprites/bg_menu.png");
    this.load.image("logo", "src/assets/sprites/logo.png");
    this.load.spritesheet("bouton", "src/assets/sprites/UI/boutonjouer.png",{
        frameWidth: 320,
        frameHeight: 160,})
}

create(){




    

    this.cursors = this.input.keyboard.createCursorKeys();
    this.clavier = this.input.keyboard.addKeys('A,Z,SPACE,E,R,ENTER');
    this.bg = this.add.image(640, 360, 'bg');
    this.logo = this.add.image(640, 200, 'logo');
    this.logo.setScale(1.5);
    this.bouton = this.physics.add.sprite(640, 500 ,'bouton').setInteractive();
    this.bouton.setScale(0.75)
    this.bouton.body.setAllowGravity(false);


    this.anims.create({
        key: "no",
        frames: [{ key: "bouton", frame: 0 }],
        frameRate: 20,
        repeat : -1
      });
    this.anims.create({
        key: "yes",
        frames: [{ key: "bouton", frame: 1 }],
        frameRate: 20,
        repeat : -1
    });
}

update(){


    if(this.sourisSurBouton){
        this.bouton.anims.play("yes")
    }else{
        this.bouton.anims.play("no")
    }
    
    this.input.on("pointerdown", (pointer) =>{
        this.changeScene()

    }); 

    this.bouton.on('pointerover',function(pointer){
        this.sourisSurBouton= true
        console.log(this.sourisSurBouton)
    })
    
    this.bouton.on('pointerout',function(pointer){
        this.sourisSurBouton = false
    })
    

}


changeScene(){
    this.scene.stop();
      
      this.scene.start("test",{
      })
}

}