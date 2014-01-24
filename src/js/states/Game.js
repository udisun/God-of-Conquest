GameCtrl.Game = function(game) {

  //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  // this.game; //        a reference to the currently running game
  // this.add; //        used to add sprites, text, groups, etc
  // this.camera; //        a reference to the game camera
  // this.cache; //        the game cache
  // this.input; //        the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  // this.load; //        for preloading assets
  // this.math; //        lots of useful common math operations
  // this.sound; //        the sound manager - add a sound, play one, set-up markers, etc
  // this.stage; //        the game stage
  // this.time; //        the clock
  // this.tweens; //        the tween manager
  // this.world; //        the game world
  // this.particles; //        the particle manager
  // this.physics; //        the physics manager
  // this.rnd; //        the repeatable random number generator
  //        You can use any of these from any function within this State.
  //        But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
  this.player;
  this.cursors;
  this.rocks;

};

GameCtrl.Game.prototype = {

  preload: function() {

    //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
    //  and the tileset/s used to render the map.

    //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

    //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
    //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
    //  the JSON object as the 3rd parameter.

    //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
    //  This could be Phaser.Tilemap.CSV too.

    this.load.tilemap('desert', 'assets/tiles/desert1.json', null, Phaser.Tilemap.TILED_JSON);

    //  Next we load the tileset. This consists of an image and a set of values that determine the size of the tiles within the image.
    //  In this case we give it a unique key, the URL to the PNG file and tell Phaser the tiles are all 16x16 pixels in size.

    this.load.tileset('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, -1, 1, 1);

    this.player = new Player(this);
    this.player.preload();

  },
  create: function() {
    // Generals
    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Map
    map = this.add.tilemap('desert');

    tileset = this.add.tileset('tiles');

    ground = this.add.tilemapLayer(0, 0, this.world.width, this.world.height, tileset, map, 0);
    stronghold = this.add.tilemapLayer(0, 0, this.world.width, this.world.height, tileset, map, 1);
    rocks = this.rocks = this.add.tilemapLayer(0, 0, this.world.width, this.world.height, tileset, map, 2);
    paths = this.add.tilemapLayer(0, 0, this.world.width, this.world.height, tileset, map, 3);

    ground.resizeWorld();
    stronghold.resizeWorld();
    rocks.resizeWorld();
    paths.resizeWorld();

    // Player
    this.player.create();

  },

  update: function() {
    this.game.physics.collide(this.rocks, this.player.fireball, this.fireballHitsRocks, null, this);

    this.player.update();

  },

  fireballHitsRock: function(rocks, fireball) {
    fireball.kill();
  },

  quitGame: function(pointer) {

    //  Here you should destroy anything you no longer need.
    //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //        Then let's go back to the main menu.
    this.game.state.start('MainMenu');

  }

};