/* 
 * The template for a MainView.
 */

"use strict";

// Constructor
function MainView() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";

    // The camera to view the scene
    this.mCamera = null;

    // Support Objects: SpriteSource and InteractionBound
    this.mSpriteSource = null;
    this.mOption = 1; // this is for the sprite draw function (switching between different image/sprite)
    this.mInteractiveObject = null;

    this.mStatusUpdate = null;
    this.mInteractiveBoundInfo = null;

};
gEngine.Core.inheritPrototype(MainView, Scene);


MainView.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);
};

MainView.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);

    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MainView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(60, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 700, 700]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mSpriteSource = new SpriteSource();
    this.mSpriteSource.initialize();

    // this.mInteractiveObject = new InteractiveObject();
    // this.mInteractiveObject.initialize();
};


MainView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mSpriteSource.draw(this.mOption, this.mCamera.getVPMatrix());
    // this.mInteractiveObject.draw(this.mCamera.getVPMatrix());
};

MainView.prototype.update = function () {
    var deltaX = 0.5;

    // -------------------------------- SUPPORT ARROW KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
 
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
 
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
  
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {

    }

    // -------------------------------- SUPPORT CHANGING SPRITE/IMAGE KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mOption = 2;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mOption = 1;
    }
    
};


/**
 * Private Methods
 */
MainView.prototype._something = function () {

};