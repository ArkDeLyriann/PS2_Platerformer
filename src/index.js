import menu from "/src/levels/menuPrincipal.js";





var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH, // largeur en pixels
    height: GAME_HEIGHT, // hauteur en pixels
    physics: {
      // définition des parametres physiques
      default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
      arcade: {
        debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
      }
    },
    antialias: true,

    scene: [menu, global, kitchen, quarters]
  };
  
  // création et lancement du jeu
  var game = new Phaser.Game(config);
  game.scene.start("menu");
