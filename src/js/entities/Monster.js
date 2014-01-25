Monster = function(game) {
  this.game = game;
  this.sprite;
  this.health = 100;
  this.armor = 10;
};

Monster.prototype = {
  preload: function() {
    this.game.load.spritesheet('monster', 'assets/images/monster.png', 64, 64);
  },
  create: function() {
    var monster = this.sprite = this.game.add.sprite(50, 50, 'monster');
    monster.scale.setTo(0.75, 0.75);
    monster.anchor.setTo(0.5, 0.5);

    monster.health = this.health;

    monster.animations.add('attackWounded', [0, 1, 2, 3, 4, 5, 6, 7]);
    monster.animations.add('attack', [9, 10, 11, 12, 13, 14, 15, 16]);
    monster.animations.add('moveWounded', [18, 19, 20, 21, 22, 23, 24, 25]);
    monster.animations.add('move', [27, 28, 29, 30, 31, 32, 33, 34]);

    monster.animations.play('move', 15, true);
  },

  update: function() {},

  takeDamage: function(damage) {
    if (damage > this.armor) {
      var actualDamage = damage - this.armor;
      if (this.sprite.health - actualDamage <= 0) {
        // Dead
        // TODO: add monster killed animation
        this.sprite.kill();
      } else {
        // Wounded
        this.sprite.animations.play('moveWounded', 10, true);
        this.sprite.damage(actualDamage);
      }
    }
  }
};