Player = function(game) {
  this.game = game;
  this.sprite;
  this.fireball;
  this.fireRate = 2000;
  this.nextFire = 0;

};

Player.prototype = {
  preload: function() {
    //  64x64 is the size of each frame
    //  There are 8 frames in the PNG
    this.game.load.spritesheet('player', 'assets/images/player.png', 64, 64);

    // Projectiles
    this.game.load.spritesheet('fireball', 'assets/images/fireball.png', 64, 64);
  },
  create: function() {
    var player = this.sprite = this.game.add.sprite(180, 110, 'player');
    player.scale.setTo(0.75, 0.75);
    player.anchor.setTo(0.5, 0.5);
    //player.angle = -90;
    player.animations.add('prepareSpell', [12, 13, 14, 15, 16, 17, 18, 19]);
    player.animations.add('fireSmallSpell', [12, 13, 14, 15, 16, 17, 18, 19, 6, 7, 8, 9, 10]);
    player.animations.add('fireBigSpell', [12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4]);

    console.log(player.events);
    player.events.onAnimationComplete.add(this.fire, this);

    // Projectiles
    var fireball = this.fireball = this.game.add.sprite(180, 130, 'fireball');
    fireball.scale.setTo(0.75, 0.75);
    fireball.anchor.setTo(1, 1);
    fireball.exists = false;
    fireball.visible = false;
    fireball.outOfBoundsKill = true;
    fireball.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7]);
  },

  update: function() {
    this.sprite.rotation = this.game.math.degToRad(90) + this.game.physics.angleToPointer(this.sprite);

    if (this.game.input.activePointer.isDown) {
      this.prepareSpell();
    }
  },

  prepareSpell: function() {
    if (this.game.time.now > this.nextFire) {
      this.sprite.animations.play('fireSmallSpell', 15, false);
    }
  },

  fire: function() {
    this.stopFire();

    this.nextFire = this.game.time.now + this.fireRate;
    this.fireball.reset(this.sprite.x, this.sprite.y);
    this.fireball.rotation = this.game.math.degToRad(180) + this.game.physics.moveToPointer(this.fireball, 300, Phaser.Input.activePointer);

    this.fireball.animations.play('fire', 20, true);
  },
  stopFire: function() {
    this.sprite.frame = 21;
  }
};