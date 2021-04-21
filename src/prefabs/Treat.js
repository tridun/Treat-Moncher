// Treat prefab
class Treat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;    // track treats firing status
        this.moveSpeed = 2;   // measured in pixels per frame
        this.sfxGoodBoy = scene.sound.add('sfx_goodBoy'); // add treat sfx
        this.sfxGoodGirl = scene.sound.add('sfx_goodGirl'); // add treat sfx
        this.sfxFire = scene.sound.add('sfx_goodBoy');   // default
    }

    update() {
        // left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x <= game.config.width -
                borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // randomizer
        var rndDecimal = Math.random();
        if (rndDecimal < 0.5){
            this.sfxFire = this.sfxGoodBoy;
        } else {
            this.sfxFire = this.sfxGoodGirl;
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
          this.isFiring = true;
          this.sfxFire.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // resets treat to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
