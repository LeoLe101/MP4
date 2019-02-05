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
        this._setSpriteBorder(spriteXFrom, spriteXFrom.getXPos(), spriteXFrom.getYPos());

        this.mMinionSprite.draw(vpMatrix);
    } else {
        var imageXFrom = this.mFontImage.getXform();
        this._setImgCornerSqPos(imageXFrom, imageXFrom.getXPos(), imageXFrom.getYPos());
        this._setImgBorder(imageXFrom, imageXFrom.getXPos(), imageXFrom.getYPos());
        this.mFontImage.draw(vpMatrix);
    }

    // Draw 4 border line for the image or sprite
    this.mBorderTop.draw(vpMatrix);
    this.mBorderLeft.draw(vpMatrix);
    this.mBorderRight.draw(vpMatrix);
    this.mBorderBot.draw(vpMatrix);

    // Draw 4 border marker after getting the sprite or font Image size
    this.mTopLeftSq.draw(vpMatrix);
    this.mTopRightSq.draw(vpMatrix);
    this.mBotLeftSq.draw(vpMatrix);
    this.mBotRightSq.draw(vpMatrix);
};

SpriteSource.prototype.initialize = function () {
    // Init Sprite
    this._initSprite();
    // Init Font Image
    this._initImg();
    // Init 4 corner square
    this._initCornorSq();
    // Init 4 border
    this._initLineBorder();
}

SpriteSource.prototype.initialize = function () {
    // Init Sprite
    this._initSprite();
    // Init Font Image
    this._initImg();
    // Init 4 corner square
    this._initCornorSq();
    // Init 4 border
    this._initLineBorder();
}


SpriteSource.prototype.getSpriteTopSqPos = function () {
    return this.mTopLeftSq.getXform().getYPos();
}

SpriteSource.prototype.getSpriteBotSqPos = function () {
    return this.mBotRightSq.getXform().getYPos();
}


SpriteSource.prototype.getSpriteLeftSqPos = function () {
    return this.mTopLeftSq.getXform().getXPos();
}


SpriteSource.prototype.getSpriteRightSqPos = function () {
    return this.mBotRightSq.getXform().getXPos();
}
//--- end of Public Methods



/**
 * Private Methods
 */

// ------------------------------ INITIALIZER -----------------------------------------------
SpriteSource.prototype._initSprite = function () {
    this.mMinionSprite = new SpriteRenderable(this.kMinionSprite);
    this.mMinionSprite.setColor([1, 1, 1, 0]);
    this.mMinionSprite.getXform().setPosition(60, 50);
    this.mMinionSprite.getXform().setSize(140, 80);
}

SpriteSource.prototype._initImg = function () {
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0]);
    this.mFontImage.getXform().setPosition(60, 50);
    this.mFontImage.getXform().setSize(130, 130);
}

SpriteSource.prototype._initCornorSq = function () {
    this.mTopLeftSq = new Renderable(this.mConstColorShader);
    this.mTopLeftSq.setColor([0.1, 0.1, 1, 1]);
    this.mTopLeftSq.getXform().setSize(4, 4);

    this.mTopRightSq = new Renderable(this.mConstColorShader);
    this.mTopRightSq.setColor([0.2, 0.8, 0.3, 1]);
    this.mTopRightSq.getXform().setSize(4, 4);

    this.mBotLeftSq = new Renderable(this.mConstColorShader);
    this.mBotLeftSq.setColor([0.4, 0.3, 1, 1]);
    this.mBotLeftSq.getXform().setSize(4, 4);

    this.mBotRightSq = new Renderable(this.mConstColorShader);
    this.mBotRightSq.setColor([1, 0, 0.6, 1]);
    this.mBotRightSq.getXform().setSize(4, 4);
}

SpriteSource.prototype._initLineBorder = function () {
    this.mBorderTop = new Renderable(this.mConstColorShader);
    this.mBorderTop.setColor([0, 0, 0, 1]);
    this.mBorderTop.getXform().setSize(0.3, 0.3);

    this.mBorderLeft = new Renderable(this.mConstColorShader);
    this.mBorderLeft.setColor([0, 0, 0, 1]);
    this.mBorderLeft.getXform().setSize(0.3, 0.3);

    this.mBorderRight = new Renderable(this.mConstColorShader);
    this.mBorderRight.setColor([0, 0, 0, 1]);
    this.mBorderRight.getXform().setSize(0.3, 0.3);

    this.mBorderBot = new Renderable(this.mConstColorShader);
    this.mBorderBot.setColor([0, 0, 0, 1]);
    this.mBorderBot.getXform().setSize(0.3, 0.3);
}


// ------------------------------ SETTER FOR CORNER SQUARE -----------------------------------------------
SpriteSource.prototype._setSpriteCornerSqPos = function (xFrom, xPos, yPos) {
    var halfXLen = xFrom.getWidth() / 2;
    var halfYLen = xFrom.getHeight() / 2;
    this.mTopLeftSq.getXform().setPosition(xPos - halfXLen, yPos + halfYLen);
    this.mTopRightSq.getXform().setPosition(xPos + halfXLen, yPos + halfYLen);
    this.mBotLeftSq.getXform().setPosition(xPos - halfXLen, yPos - halfYLen);
    this.mBotRightSq.getXform().setPosition(xPos + halfXLen, yPos - halfYLen);
}

SpriteSource.prototype._setImgCornerSqPos = function (xFrom, xPos, yPos) {
    var halfXLen = xFrom.getWidth() / 2;
    var halfYLen = xFrom.getHeight() / 2;
    this.mTopLeftSq.getXform().setPosition(xPos - halfXLen, yPos + halfYLen);
    this.mTopRightSq.getXform().setPosition(xPos + halfXLen, yPos + halfYLen);
    this.mBotLeftSq.getXform().setPosition(xPos - halfXLen, yPos - halfYLen);
    this.mBotRightSq.getXform().setPosition(xPos + halfXLen, yPos - halfYLen);
}

// ------------------------------ SETTER FOR BORDER--------- -----------------------------------------------
SpriteSource.prototype._setSpriteBorder = function (xFrom, xPos, yPos) {
    var halfXLen = xFrom.getWidth() / 2;
    var halfYLen = xFrom.getHeight() / 2;
    this.mBorderTop.getXform().setPosition(xPos, yPos + halfYLen);
    this.mBorderTop.getXform().setWidth(xFrom.getWidth());
    this.mBorderLeft.getXform().setPosition(xPos + halfXLen, yPos);
    this.mBorderLeft.getXform().setHeight(xFrom.getHeight());
    this.mBorderRight.getXform().setPosition(xPos - halfXLen, yPos);
    this.mBorderRight.getXform().setHeight(xFrom.getHeight());
    this.mBorderBot.getXform().setPosition(xPos, yPos - halfYLen);
    this.mBorderBot.getXform().setWidth(xFrom.getWidth());
}

SpriteSource.prototype._setImgBorder = function (xFrom, xPos, yPos) {
    var halfXLen = xFrom.getWidth() / 2;
    var halfYLen = xFrom.getHeight() / 2;
    this.mBorderTop.getXform().setPosition(xPos, yPos + halfYLen);
    this.mBorderTop.getXform().setWidth(xFrom.getWidth());
    this.mBorderLeft.getXform().setPosition(xPos + halfXLen, yPos);
    this.mBorderLeft.getXform().setHeight(xFrom.getHeight());
    this.mBorderRight.getXform().setPosition(xPos - halfXLen, yPos);
    this.mBorderRight.getXform().setHeight(xFrom.getHeight());
    this.mBorderBot.getXform().setPosition(xPos, yPos - halfYLen);
    this.mBorderBot.getXform().setWidth(xFrom.getWidth());
}
