(function() {
  var ns = window.GOC;

  function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.scale.setTo(0.75, 0.75);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('fireSmallSpell', [12, 13, 14, 15, 16, 17, 18, 19, 6, 7, 8, 9, 10]);
    this.animations.add('fireBigSpell', [12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4]);

    // Projectiles
    this.fireball = new ns.Projectile(game, 180, 130);

    this.game = game;
    this.fireRate = 2000;
    this.nextFire = 0;

    game.add.existing(this);
  }

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    this.rotation = this.game.math.degToRad(90) + this.game.physics.angleToPointer(this);

    if (this.game.input.activePointer.isDown) {
      this.prepareSpell();
    }

    this.events.onAnimationComplete.add(function() {
      this.fireball.reset(this.x, this.y);
      this.fireball.fire();
      this.stopSpell();
    }, this);
  };

  Player.prototype.stopSpell = function() {
    this.frame = 21;
  };

  Player.prototype.prepareSpell = function() {
    if (this.game.time.now > this.nextFire) {
      this.stopSpell();
      this.nextFire = this.game.time.now + this.fireRate;

      this.animations.play('fireSmallSpell', 15, false);
    }
  };

  window.GOC = window.GOC || {};
  window.GOC.Player = Player;

}());