class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
      // load images/tile sprites
      this.load.image('treat', './assets/treat.png');
      this.load.image('doggo', '././assets/doggo.png');
      this.load.image('field', './assets/field.png');
      this.load.image('sky', './assets/sky.png');
      // load spritesheet
      this.load.spritesheet('woof', './assets/woof.png', {frameWidth:
        64, frameHeight: 32, startFrame: 0, endFrame: 19});
    }

    create() {
        // place sky sprite
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
        // place field sprite
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);
        // add treat (p1)
        this.p1Treat = new Treat(this, game.config.width/2, game.config.height - borderUISize -borderPadding, 'treat').setOrigin(0.5, 0);
        // add doggo (x3)
        this.doggo01 = new Doggo(this, game.config.width + borderUISize*6, borderUISize*4, 'doggo', 0, 30).setOrigin(0, 0);
        this.doggo02 = new Doggo(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'doggo', 0, 20).setOrigin(0,0);
        this.doggo03 = new Doggo(this, game.config.width, borderUISize*6 + borderPadding*4, 'doggo', 0, 10).setOrigin(0,0);



        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'bark',
            frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 19, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;


        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#AF76FF',
            color: '#FFFCF2',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5,
            },
            fixedWidth: 200
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding,
          borderUISize + borderPadding*2, "SCORE: "+ this.p1Score, scoreConfig);

        // display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#AF76FF',
            color: '#FFFCF2',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 200
        }

        this.timeTotal = game.settings.gameTimer / 1000;

        this.timeRight = this.add.text(borderUISize + borderPadding + 355,
          borderUISize + borderPadding*2, "TIME: " + this.timeTotal, timeConfig);

        this.timeLeft = game.settings.gameTimer;

        // GAME OVER flag
        this.gameOver = false;

        // countdown initialize
        this.timer = false;
        this.timePassed = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
    }

    update() {
        if(!this.gameOver && this.timer){
            this.timeTotal -= 1;
            this.timeRight.text = "TIME: " + this.timeTotal;
            this.timer = false;
        }else if(!this.timePassed){
            this.time.delayedCall(1000, () => {
                this.timePassed = false;
                this.timer = true;
            }, null, this);
            this.timePassed = true;
        }

        if(this.timeTotal == 0){
          // game over display
          let endConfig = {
              fontFamily: 'Courier',
              fontSize: '28px',
              backgroundColor: '#AF76FF',
              color: '#FFFCF2',
              align: 'center',
              padding: {
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
              },
              fixedWidth: 200
          }
          // when the clock hits 0
          endConfig.fixedWidth = 0;
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', endConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', endConfig).setOrigin(0.5);
          this.gameOver = true;
        }

        // check key input for restart
        if (this.gameOver) {
            if(Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }

        if (!this.gameOver) {
            this.field.tilePositionX -= 2;
            this.sky.tilePositionX -= 0.25;
            this.p1Treat.update();         // update treat sprite
            this.doggo01.update();           // update doggos (x3)
            this.doggo02.update();
            this.doggo03.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Treat, this.doggo03)) {
            this.p1Treat.reset();
            this.dogBark(this.doggo03);
            this.timeTotal += 2;
        }
        if (this.checkCollision(this.p1Treat, this.doggo02)) {
            this.p1Treat.reset();
            this.dogBark(this.doggo02);
            this.timeTotal += 3;
        }
        if (this.checkCollision(this.p1Treat, this.doggo01)) {
            this.p1Treat.reset();
            this.dogBark(this.doggo01);
            this.timeTotal += 4;
        }
    }

    checkCollision(treat, doggo) {
        // simple AABB checking
        if (treat.x < doggo.x + doggo.width &&
            treat.x + treat.width > doggo.x &&
            treat.y < doggo.y + doggo.height &&
            treat.height + treat.y > doggo. y) {
            return true;
        } else {
            return false;
        }
    }

    dogBark(doggo) {
        // temporarily hide doggo
        doggo.alpha = 0;
        // create woof sprite at doggo's position
        let boom = this.add.sprite(doggo.x, doggo.y, 'woof').setOrigin(0, 0);
        boom.anims.play('bark');             // play bark animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            doggo.reset();                       // reset doggo position
            doggo.alpha = 1;                     // make doggo visible again
            boom.destroy();                     // remove woof sprite
        });
        // score add and repaint
        this.p1Score += doggo.points;
        this.scoreLeft.text = "SCORE: "+ this.p1Score;
        // sound effect
        this.sound.play('sfx_fancyWoof');
    }
}
