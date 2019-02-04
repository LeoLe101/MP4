/* 
 * The template for a MainView.
 */

"use strict";

// Constructor
function MainView() {

    // The camera to view the scene
    this.mCamera = null;

    // Support Objects: SpriteSource and InteractionBound
    this.mSpriteSource = null;
    this.mInteractiveObject = null;
    this.mMinion = null;

    this.mStatusUpdate = null;
    this.mInteractiveBoundInfo = null;

    this.mTextToWork = null;
};
gEngine.Core.inheritPrototype(MainView, Scene);


MainView.prototype.loadScene = function () {


    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon16);
};

MainView.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);

    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon16);

    // Step B: starts the next level
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MainView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 600, 400]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    // Step B: Create the font and minion images using sprite
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0]);
    this.mFontImage.getXform().setPosition(15, 50);
    this.mFontImage.getXform().setSize(20, 20);

    // The right minion
    this.mMinion = new SpriteAnimateRenderable(this.kMinionSprite);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(15, 25);
    this.mMinion.getXform().setSize(24, 19.2);
    this.mMinion.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        204, 164,   // widthxheight in pixels
        5,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(15);
    // show each element for mAnimSpeed updates

    // Step D: Create the hero object with texture from the lower-left corner 
    this.mHero = new SpriteRenderable(this.kMinionSprite);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(35, 50);
    this.mHero.getXform().setSize(12, 18);
    this.mHero.setElementPixelPositions(0, 120, 0, 180);

    this.mTextToWork = this.mInteractiveBoundInfo;
};


MainView.prototype.draw = function () {

};

MainView.prototype.update = function () {

};


/**
 * Private Methods
 */
MainView.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};