<script lang='ts'>
  let userName = '';
  let lobbyCode = '';
  let inputUserNameValue = ''; // local variable for the input field

  // Function to handle user form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    userName = inputUserNameValue; // Update userName when the form is submitted
    inputUserNameValue = ''
    console.log(`Creating user: ${userName}`);
    // Add Socket.IO or API call to create a user
  };

  const createLobby = () => {
    console.log('Creating new lobby...');
    // Add Socket.IO or API call to create a new lobby
  };

  const joinLobby = () => {
    console.log(`Joining lobby with code: ${lobbyCode}`);
    // Add Socket.IO or API call to join a lobby
  };
</script>

<main>
  <header>
    <h1>SUPER PONG</h1>
    <h2>Username: {userName}</h2>
    <form on:submit={handleSubmit} class="user-input-section">
      <input type="text" bind:value={inputUserNameValue} placeholder="Enter your name" />
      <button type="submit">Create User</button>   
    </form>
  </header>

  <section class="game-section">
    <!-- Create Lobby Section -->
    <div class="lobby-section">
      <h2>Create New Lobby</h2>
      <button class="create-lobby">Create Lobby</button>
    </div>

    <!-- Join Lobby Section -->
    <div class="lobby-section">
      <h2>Join Lobby</h2>
      <input type="text" placeholder="Enter lobby code" />
      <button class="join-lobby">Join Lobby</button>
    </div>
  </section>
</main>

<style>
  main {
    font-family: 'Arial', sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }

  header {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-input-section {
    display: flex;
    align-items: center;
  }

  .user-input-section button {
    color: #FFF;
    background-color: var(--tertiary-color);
  }


  .game-section {
    margin-top: 50px;
    animation: fadeIn 2s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lobby-section {
    margin: 20px;
  }

  input, button {
    margin: 5px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  input {
    background-color: #fff;
    color: #000;
  }

  button {
    color: var(--text-color);
    cursor: pointer;
  }

  .create-lobby {
    background-color: var(--primary-color);
  }

  .create-lobby:hover {
    background-color: var(--button-hover-color);
  }

  .join-lobby {
    background-color: var(--secondary-color);
  }

  .join-lobby:hover {
    background-color: var(--button-hover-color);
  }

  h1 {
    color: var(--primary-color);
    text-shadow: 2px 2px var(--secondary-color);
  }

  h2 {
    margin: 10px 0;
  }
</style>