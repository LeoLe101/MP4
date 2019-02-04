"use strict";  // Operate in Strict mode such that variables must be declared before used!

function InteractiveObject() {
    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel (white)
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**----------------------------------------- 
InteractiveObject.prototype.draw = function (vpMatrix) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, vpMatrix);  // always activate the shader first!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

InteractiveObject.prototype.getXform = function () { return this.mXform; };
InteractiveObject.prototype.setColor = function (color) { this.mColor = color; };
InteractiveObject.prototype.getColor = function () { return this.mColor; };
//--- end of Public Methods
//</editor-fold>

InteractiveObject.prototype._setShader = function (s) { this.mShader = s; };