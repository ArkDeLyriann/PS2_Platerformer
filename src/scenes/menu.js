export default class menu extends Phaser.Scene{

    constructor() {
        super({
            key: "menu"
        });
    }

preload(){

}

create(){
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.clavier = scene.input.keyboard.addKeys('A,Z,SPACE,E,R,ENTER');
    

}

update(){
    
    if (this.clavier.ENTER.isDown){
        this.changeScene()
    }
}


changeScene(){

}

}