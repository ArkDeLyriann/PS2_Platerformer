export default class fin extends Phaser.Scene{

    constructor() {
        super({
            key: "fin"
            
        });
    }



preload(){
    this.load.image("bg", "src/assets/sprites/bg_menu.png");
    this.load.image("fin", "src/assets/sprites/UI/fin.png");
    
}

create(){




    

    this.cursors = this.input.keyboard.createCursorKeys();
    this.clavier = this.input.keyboard.addKeys('A,Z,SPACE,E,R,ENTER');
    this.bg = this.add.image(640, 360, 'bg');
    this.logo = this.add.image(640, 200, 'fin');
    this.logo.setScale(1.5);
    
}

update(){


   
    
    this.input.on("pointerdown", (pointer) =>{
        this.changeScene()

    }); 

   
    

}


changeScene(){
    this.scene.stop();
      
      
}

}