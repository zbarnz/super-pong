<script lang="ts">
    import { onMount } from "svelte";
  
    let canvasDimensions = { height: 600, width: 800 };
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
  
    const paddleWidth = 10;
    const paddleHeight = 60;
  
  
    let leftPaddleY = (canvasDimensions.height - paddleHeight) / 2;
    let rightPaddleY = (canvasDimensions.height - paddleHeight) / 2;
  
    // Ball
    let ball = {
      x: canvasDimensions.width / 2,
      y: canvasDimensions.height / 2,
      speedX: 3,
      speedY: 3,
      radius: 10,
    };
  
    function draw() {
      // Draw the canvas
      context.fillStyle = "green";
      context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
  
      // Draw left paddle
      context.fillStyle = "white";
      context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  
      // Draw right paddle
      context.fillRect(
        canvasDimensions.width - paddleWidth,
        rightPaddleY,
        paddleWidth,
        paddleHeight,
      );
  
      // Draw the ball
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill();
      context.closePath();
  
      // Move the ball
      ball.x += ball.speedX;
      ball.y += ball.speedY;
  
      // Bounce off the top and bottom walls
      if (
        ball.y - ball.radius < 0 ||
        ball.y + ball.radius > canvasDimensions.height
      ) {
        
        // Calculate the angle using atan2
        const angle = Math.atan2(ball.speedY, ball.speedX);

        // The resulting angle is between -π and π
        // Convert it to a positive angle between 0 and 2π for consistency
        const wallBounceAngle = angle < 0 ? 2 * Math.PI + angle : angle;

        const speedMagnitude = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);

        // Calculate the new x and y components based on the angle
        const newSpeedX = speedMagnitude * Math.cos(wallBounceAngle);
        const newSpeedY = speedMagnitude * Math.sin(wallBounceAngle);

        // Update the ball's speed
        ball.speedX = newSpeedX;
        ball.speedY = -newSpeedY;
      }
  
      // Bounce off the paddles
      if (
        (ball.x - ball.radius < paddleWidth &&
          ball.y > leftPaddleY &&
          ball.y < leftPaddleY + paddleHeight))
          {
        // Adjust the ball's angle based on where it hits the paddle
        const deltaY = ball.y - (leftPaddleY + paddleHeight / 2);
        const normalizedDeltaY = deltaY / (paddleHeight / 2);

        // Set the new angle (modify as needed)
        const maxBounceAngle = Math.PI / 4; // Maximum bounce angle in radians
        const bounceAngle = normalizedDeltaY * maxBounceAngle;

        // Update the ball's speed and direction
        const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
        const newSpeedX = speed * Math.cos(bounceAngle);
        const newSpeedY = speed * Math.sin(bounceAngle);

        ball.speedX = newSpeedX;
        ball.speedY = newSpeedY;
      } 
      else if(
        (ball.x + ball.radius > canvasDimensions.width - paddleWidth &&
          ball.y > rightPaddleY &&
          ball.y < rightPaddleY + paddleHeight)
      ){
        // Adjust the ball's angle based on where it hits the paddle
        const deltaY = ball.y - (rightPaddleY + paddleHeight / 2);
        const normalizedDeltaY = deltaY / (paddleHeight / 2);

        // Set the new angle (modify as needed)
        const maxBounceAngle = Math.PI / 4; // Maximum bounce angle in radians
        const bounceAngle = normalizedDeltaY * maxBounceAngle;

        // Update the ball's speed and direction
        const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
        const newSpeedX = speed * Math.cos(bounceAngle);
        const newSpeedY = speed * Math.sin(bounceAngle);

        ball.speedX = -newSpeedX;
        ball.speedY = newSpeedY;
      } 
  
      // Reset ball if it goes out of bounds
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvasDimensions.width) {
        ball.x = canvasDimensions.width / 2;
        ball.y = canvasDimensions.height / 2;
      }
  
      // Move right paddle based on ball position
      if (rightPaddleY + paddleHeight / 2 < ball.y - ball.radius) {
        rightPaddleY += 5;
      } else if (rightPaddleY + paddleHeight / 2 > ball.y + ball.radius) {
        rightPaddleY -= 5;
      }
  
      requestAnimationFrame(draw);
    }
  
    onMount(() => {
      canvas = document.querySelector("canvas")!;
      context = canvas.getContext("2d")!;
      draw();
  
      document.addEventListener("keydown", (event) => {
        // Move left paddle
        if (event.key === 'ArrowUp' && leftPaddleY > 0) {
        leftPaddleY -= 20;
      } else if (event.key === 'ArrowDown' && leftPaddleY + paddleHeight < canvas.height) {
        leftPaddleY += 20;
      }
      });
  
      document.addEventListener("mousemove", (event) => {
        // Update leftPaddleY based on mouse position
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;
        leftPaddleY = mouseY - paddleHeight / 2;
  
        // Ensure the paddle stays within the canvas bounds
        if (leftPaddleY < 0) {
          leftPaddleY = 0;
        } else if (leftPaddleY + paddleHeight > canvasDimensions.height) {
          leftPaddleY = canvasDimensions.height - paddleHeight;
        }
      });
    });
  </script>
  
  <canvas
    bind:this={canvas}
    width={canvasDimensions.width}
    height={canvasDimensions.height}
  ></canvas>
  
  <style>
    canvas {
      display: block;
      margin: auto;
      background-color: black;
    }
  </style>
  