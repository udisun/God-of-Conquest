(function() {

  function Projectile(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fireball');

    this.scale.setTo(0.75, 0.75);
    this.anchor.setTo(1, 1);
    this.exists = false;
    this.visible = false;
    this.outOfBoundsKill = true;
    this.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7]);

    this.game = game;
    this.damage = 50;
    this.speed = null;

    game.add.existing(this);
  }

  Projectile.prototype = Object.create(Phaser.Sprite.prototype);
  Projectile.prototype.constructor = Projectile;

  Projectile.prototype.update = function() {

  };

  Projectile.prototype.fire = function() {
    this.rotation = this.game.math.degToRad(180) + this.game.physics.moveToPointer(this, 300, Phaser.Input.activePointer);
    this.animations.play('fire', 20, true);
  };

  window.GOC = window.GOC || {};
  window.GOC.Projectile = Projectile;

}());