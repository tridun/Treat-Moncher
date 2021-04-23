/**
 * Author: Tristan Dunlop
 * Project: Rocket Patrol Mod - TREAT MONCHER
 * Date: 4/23/2021
 * Estimated time to complete: 20+ hours
 */

// - Point Breakdown -
// Display the time remaining (in seconds) on the screen (10)
// Received help from Adrian Vasquez

// Implement parallax scrolling (10)
// field + sky tile sprites

// Implement a new timing/scoring mechanism that adds time to the clock
// for successful hits (20)
// Closest to farthest doggo awards 1, 2, and 3 additional seconds

// Redesign the game's artwork, UI, and sound to change its theme/aesthetic
// (to something other than sci-fi) (60)
// Changed it from sci-fi to throwing treats at dogs

// total points: 10 + 10 + 20 + 60 => 100

// I also randomized the firing sound so there's a 50% chance of it being
// "good girl!" or "good boy!"
// not a task but I think it is maybe worth (5) points

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ],
};

// main game object
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
