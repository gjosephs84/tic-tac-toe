//A function to check for a winner
function checkWinner(state) {

  const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [0,4,8],
    [2,4,6]
  ];

  for (let i=0; i<win.length; i++) {
    const [a, b, c] = win[i];
    console.log(`State is ${state[a]} ${state[b]} ${state[c]}`);
    if ((state[a] == state[b] && state[a] == state[c]) && state[a] != null) {
    console.log("Winner found");
    return state[a];
    }
  }
  return null;
}

const Square = ( {id, player, newState} ) => {
  /*
  The id above is part of the props being passed in, but is extracted by being included in the curly braces. The function could also be written as:

    const Square = (props) => {
      return (
        <button><h1>{props.id}</h1></button>
      )
    }
  */
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const xo =["O", "X"];
  const palet = ["red","blue","green"];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];

  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });
  return (
    <button
      onClick={e => {
        let col = getRandomColor();
        setColor(col);
        // Creating an object to pass into setState through the newSate function
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        e.target.style.background = col;
      }}
    >
      <h1>{xo[status]}</h1> </button>
  )
}

const Board = () => {
  
  
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null)); // This is the total state. Initialized with an array of 9 nulls
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner !=null) status = `Player ${winner} wins`

  //This function updates the total state
  const newState = idOfSquare => {
    // Here we set the state by spreading current state and adding the new object ... see Square above for details
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state); // state is array of 0 or 1 or null
    let nextPlayer = (player +1) % 2;
    setPlayer(nextPlayer);
    return thePlayer; // Returns the present player
  }
  function renderSquare(i) {
    //The {i} being passed into Square is props, and can be accessed
    //as props.id inside the Square function
    return <Square id={i} player={player} newState={newState}> </Square>;
  }
  return (
    <div
      className="game-board"
      onClick={(e) => {
        setPlayer((player + 1) % 2); // Using the modulo, always get 1 or 0
      }}
    >
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
