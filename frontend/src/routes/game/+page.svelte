<script lang='ts'>
  import { onMount } from 'svelte';

  let game: Phaser.Game;

  onMount(async () => {
    // Ensure this code runs only in the browser
    if (typeof window !== 'undefined') {
      // Dynamic import of Phaser
      const Phaser = await import('phaser');
      const { preload, create } = await import('../../../src/lib/game//logic/gameLogic');

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        // parent: "test",
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 }
          }
        },
        scale: {
            // Fit to window
            mode: Phaser.Scale.FIT,
            // Center vertically and horizontally
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
          preload: preload,
          create: create
        }
      };

      game = new Phaser.Game(config);
    }
  });
</script>
