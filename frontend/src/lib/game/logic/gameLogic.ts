//import Phaser from "phaser";
import space from "../assets/space.png"

export function preload (this: Phaser.Scene)
{
    //this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', space);
    this.load.image('red', 'https://labs.phaser.ioassets/particles/red.png');
}

export function create (this: Phaser.Scene) 
{
  let circle = this.add.circle(100,100,20, 0x6666ff)


  const sky = this.add.image(800, 400, 'sky');

  sky.setScale(.85, .65)

  const emitter = this.add.particles(100, 300, 'flares', {
    frame: 'red',
    angle: { min: -30, max: 30 },
    speed: 150
  });

  this.add.existing(circle);
  var logo = this.physics.add.existing(circle)

  circle.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}