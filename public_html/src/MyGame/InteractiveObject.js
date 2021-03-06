/*
 * File: InteractiveObject.js
 *  
 * Texture objects where texture coordinate can change
 */
// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function InteractiveObject() {
    // textures: 
    this.kBoundImage = "assets/Bound.png";

    this.mBoundImage = null;

    this.mTopSq = null;
    this.mRightSq = null;
    this.mLeftSq = null;
    this.mBotSq = null;
}

/**
 * Public Methods
 */
InteractiveObject.prototype.draw = function (option, vpMatrix) {
    // set boundary for the marker
    if (option === 1) {
        var xForm = this.mBoundImage.getXform();
        this._setBoundSqPos(xForm, xForm.getXPos(), xForm.getYPos());
    }
    // Draw boundary
    this.mBoundImage.draw(vpMatrix);

    if (option === 1) {
        // Draw 4 bound marker
        this.mTopSq.draw(vpMatrix);
        this.mRightSq.draw(vpMatrix);
        this.mLeftSq.draw(vpMatrix);
        this.mBotSq.draw(vpMatrix);
    }
};

InteractiveObject.prototype.initialize = function (option, xPos, yPos, w, h) {
    if (option === 1) {
        // Init Bound
        this._initBound();
        // Init 4 corner square
        this._initBoundarySq();
        // set boundary for the marker
        var xForm = this.mBoundImage.getXform();
        this._setBoundSqPos(xForm, xForm.getXPos(), xForm.getYPos());
    } else {
        // Init Bound
        this._initBoundOnly(xPos, yPos, w, h);
    }
}

// Getter for this boundary
InteractiveObject.prototype.getBoundXForm = function () {
    return this.mBoundImage.getXform();
}

InteractiveObject.prototype.getBound = function () {
    return this.mBoundImage;
}


InteractiveObject.prototype.getBoundTopSqPos = function () {
    return this.mTopSq.getXform().getYPos();
}

InteractiveObject.prototype.getBoundBotSqPos = function () {
    return this.mBotSq.getXform().getYPos();
}

InteractiveObject.prototype.getBoundLeftSqPos = function () {
    return this.mLeftSq.getXform().getXPos();
}

InteractiveObject.prototype.getBoundRightSqPos = function () {
    return this.mRightSq.getXform().getXPos();
}

InteractiveObject.prototype.getAllSqXForm = function () {
    var sqArr = [];
    sqArr.push(this.mTopSq.getXform());
    sqArr.push(this.mBotSq.getXform());
    sqArr.push(this.mLeftSq.getXform());
    sqArr.push(this.mRightSq.getXform());
    return sqArr;
}

// Setter for this boundary
InteractiveObject.prototype.incBoundXPos = function (delta) {
    this.mBoundImage.getXform().incXPosBy(delta);
}

InteractiveObject.prototype.incBoundYPos = function (delta) {
    this.mBoundImage.getXform().incYPosBy(delta);
}

InteractiveObject.prototype.incBoundSize = function (delta) {
    if (this.mBoundImage.getXform().getWidth() > 0) {
        this.mBoundImage.getXform().incSizeBy(delta);
        return;
    }

    if ((this.mBoundImage.getXform().getWidth() <= 0)
        && delta > 0) {
        this.mBoundImage.getXform().incSizeBy(delta);
        return;
    }
}

InteractiveObject.prototype.setBoundHeight = function (delta) {
    if (this.mBoundImage.getXform().getHeight() > 0) {
        this.mBoundImage.getXform().incHeightBy(delta);
        return;
    }

    if ((this.mBoundImage.getXform().getHeight() <= 0)
        && delta > 0) {
        this.mBoundImage.getXform().incHeightBy(delta);
        return;
    }
}


InteractiveObject.prototype.setBoundWidth = function (delta) {
    if (this.mBoundImage.getXform().getWidth() > 0) {
        this.mBoundImage.getXform().incWidthBy(delta);
        return;
    }

    if ((this.mBoundImage.getXform().getWidth() <= 0)
        && delta > 0) {
        this.mBoundImage.getXform().incWidthBy(delta);
        return;
    }
}

//--- end of Public Methods


/**
 * Private Methods
 */

// ------------------------------ INITIALIZER -----------------------------------------------
InteractiveObject.prototype._initBound = function () {
    this.mBoundImage = new SpriteRenderable(this.kBoundImage);
    this.mBoundImage.setColor([1, 1, 1, 0]);
    this.mBoundImage.getXform().setPosition(60, 42);
    this.mBoundImage.getXform().setSize(28, 25);
}

InteractiveObject.prototype._initBoundOnly = function (xPos, yPos, w, h) {
    this.mBoundImage = new SpriteRenderable(this.kBoundImage);
    this.mBoundImage.setColor([1, 1, 1, 0]);
    this.mBoundImage.getXform().setPosition(xPos, yPos);
    this.mBoundImage.getXform().setSize(w, h);
    console.log("Bound only", this.mBoundImage);
}

InteractiveObject.prototype._initBoundarySq = function () {
    this.mTopSq = new Renderable(this.mConstColorShader);
    this.mTopSq.setColor([1, 0.7, 1, 1]);
    this.mTopSq.getXform().setSize(2, 2);

    this.mRightSq = new Renderable(this.mConstColorShader);
    this.mRightSq.setColor([0.2, 1, 0.3, 1]);
    this.mRightSq.getXform().setSize(2, 2);

    this.mLeftSq = new Renderable(this.mConstColorShader);
    this.mLeftSq.setColor([0.4, 1, 1, 1]);
    this.mLeftSq.getXform().setSize(2, 2);

    this.mBotSq = new Renderable(this.mConstColorShader);
    this.mBotSq.setColor([1, 1, 0.6, 1]);
    this.mBotSq.getXform().setSize(2, 2);
}


// ------------------------------ SETTER FOR CORNER SQUARE -----------------------------------------------
InteractiveObject.prototype._setBoundSqPos = function (xForm, xPos, yPos) {
    var halfXLen = xForm.getWidth() / 2;
    var halfYLen = xForm.getHeight() / 2;
    this.mTopSq.getXform().setPosition(xPos, yPos + halfYLen);
    this.mRightSq.getXform().setPosition(xPos + halfXLen, yPos);
    this.mLeftSq.getXform().setPosition(xPos - halfXLen, yPos);
    this.mBotSq.getXform().setPosition(xPos, yPos - halfYLen);
}

