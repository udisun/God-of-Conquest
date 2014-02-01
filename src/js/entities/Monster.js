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
    this.animations.play('move', 10, true);

    this.game = game;
    this.hitPoints = 100;
    this.health = this.hitPoints;
    this.armor = 10;
    this.attacking = false;

    //game.add.existing(this);
  }

  Monster.prototype = Object.create(Phaser.Sprite.prototype);
  Monster.prototype.constructor = Monster;

  Monster.prototype.update = function() {
    //console.log(this.visible);
  };

  Monster.prototype.attack = function() {
    this.attacking = true;

    var attackAnim = (this.health < this.hitPoints ? 'attackWounded' : 'attack');
    this.animations.play(attackAnim, 10, true);
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
        var anim = (this.attacking ? 'attackWounded' : 'moveWounded');

        this.animations.play(anim, 5, true);
        this.damage(actualDamage);
      }
    }
  };

  window.GOC = window.GOC || {};
  window.GOC.Monster = Monster;

}());