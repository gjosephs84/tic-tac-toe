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
    // State shows 1 or 0 or null, reflecting which player has played which space
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
  
  const [status, setStatus] = React.useState(null);
  const xo =["O", "X"];

  return (
    <button
      onClick={e => {
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
      }}
    >
      <h1 className={status == 0 ? "white" : "red"}>{xo[status]}</h1> </button>
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
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state); // state is array of 0 or 1 or null
    let nextPlayer = (player +1) % 2;
    setPlayer(nextPlayer);
    return thePlayer; // Returns the present player
  }
  function renderSquare(i) {
    //The {i}, etc, being passed into Square is props, and can be accessed
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
        <h1 className="status">{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
