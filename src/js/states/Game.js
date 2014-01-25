GameCtrl.Game = function(game) {
  this.player;
  this.monster;

  this.cursors;
  this.layers = [];
};

GameCtrl.Game.prototype = {

  preload: function() {
    this.load.tilemap('desert', 'assets/tiles/desert1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32);

    this.player = new Player(this);
    this.player.preload();

    this.monster = new Monster(this);
    this.monster.preload();
  },
  create: function() {
    // Generals
    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Map
    map = this.add.tilemap('desert');
    map.addTilesetImage('tmw_desert_spacing', 'tiles');

    this.layers['ground'] = map.createLayer(0);
    this.layers['stronghold'] = map.createLayer(1);
    this.layers['rocks'] = map.createLayer(2);
    this.layers['paths'] = map.createLayer(3);

    this.layers['ground'].resizeWorld();
    this.layers['stronghold'].resizeWorld();
    this.layers['rocks'].resizeWorld();
    this.layers['paths'].resizeWorld();

    // Map Collisions
    map.setCollisionBetween(25, 43, this.layers['stronghold']);
    map.setCollisionBetween(1, 19, this.layers['paths']);
    //map.setCollision(Array(25, 26, 27, 33, 34, 35, 41, 42, 43), stronghold);

    // Player
    this.player.create();

    // Monster
    this.monster.create();
  },

  update: function() {
    this.physics.collide(this.monster.sprite, this.layers['stronghold'], this.monsterHitsStronghold, null, this);
    this.physics.collide(this.monster.sprite, this.layers['paths']);
    this.physics.collide(this.player.fireball.sprite, this.monster.sprite, this.fireballHitsMonster, null, this);

    this.player.update();

    this.monster.update();

    this.monster.sprite.rotation = this.game.math.degToRad(90) + this.game.physics.moveToObject(this.monster.sprite, this.player.sprite, 60);
  },

  monsterHitsStronghold: function(monster, stronghold) {
    console.log('hit stronghold');
  },

  fireballHitsMonster: function(fireball, monster) {
    // TODO: how to get to the Monster from the sprite named monster
    this.monster.takeDamage(this.player.fireball.damage);
    fireball.kill();
  },

  quitGame: function(pointer) {

    //  Here you should destroy anything you no longer need.
    //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //        Then let's go back to the main menu.
    this.game.state.start('MainMenu');

  }

};