(function() {
  var ns = window.GOC;

  function Boot() {}

  Boot.prototype = {

    preload: function() {

      //  Here we load the assets required for our preloader (in this case a background and a loading bar)
      this.load.image('background', 'assets/images/background.png');
      this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
      this.load.image('preloaderBar', 'assets/images/progress_bar.png');

    },

    create: function() {

      this.game.input.maxPointers = 1;
      this.game.stage.disableVisibilityChange = true;

      if (this.game.device.desktop) {
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.minWidth = 480;
        this.game.stage.scale.minHeight = 260;
        this.game.stage.scale.maxWidth = 1024;
        this.game.stage.scale.maxHeight = 768;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVertically = true;
        this.game.stage.scale.setScreenSize(true);
      } else {
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.minWidth = 480;
        this.game.stage.scale.minHeight = 260;
        this.game.stage.scale.maxWidth = 1024;
        this.game.stage.scale.maxHeight = 768;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVertically = true;
        this.game.stage.scale.forceOrientation(true, false);
        this.game.stage.scale.hasResized.add(this.gameResized, this);
        this.game.stage.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.game.stage.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        this.game.stage.scale.setScreenSize(true);
      }

      this.game.state.start('Preloader');

    },

    gameResized: function(width, height) {

      //  This could be handy if you need to do any extra processing if the game resizes.
      //  A resize could happen if for example swapping orientation on a device.

      console.log(width);
      console.log(height);

    },

    enterIncorrectOrientation: function() {

      ns.GameCtrl.orientated = false;

      document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function() {

      ns.GameCtrl.orientated = true;

      document.getElementById('orientation').style.display = 'none';

    }

  };

  window.GOC = window.GOC || {};
  window.GOC.Boot = Boot;

}());