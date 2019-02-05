/* 
 * The template for a AnimationView.
 */

"use strict";

// Constructor
function AnimationView() {
    // The camera to view the scene
    this.mCamera = null;

    // Support Objects: SpriteSource and InteractionBound
    this.mSpriteSource = null;
    this.mOption = 1; // this is for the sprite draw function (switching between different image/sprite)
    this.mInteractiveObject = null;

    this.mStatus = null;
    this.mInteractiveBoundInfo = null;

};

AnimationView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(60, 40),   // position of the camera
        150,                       // width of camera
        [260, 0, 600, 700]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mSpriteSource = new SpriteSource();
    this.mSpriteSource.initialize();

    this.mInteractiveObject = new InteractiveObject();
    this.mInteractiveObject.initialize();

    this.mStatus = new FontRenderable("Status: Bound Pos=(0.00  0.00) -- Size=(15.00  15.00)");
    this.mStatus.setFont(this.kFontCon32);
    this.mStatus.setColor([0, 0, 0, 1]);
    this.mStatus.getXform().setPosition(-5, -40);
    this.mStatus.setTextHeight(4);
};


AnimationView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mSpriteSource.draw(this.mOption, this.mCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.mCamera.getVPMatrix());

    this.mStatus.draw(this.mCamera.getVPMatrix());
};
