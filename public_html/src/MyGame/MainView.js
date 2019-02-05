/* 
 * The template for a MainView.
 */

"use strict";

// Constructor
function MainView() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kFontCon32 = "assets/fonts/Consolas-32";
    this.kBoundImage = "assets/Bound.png";

    // The camera to view the scene
    this.mCamera = null;

    // Support Objects: SpriteSource and InteractionBound
    this.mSpriteSource = null;
    this.mOption = 1; // this is for the sprite draw function (switching between different image/sprite)
    this.mInteractiveObject = null;

    this.mStatus = null;
    this.mInteractiveBoundInfo = null;

};
gEngine.Core.inheritPrototype(MainView, Scene);


MainView.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kBoundImage);

    gEngine.Textures.loadTexture(this.kMinionSprite);

    gEngine.Fonts.loadFont(this.kFontCon32);
};

MainView.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kBoundImage);

    gEngine.Textures.unloadTexture(this.kMinionSprite);

    gEngine.Fonts.unloadFont(this.kFontCon32);

    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MainView.prototype.initialize = function () {
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


MainView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mSpriteSource.draw(this.mOption, this.mCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.mCamera.getVPMatrix());

    this.mStatus.draw(this.mCamera.getVPMatrix());
};

MainView.prototype.update = function () {
    var deltaX = 0.5;
    var boundXForm = this.mInteractiveObject.getBoundXForm();

    // -------------------------------- SUPPORT ARROW KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if ((this.mInteractiveObject.getBoundLeftSqPos() >= this.mSpriteSource.getSpriteLeftSqPos())
            && (this.mInteractiveObject.getBoundRightSqPos() < this.mSpriteSource.getSpriteRightSqPos())) {
            this.mInteractiveObject.setBoundWidth(deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if ((this.mInteractiveObject.getBoundTopSqPos() <= this.mSpriteSource.getSpriteTopSqPos())
            && (this.mInteractiveObject.getBoundBotSqPos() > this.mSpriteSource.getSpriteBotSqPos())) {
            this.mInteractiveObject.setBoundHeight(deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if ((this.mInteractiveObject.getBoundLeftSqPos() > this.mSpriteSource.getSpriteLeftSqPos())
            && (this.mInteractiveObject.getBoundRightSqPos() <= this.mSpriteSource.getSpriteRightSqPos())) {
            this.mInteractiveObject.setBoundWidth(-deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if ((this.mInteractiveObject.getBoundTopSqPos() < this.mSpriteSource.getSpriteTopSqPos())
            && (this.mInteractiveObject.getBoundBotSqPos() >= this.mSpriteSource.getSpriteBotSqPos())) {
            this.mInteractiveObject.setBoundHeight(-deltaX);
        }
    }

    // -------------------------------- SUPPORT W-A-S-D KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if (this.mInteractiveObject.getBoundTopSqPos() < this.mSpriteSource.getSpriteTopSqPos()) {
            this.mInteractiveObject.incBoundYPos(deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if (this.mInteractiveObject.getBoundLeftSqPos() > this.mSpriteSource.getSpriteLeftSqPos()) {
            this.mInteractiveObject.incBoundXPos(-deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if (this.mInteractiveObject.getBoundBotSqPos() > this.mSpriteSource.getSpriteBotSqPos()) {
            this.mInteractiveObject.incBoundYPos(-deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (this.mInteractiveObject.getBoundRightSqPos() < this.mSpriteSource.getSpriteRightSqPos()) {
            this.mInteractiveObject.incBoundXPos(deltaX);
        }
    }

    // -------------------------------- SUPPORT CHANGING SPRITE/IMAGE KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mOption = 2;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mOption = 1;
    }

    // -------------------------------- SUPPORT SPACE AND Q KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        if ((this.mInteractiveObject.getBoundTopSqPos() < this.mSpriteSource.getSpriteTopSqPos())
            && (this.mInteractiveObject.getBoundBotSqPos() > this.mSpriteSource.getSpriteBotSqPos())
            && (this.mInteractiveObject.getBoundLeftSqPos() > this.mSpriteSource.getSpriteLeftSqPos())
            && (this.mInteractiveObject.getBoundRightSqPos() <= this.mSpriteSource.getSpriteRightSqPos())) {
            this.mInteractiveObject.setBoundHeight(-deltaX);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
        if ((this.mInteractiveObject.getBoundTopSqPos() < this.mSpriteSource.getSpriteTopSqPos())
            && (this.mInteractiveObject.getBoundBotSqPos() > this.mSpriteSource.getSpriteBotSqPos())
            && (this.mInteractiveObject.getBoundLeftSqPos() > this.mSpriteSource.getSpriteLeftSqPos())
            && (this.mInteractiveObject.getBoundRightSqPos() <= this.mSpriteSource.getSpriteRightSqPos())) {
            this.mInteractiveObject.setBoundHeight(-deltaX);
        }
    }

    this._updateStatus(boundXForm.getXPos(), boundXForm.getYPos(), boundXForm.getWidth(), boundXForm.getHeight())

};


/**
 * Private Methods
 */
MainView.prototype._updateStatus = function (boundXPos, boundYPos, boundXSize, boundYSize) {
    this.mStatus.setText("Status: Bound Pos=(" + boundXPos + "  " + boundYPos
        + ") -- Size=(" + boundXSize + "  " + boundYSize + ")");
}