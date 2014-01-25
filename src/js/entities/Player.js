Player = function(gameCtr) {
  this.gameCtr = gameCtr;
  this.sprite;
  this.fireball;
  this.fireRate = 2000;
  this.nextFire = 0;
};

Player.prototype = {
  preload: function() {
    // Player sprite
    this.gameCtr.load.spritesheet('player', 'assets/images/player.png', 64, 64);

    // Projectiles
    this.fireball = new Projectile(this.gameCtr);
    this.fireball.preload();
  },
  create: function() {
    var player = this.sprite = this.gameCtr.add.sprite(this.gameCtr.world.centerX, this.gameCtr.world.centerY - 30, 'player');
    player.scale.setTo(0.75, 0.75);
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('prepareSpell', [12, 13, 14, 15, 16, 17, 18, 19]);
    player.animations.add('fireSmallSpell', [12, 13, 14, 15, 16, 17, 18, 19, 6, 7, 8, 9, 10]);
    player.animations.add('fireBigSpell', [12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4]);

    // Projectiles
    this.fireball.create();

    player.events.onAnimationComplete.add(function() {
      this.fireball.fire();
    }, this);
  },

  update: function() {
    this.sprite.rotation = this.gameCtr.math.degToRad(90) + this.gameCtr.physics.angleToPointer(this.sprite);

    if (this.gameCtr.input.activePointer.isDown) {
      this.prepareSpell();
    }
  },

  prepareSpell: function() {
    if (this.gameCtr.time.now > this.nextFire) {
      this.sprite.animations.play('fireSmallSpell', 15, false);
    }
  }
};

/********************** Projectiles *************************/
Projectile = function(gameCtr) {
  this.gameCtr = gameCtr;
  this.sprite;
  this.damage = 50;
  this.speed;
};

Projectile.prototype = {
  preload: function() {
    this.gameCtr.load.spritesheet('fireball', 'assets/images/fireball.png', 64, 64);
  },

  create: function() {
    var fireball = this.sprite = this.gameCtr.add.sprite(180, 130, 'fireball');
    fireball.scale.setTo(0.75, 0.75);
    fireball.anchor.setTo(1, 1);
    fireball.exists = false;
    fireball.visible = false;
    fireball.outOfBoundsKill = true;
    fireball.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7]);
  },

  update: function() {

  },

  stopFire: function() {
    this.gameCtr.player.sprite.frame = 21;
  },

  fire: function() {
    this.stopFire();

    this.nextFire = this.gameCtr.time.now + this.gameCtr.player.fireRate;
    this.sprite.reset(this.gameCtr.player.sprite.x, this.gameCtr.player.sprite.y);
    this.sprite.rotation = this.gameCtr.math.degToRad(180) + this.gameCtr.physics.moveToPointer(this.sprite, 300, Phaser.Input.activePointer);

    this.sprite.animations.play('fire', 20, true);
  },
};