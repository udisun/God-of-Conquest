(function() {

  var ns = window.GOC;

  function GameCtrl() {
    this.orientated = false;
    this.visible = true;

    this.player = null;

    // Monsters
    this.monstersNum = 8;
    this.createdMonstersNum = 0;
    this.monsters = null;

    this.spawnPoints = null;

    this.cursors = null;
    this.layers = {};
  }

  GameCtrl.prototype = {

    preload: function() {
      this.load.tilemap('desert', 'assets/tiles/desert1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32);

      // Player sprite
      this.load.spritesheet('player', 'assets/images/player.png', 64, 64);

      // Projectiles
      this.load.spritesheet('fireball', 'assets/images/fireball.png', 64, 64);

      // Monster
      this.load.spritesheet('monster', 'assets/images/monster.png', 64, 64);
    },
    create: function() {

      this.game.time.events.add(Phaser.Timer.SECOND * 3, this.spawnMonster, this);

      this.spawnPoints = [
        new Phaser.Point(this.world.bounds.left + 50, this.world.bounds.top + 50),
        new Phaser.Point(this.world.bounds.left + 50, this.world.bounds.bottom - 50),
        new Phaser.Point(this.world.bounds.right - 50, this.world.bounds.top + 50),
        new Phaser.Point(this.world.bounds.right - 50, this.world.bounds.bottom - 50)
      ];

      // Generals
      //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
      //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
      this.cursors = this.input.keyboard.createCursorKeys();

      // Map
      this.generateMap();

      // Player
      this.player = new ns.Player(this.game, this.world.centerX, this.world.centerY - 30);

      // Monster
      // Create a enemies group to store the baddies
      this.monsters = this.game.add.group();

      // Create some enemies.
      for (var i = 0; i < this.monstersNum; i++) {
        // Since the getFirstExists() which we'll use for recycling
        // cannot allocate new objects, create them manually here.
        var point = this.rnd.pick(this.spawnPoints);
        var monster = new ns.Monster(this.game, point.x, point.y);
        monster.kill();

        this.monsters.add(monster);
      }
    },

    spawnMonster: function() {
      var monster = this.monsters.getFirstExists(false);
      if (monster) {
        this.createdMonstersNum++;
        monster.revive(monster.hitPoints);

        if (this.createdMonstersNum < this.monstersNum) {
          this.game.time.events.add(Phaser.Timer.SECOND * 3, this.spawnMonster, this);
        }
      }
    },

    update: function() {
      this.physics.collide(this.monsters, this.layers.stronghold, this.monsterHitsStronghold, null, this);
      this.physics.collide(this.monsters, this.layers.paths);
      this.physics.collide(this.player.fireball, this.monsters, this.fireballHitsMonster, null, this);

      this.player.update();

      //this.monsters.forEachAlive(this.monsters.update, this.monster);
      this.monsters.forEachAlive(this.moveToStronghold, this, this.player);
    },

    moveToStronghold: function(monster, player) {
      if (!monster.attacking) {
        monster.rotation = this.game.math.degToRad(90) + this.game.physics.moveToObject(monster, player, 60);
      }
    },

    monsterHitsStronghold: function(monster, stronghold) {
      monster.attack();

    },

    fireballHitsMonster: function(fireball, monster) {
      monster.takeDamage(fireball.damage);
      fireball.kill();
    },

    generateMap: function() {
      var map = this.add.tilemap('desert');
      map.addTilesetImage('tmw_desert_spacing', 'tiles');

      this.layers.ground = map.createLayer(0);
      this.layers.stronghold = map.createLayer(1);
      this.layers.rocks = map.createLayer(2);
      this.layers.paths = map.createLayer(3);

      this.layers.ground.resizeWorld();
      this.layers.stronghold.resizeWorld();
      this.layers.rocks.resizeWorld();
      this.layers.paths.resizeWorld();

      // Map Collisions
      map.setCollisionBetween(25, 43, this.layers.stronghold);
      map.setCollisionBetween(1, 19, this.layers.paths);
      //map.setCollision(Array(25, 26, 27, 33, 34, 35, 41, 42, 43), stronghold);
    },

    quitGame: function(pointer) {

      //  Here you should destroy anything you no longer need.
      //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

      //        Then let's go back to the main menu.
      this.game.state.start('MainMenu');

      console.log(pointer);

    }

  };

  window.GOC = window.GOC || {};
  window.GOC.GameCtrl = GameCtrl;

}());