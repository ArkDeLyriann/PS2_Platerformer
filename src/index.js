import test from "./scenes/testRoom.js";
import boss from "./scenes/bossRoom.js";
import menu from "./scenes/menu.js";
import fin from "./scenes/fin.js";



var config = {
    type: Phaser.AUTO,
    width: 1280, // largeur en pixels
    height: 720,
    //pixelArt: true, // hauteur en pixels
    physics: {
      // définition des parametres physiques
      default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
      arcade: {
        gravity: { y: 1000 },
        debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
      }
    },
    antialias: true,

    scene: [menu, test, boss , fin]
  };
  
  // création et lancement du jeu
  var game = new Phaser.Game(config);
  game.scene.start("menu");
