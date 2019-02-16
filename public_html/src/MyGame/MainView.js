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
    this.mAnimationView = null;
    this.mZoomedView = null;

    // Support Objects: SpriteSource and InteractionBound
    this.mSpriteSource = null;
    this.mOption = 1; // this is for the sprite draw function (switching between different image/sprite)
    this.mInteractiveObject = null;
    this.mInteractiveObjArray = [];

    this.mStatus = null;

    this.mSAWidth = 204;
    this.mSAHeight = 164;
    this.mSATopPx = 350;
    this.mSALeftPx = 408;
    this.mNumElm = 3;
}
;
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
    // Main Camera
    this.mCamera = new Camera(
            vec2.fromValues(60, 40), // position of the camera
            150, // width of camera
            [260, 0, 600, 700]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // 2 Objects
    this.mSpriteSource = new SpriteSource();
    this.mSpriteSource.initialize();

    this.mInteractiveObject = new InteractiveObject();
    this.mInteractiveObject.initialize(1, null, null, null, null);

    // Difference views
    // Init Animation View
    this.mAnimationView = new AnimationView(this.mInteractiveObject);
    this.mZoomedView = new ZoomedView(this.mInteractiveObject);

    // Status Bar
    this.mStatus = new FontRenderable("");
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
    this.mInteractiveObject.draw(1, this.mCamera.getVPMatrix());
    // Draw the Animation Frame if any
    for (var i = 0; i < this.mInteractiveObjArray.length; i++) {
        console.log("interactive obj array", this.mInteractiveObjArray);
        this.mInteractiveObjArray[i].draw(2, this.mCamera.getVPMatrix());
    }
    // Draw status
    this.mStatus.draw(this.mCamera.getVPMatrix());

    this.mAnimationView.draw(this.mOption);
    var topCam = this.mZoomedView.drawTop();
    this.mSpriteSource.draw(this.mOption, topCam.getVPMatrix());
    this.mInteractiveObject.draw(1, topCam.getVPMatrix());

    var botCam = this.mZoomedView.drawBot();
    this.mSpriteSource.draw(this.mOption, botCam.getVPMatrix());
    this.mInteractiveObject.draw(1, botCam.getVPMatrix());

    var leftCam = this.mZoomedView.drawLeft();
    this.mSpriteSource.draw(this.mOption, leftCam.getVPMatrix());
    this.mInteractiveObject.draw(1, leftCam.getVPMatrix());

    var rightCam = this.mZoomedView.drawRight();
    this.mSpriteSource.draw(this.mOption, rightCam.getVPMatrix());
    this.mInteractiveObject.draw(1, rightCam.getVPMatrix());
};

MainView.prototype.update = function () {
    var deltaX = 0.5;
    var moveSprite = 3.3;
    var boundXForm = this.mInteractiveObject.getBoundXForm();
    var boundLeftSqPos = this.mInteractiveObject.getBoundLeftSqPos();
    var boundRightSqPos = this.mInteractiveObject.getBoundRightSqPos();
    var boundTopSqPos = this.mInteractiveObject.getBoundTopSqPos();
    var boundBotSqPos = this.mInteractiveObject.getBoundBotSqPos();
    var spriteLeftSqPos = this.mSpriteSource.getSpriteLeftSqPos();
    var spriteRightSqPos = this.mSpriteSource.getSpriteRightSqPos();
    var spriteTopSqPos = this.mSpriteSource.getSpriteTopSqPos();
    var spriteBotSqPos = this.mSpriteSource.getSpriteBotSqPos();


    // -------------------------------- SUPPORT ARROW KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if ((boundLeftSqPos >= spriteLeftSqPos)
                && (boundRightSqPos < spriteRightSqPos)) {
            this.mInteractiveObject.setBoundWidth(deltaX);
            this.mZoomedView.scaleCam(this.mInteractiveObject);

            this.mSAWidth += moveSprite;
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if ((boundTopSqPos <= spriteTopSqPos)
                && (boundBotSqPos > spriteBotSqPos)) {
            this.mInteractiveObject.setBoundHeight(deltaX);

            this.mSAHeight += moveSprite;
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if ((boundLeftSqPos > spriteLeftSqPos)
                && (boundRightSqPos <= spriteRightSqPos)) {
            this.mInteractiveObject.setBoundWidth(-deltaX);
            this.mZoomedView.scaleCam(this.mInteractiveObject);

            this.mSAWidth -= moveSprite;
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if ((boundTopSqPos < spriteTopSqPos)
                && (boundBotSqPos >= spriteBotSqPos)) {
            this.mInteractiveObject.setBoundHeight(-deltaX);

            this.mSAHeight -= moveSprite;
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    // -------------------------------- SUPPORT W-A-S-D KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if (boundTopSqPos < spriteTopSqPos) {
            this.mSATopPx += moveSprite;
            this.mInteractiveObject.incBoundYPos(deltaX);
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if (boundLeftSqPos > spriteLeftSqPos) {
            this.mSALeftPx -= moveSprite;
            this.mInteractiveObject.incBoundXPos(-deltaX);
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if (boundBotSqPos > spriteBotSqPos) {
            this.mSATopPx -= moveSprite;
            this.mInteractiveObject.incBoundYPos(-deltaX);
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (boundRightSqPos < spriteRightSqPos) {
            this.mSALeftPx += moveSprite;
            this.mInteractiveObject.incBoundXPos(deltaX);
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    // -------------------------------- SUPPORT CHANGING SPRITE/IMAGE KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mOption = 2;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mOption = 1;
    }

    // -------------------------------- SUPPORT SPACE, K AND Q KEYS -------------------------------------------------
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        if ((boundTopSqPos < spriteTopSqPos)
                && (boundBotSqPos > spriteBotSqPos)
                && (boundLeftSqPos > spriteLeftSqPos)
                && (boundRightSqPos <= spriteRightSqPos)) {
            this.mInteractiveObject.incBoundSize(deltaX * 10 / 100);

            this.mSAWidth += (moveSprite  * 10 / 100);
            this.mSAHeight += (moveSprite  * 10 / 100);
            this.mAnimationView.setSprSequence(this.mOption,
                    this.mSATopPx, this.mSALeftPx, // top of image, left of image (in PIXEL)
                    this.mSAWidth, this.mSAHeight, // width x height in pixels
                    this.mNumElm, // number of elements in this sequence
                    0);                   // horizontal padding in between
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        if ((boundTopSqPos < spriteTopSqPos)
                && (boundBotSqPos > spriteBotSqPos)
                && (boundLeftSqPos > spriteLeftSqPos)
                && (boundRightSqPos <= spriteRightSqPos)) {
            const interactiveObj = new InteractiveObject();
            interactiveObj.initialize(2, boundRightSqPos, boundXForm.getHeight(), boundXForm.getWidth(), boundXForm.getHeight());
            this.mInteractiveObjArray.push(interactiveObj);
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        if (this.mInteractiveObjArray.length > 0) {
            this.mInteractiveObjArray.splice(0, 1);
        }
    }

    this._updateStatus(boundXForm.getXPos(), boundXForm.getYPos(), boundXForm.getWidth(), boundXForm.getHeight())
    this.mAnimationView.updateAnimation(this.mOption);
    this.mZoomedView.updateCamPos(this.mInteractiveObject);
};


/**
 * Private Methods
 */
MainView.prototype._updateStatus = function (boundXPos, boundYPos, boundXSize, boundYSize) {
    this.mStatus.setText("Status: Bound Pos=(" + boundXPos + "  " + boundYPos
            + ") -- Size=(" + boundXSize + "  " + boundYSize + ")");
}