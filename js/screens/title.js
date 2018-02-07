game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        var backgroundImage = new menubar.Sprite(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
                image: me.loader.getImage('title-bg'),
            }
        );

        var arrowSprite = new menubar.Sprite(
            75,
            147, {
                image: me.loader.getImage('title-arrow'),
            }
        );

        //scale to fit with the viewerport size
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 1);
        arrowSprite.scale(me.game.viewport.width / backgroundImage.width, 1);

        //add to the world container
        me.game.world.addChild(backgroundImage, 1);
        me.game.world.addChild(arrowSprite, 2);

        me.game.world.addChild(new (me.Renderable.extend({

            //constructor
            init: function () {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

                //font for the scrolling text
                this.font = new menubar.BitmapFont("8x8_font", 8); 
            },

            update: function (dt) {
                return true;
            },

            draw: function(renderer) {
                this.font.draw(renderer, "1 PLAYER GAME", 80, 144);
            },

            onDestroyEvent: function() {

            }
        })), 2); z

        me.input.blindKey(me.input.KEY.ENTER, "start", true);

        this.handler = me.event.subscribe(me.event.KEYDOWN,  function (action, keyCode, edge) {
            if (action === "start") {
                if (game.marioData.currentWorld != null && game.marioData.currentWorld != "" && game.marioData.lives != null && game.marioData.lives > 0) {
                    me.state.change(me.state.WORLD, game.marioData.currentWorld);
                }
                else {
                    game.marioData.lives = 3;
                    game.marioData.worldPos = null; //in case a position was set
                    game.marioData.worlds = []; //reset world save data
                    me.save.marioData = game.marioData;
                    me.state.change(me.state.WORLD, "world1");
                }
            }
        });
    },

    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEYEnter);
        me.event.unsubscribe(this.handler);
    }
});