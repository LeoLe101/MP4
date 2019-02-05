/* 
 * The template for a ZoomedView.
 */

"use strict";

// Constructor
function ZoomedView() {
   
    // The camera to view the scene
    this.mCamera11 = null;
    this.mCamera12 = null;
    this.mCamera13 = null;
    this.mCamera14 = null;

    this.mInteractiveObject = null;
};


ZoomedView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera1 = new Camera(
        vec2.fromValues(60, 40),   // position of the camera
        150,                       // width of camera
        [260, 0, 600, 700]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera1.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mInteractiveObject = MainView.getInteractiveBoundObj();
};


ZoomedView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera1.setupViewProjection();

    // Step  C: Draw everything
    this.mSpriteSource.draw(this.mOption, this.mCamera1.getVPMatrix());
    this.mInteractiveObject.draw(this.mCamera1.getVPMatrix());

    this.mStatus.draw(this.mCamera1.getVPMatrix());
};
