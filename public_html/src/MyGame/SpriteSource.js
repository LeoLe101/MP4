/*
 * File: SpriteSource.js
 *  
 * Texture objects where texture coordinate can change
 */
// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SpriteSource() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";

    this.mMinionSprite = null;
    this.mFontImage = null;

    this.mTopLeftSq = null;
    this.mTopRightSq = null;
    this.mBotLeftSq = null;
    this.mBotRightSq = null;

    this.mBorderTop = null;
    this.mBorderLeft = null;
    this.mBorderRight = null;
    this.mBorderBot = null;
}

/**
 * Public Methods
 */
SpriteSource.prototype.draw = function (option, vpMatrix) {


    if (option == 1) {
        var spriteXFrom = this.mMinionSprite.getXform();
        this._setSpriteCornerSqPos(spriteXFrom, spriteXFrom.getXPos(), spriteXFrom.getYPos());
        this.mMinionSprite.draw(vpMatrix);
    } else {
        var imageXFrom = this.mFontImage.getXform();
        this._setImgCornerSqPos(imageXFrom, imageXFrom.getXPos(), imageXFrom.getYPos());
        this.mFontImage.draw(vpMatrix);
    }

    // Draw 4 border marker after getting the sprite or font Image size
    this.mTopLeftSq.draw(vpMatrix);
    this.mTopRightSq.draw(vpMatrix);
    this.mBotLeftSq.draw(vpMatrix);
    this.mBotRightSq.draw(vpMatrix);

    // Draw 4 border line for the image or sprite
    this.mBorderTop.drawLine(vpMatrix);
    this.mBorderLeft.drawLine(vpMatrix);
    this.mBorderRight.drawLine(vpMatrix);
    this.mBorderBot.drawLine(vpMatrix);
};

SpriteSource.prototype.initialize = function () {
    // Init Sprite
    this.mMinionSprite = new SpriteRenderable(this.kMinionSprite);
    this.mMinionSprite.setColor([1, 1, 1, 0]);
    this.mMinionSprite.getXform().setPosition(35, 50);
    this.mMinionSprite.getXform().setSize(22, 28);

    // Init Font Image
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0]);
    this.mFontImage.getXform().setPosition(15, 50);
    this.mFontImage.getXform().setSize(50, 50);

    // Init 4 corner square
    this._initCornorSq();
    this._initLineBorder();
}

//--- end of Public Methods



/**
 * Private Methods
 */

// ------------------------------ INITIALIZER -----------------------------------------------
SpriteSource.prototype._initCornorSq = function () {
    this.mTopLeftSq = new Renderable(this.mConstColorShader);
    this.mTopLeftSq.setColor([0.8, 0.2, 0.5, 1]);
    this.mTopLeftSq.getXform().setSize(1.5, 1.5);

    this.mTopRightSq = new Renderable(this.mConstColorShader);
    this.mTopRightSq.setColor([0.2, 0.8, 0.3, 1]);
    this.mTopRightSq.getXform().setSize(1.5, 1.5);

    this.mBotLeftSq = new Renderable(this.mConstColorShader);
    this.mBotLeftSq.setColor([0.4, 0.9, 1, 1]);
    this.mBotLeftSq.getXform().setSize(1.5, 1.5);

    this.mBotRightSq = new Renderable(this.mConstColorShader);
    this.mBotRightSq.setColor([1, 0, 0.6, 1]);
    this.mBotRightSq.getXform().setSize(1.5, 1.5);
}

SpriteSource.prototype._initLineBorder = function () {
    this.mBorderTop = new Renderable(this.mConstColorShader);
    this.mBorderTop.setColor([0, 0, 0, 1]);
    this.mBorderTop.getXform().setSize(1.5, 1.5);

    this.mBorderLeft = new Renderable(this.mConstColorShader);
    this.mBorderLeft.setColor([0, 0, 0, 1]);
    this.mBorderLeft.getXform().setSize(1.5, 1.5);

    this.mBorderRight = new Renderable(this.mConstColorShader);
    this.mBorderRight.setColor([0, 0, 0, 1]);
    this.mBorderRight.getXform().setSize(1.5, 1.5);

    this.mBorderBot = new Renderable(this.mConstColorShader);
    this.mBorderBot.setColor([0, 0, 0, 1]);
    this.mBorderBot.getXform().setSize(1.5, 1.5);
}

// ------------------------------ SETTER FOR CORNER SQUARE -----------------------------------------------
SpriteSource.prototype._setSpriteCornerSqPos = function (xFrom, xPos, yPos) {
    this.mTopLeftSq.getXform().setPosition(xPos, yPos);
    this.mTopRightSq.getXform().setPosition(xPos, yPos);
    this.mBotLeftSq.getXform().setPosition(xPos, yPos);
    this.mBotRightSq.getXform().setPosition(xPos, yPos);
}

SpriteSource.prototype._setImgCornerSqPos = function (xFrom, xPos, yPos) {
    this.mTopLeftSq.getXform().setPosition(xPos, yPos);
    this.mTopRightSq.getXform().setPosition(xPos, yPos);
    this.mBotLeftSq.getXform().setPosition(xPos, yPos);
    this.mBotRightSq.getXform().setPosition(xPos, yPos);
}

// ------------------------------ SETTER FOR BORDER--------- -----------------------------------------------
SpriteSource.prototype._setSpriteBorder = function (xFrom, xPos, yPos) {
    this.mBorderTop.getXform().setPosition(xPos, yPos);
    this.mBorderLeft.getXform().setPosition(xPos, yPos);
    this.mBorderRight.getXform().setPosition(xPos, yPos);
    this.mBorderBot.getXform().setPosition(xPos, yPos);
}

SpriteSource.prototype._setImgBorder = function (xFrom, xPos, yPos) {
    this.mBorderTop.getXform().setPosition(xPos, yPos);
    this.mBorderLeft.getXform().setPosition(xPos, yPos);
    this.mBorderRight.getXform().setPosition(xPos, yPos);
    this.mBorderBot.getXform().setPosition(xPos, yPos);
}
