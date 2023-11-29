import Phaser from "phaser";

export function preload (this: Phaser.Scene)
{
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

export function create (this: Phaser.Scene) 
{
  this.add.image(400, 300, 'sky');

  const emitter = this.add.particles(100, 300, 'flares', {
    frame: 'red',
    angle: { min: -30, max: 30 },
    speed: 150
  });

  var logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}