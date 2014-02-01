(function() {
  'use strict';

  function Monster(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'monster');

    this.scale.setTo(0.75, 0.75);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('attackWounded', [0, 1, 2, 3, 4, 5, 6, 7]);
    this.animations.add('attack', [9, 10, 11, 12, 13, 14, 15, 16]);
    this.animations.add('moveWounded', [18, 19, 20, 21, 22, 23, 24, 25]);
    this.animations.add('move', [27, 28, 29, 30, 31, 32, 33, 34]);
    this.animations.play('move', 15, true);

    this.game = game;
    this.health = 100;
    this.armor = 10;

    game.add.existing(this);
  }

  Monster.prototype = Object.create(Phaser.Sprite.prototype);
  Monster.prototype.constructor = Monster;

  Monster.prototype.update = function() {
    //console.log(this.visible);
  };

  Monster.prototype.takeDamage = function(damage) {
    if (damage > this.armor) {
      var actualDamage = damage - this.armor;
      if (this.health - actualDamage <= 0) {
        // Dead
        // TODO: add monster killed animation
        this.kill();
      } else {
        // Wounded
        this.animations.play('moveWounded', 10, true);
        this.damage(actualDamage);
      }
    }
  };

  window.GOC = window.GOC || {};
  window.GOC.Monster = Monster;

}());