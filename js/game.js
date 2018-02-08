/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(256, 224, {wrapper : "screen"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        //add "#debug" to the url to enable debug panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            })
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.WORLD1, new game.World1());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
