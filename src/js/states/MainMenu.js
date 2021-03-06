(function() {
  function MainMenu() {

    this.music = null;
    this.playButton = null;

  }

  MainMenu.prototype = {

    create: function() {

      //        We've already preloaded our assets, so let's kick right into the Main Menu itself.
      //        Here all we're doing is playing some music and adding a picture and button
      //        Naturally I expect you to do something significantly better :)

      //this.music = this.add.audio('titleMusic');
      //this.music.play();

      this.background = this.add.sprite(0, 0, 'background');

      this.playButton = this.add.button(this.game.width / 2 - 160, this.game.height / 2 - 120, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

      this.startGame();

    },

    update: function() {

      //        Do some nice funky main menu effect here

    },

    startGame: function(pointer) {

      //        Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
      //this.music.stop();

      //        And start the actual game
      this.game.state.start('GameCtrl');
      console.log(pointer);

    }

  };

  window.GOC = window.GOC || {};
  window.GOC.MainMenu = MainMenu;

}());