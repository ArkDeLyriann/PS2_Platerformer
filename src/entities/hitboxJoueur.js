export default class HitBoite extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.clavier = scene.input.keyboard.addKeys('A,Z,SPACE,E');
        this.callMe = false
        scene.physics.world.enable(this)
        scene.add.existing(this)
    }


}
