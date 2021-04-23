class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/whistle.wav');
        this.load.audio('sfx_fancyWoof', './assets/fancyWoof.mp3');
        this.load.audio('sfx_goodBoy', './assets/goodBoyAudio.mp3');
        this.load.audio('sfx_goodGirl', './assets/goodGirlAudio.mp3');
        this.load.image('field', './assets/field.png');
        this.load.image('sky', './assets/sky.png');
    }

    create() {
        // place sky sprite
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
        // place field sprite
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);
        // menu text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#AF76FF',
            color: '#FFFCF2',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 3,
                right: 3,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize
          - borderPadding, 'TREAT MONCHER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2,
          'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFAD8F';
        menuConfig.color = '#FFFCF2';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize
          + borderPadding, 'Press ← for Novice or → for Expert',
          menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                doggoSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                doggoSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
