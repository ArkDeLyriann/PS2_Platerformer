export default class Melee extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.clavier = scene.input.keyboard.addKeys('A,Z,SPACE,E');
        this.callMe = false
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.body.setAllowGravity(false);
    }
}
