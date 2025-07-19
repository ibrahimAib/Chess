let chess = [
  {
    1: "b-rook",
    2: "b-knight",
    3: "b-Bishop",
    4: "b-queen",
    5: "b-king",
    6: "b-bishop",
    7: "b-knight",
    8: "b-rook",
  },
  {
    1: "b-pawn",
    2: "b-pawn",
    3: "b-pawn",
    4: "b-pawn",
    5: "b-pawn",
    6: "b-pawn",
    7: "b-pawn",
    8: "b-pawn",
  },
  { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  },
  { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  {
    1: "w-pawn",
    2: "w-pawn",
    3: "w-pawn",
    4: "w-pawn",
    5: "w-pawn",
    6: "w-pawn",
    7: "w-pawn",
    8: "w-pawn",
  },
  {
    1: "w-rook",
    2: "w-knight",
    3: "w-Bishop",
    4: "w-queen",
    5: "w-king",
    6: "w-bishop",
    7: "w-knight",
    8: "w-rook",
  },
];
let turn = "w";
let isMovingBack = (a, b) => a < b;
if (turn == "w") {
  isMovingBack = (a, b) => a > b;
} else {
  isMovingBack = (a, b) => a < b;
}
function rotate() {
  window.onload = function () {
    document.getElementById("board").classList.add("flipped");
    let squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.add("image-flipped");
    }
  };
}
// rotate();
let clicked_piece = null;
let row_start = 0;
let col_start = 0;
render();
function render() {
  document.getElementById("board").innerHTML = "";

  for (let row = 0; row < chess.length; row++) {
    let color = row;
    for (let col = 1; col < 9; col++) {
      color++;
      row_start_local = row;
      col_start_local = col;

      var square = chess[row][col] == null ? "" : chess[row][col];
      var board = document.getElementById("board");

      board.innerHTML += `<div id="${col_start_local},${row_start_local}" onClick="handelClick('${square}',${col_start_local},${row_start_local})" 
        class="square ${square == "" ? "" : "filled"}
        ${color % 2 === 0 ? "dark" : "light"}
        ">
        
        ${square == "" ? "" : `<img  src="/imges/${square}.png" alt="">`}
      </div>`;
    }
  }
}

{
  /* <div id="3,7" onclick="handelClick('w-Bishop',3,7)" class="square filled"></div> */
}
function handelClick(square, col, row) {
  if (square != "") {
    if (square[0] == turn) {
      row_start = row;
      col_start = col;
    }

    if (turn == square[0]) {
      clicked_piece = square;
    }
  }
  switch (clicked_piece) {
    case "w-pawn":
      handel_Wpawn(row_start, col_start, clicked_piece, square, col, row);
      break;

    case "b-pawn":
      handel_Wpawn(row_start, col_start, clicked_piece, square, col, row);
      break;

    case "w-rook":
      handel_rook(row_start, col_start, clicked_piece, square, col, row);
      break;

    case "b-rook":
      handel_rook(row_start, col_start, clicked_piece, square, col, row);
      break;

    case "w-knight":
      handel_knight(row_start, col_start, clicked_piece, square, col, row);
      break;

    case "b-knight":
      handel_knight(row_start, col_start, clicked_piece, square, col, row);
      break;

    default:
      break;
  }

  // render();
}

function handel_knight(row_start, col_start, clicked_piece, square, col, row) {
  let isInRightSquare =
    (col == col_start + 2 && row == row_start + 1) ||
    (col == col_start - 2 && row == row_start + 1) ||
    (col == col_start + 2 && row == row_start - 1) ||
    (col == col_start - 2 && row == row_start - 1) ||
    (col == col_start + 1 && row == row_start + 2) ||
    (col == col_start - 1 && row == row_start + 2) ||
    (col == col_start + 1 && row == row_start - 2) ||
    (col == col_start - 1 && row == row_start - 2);
  let isMyPiece = square == "" || square[0] == turn;
  if (!isInRightSquare) {
    if (isMyPiece) {
      return;
    }
  }
  // اذا تلاقت قطعتين
  if (square != "") {
    if (square[0] == turn) {
      return;
    }
    if (!isInRightSquare) {
      return;
    }
  }

  move_pieces(row_start, col_start, clicked_piece, square, col, row);
}

function handel_Wpawn(row_start, col_start, clicked_piece, square, col, row) {
  let isInRightCol = col_start != col;
  let isInRightPotentialTake;
  let isMyPiece = square == "" || square[0] == turn;

  // اذا تلاقت قطعتين
  if (square != "") {
    if (square[0] == turn) {
      return;
    }
    if (col == col_start) {
      return;
    }
  }

  // ايقاف الجندي من الرجوع
  if (isMovingBack(row, row_start)) {
    return;
  }

  if (chess[row_start][col_start][0] == "w") {
    isInRightPotentialTake =
      col == col_start + 1 || (col == col_start - 1) & (row_start - 1 == row);
    // row_start - row == عدد المربعات اللي لعبها اللاعب
    if (row_start - row > 1) {
      if (row_start == 6) {
        if (row_start - row > 2) {
          return;
        }
      } else {
        return;
      }
    }
  } else {
    // console.log(`row_start ${row_start}`)
    // console.log(`row ${row}`)
    // console.log(col == col_start - 1);
    // console.log(row);
    // row_start - row == عدد المربعات اللي لعبها اللاعب
    isInRightPotentialTake =
      (col == col_start - 1) & (row == row_start + 1) ||
      (col == col_start + 1) & (row == row_start + 1);
    console.log(`isInRightPotentialTake : ${isInRightPotentialTake}`);

    if (row - row_start > 1) {
      if (row_start == 1) {
        if (row - row_start > 2) {
          return;
        }
      } else {
        return;
      }
    }
  }

  if (isInRightCol) {
    if (isInRightPotentialTake) {
      if (isMyPiece) {
        return;
      }
    } else {
      return;
    }
  }

  move_pieces(row_start, col_start, clicked_piece, square, col, row);
}

function handel_rook(row_start, col_start, clicked_piece, square, col, row) {
  let isInRightCol = col_start == col || row_start == row;

  let isMyPiece = square == "" || square[0] == turn;
  if (!isInRightCol) {
    return;
  }

  if (row < row_start) {
    for (i = row_start - 1; i > row; i--) {
      if (chess[i][col] != "") {
        return;
      }
    }
  }
  if (row > row_start) {
    for (i = row_start + 1; i < row; i++) {
      if (chess[i][col] != "") {
        return;
      }
    }
  }

  if (col > col_start) {
    for (i = col_start + 1; i < col; i++) {
      if (chess[row][i] != "") {
        return;
      }
    }
  }
  if (col < col_start) {
    for (i = col_start - 1; i > col; i--) {
      if (chess[row][i] != "") {
        return;
      }
    }
  }

  if (square != "") {
    if (isMyPiece) {
      return;
    }
  }

  move_pieces(row_start, col_start, clicked_piece, square, col, row);
}

function move_pieces(
  row_start,
  col_start,
  clicked_piece_local,
  square,
  col,
  row
) {
  if (square == "" || square[0] != clicked_piece_local[0]) {
    chess[row][col] = clicked_piece_local;
    chess[row_start][col_start] = "";
    clicked_piece = null;
    document.getElementById(
      `${col},${row}`
    ).innerHTML = `<img src="/imges/${clicked_piece_local}.png" alt="">`;
    document.getElementById(`${col},${row}`).classList.add("filled");
    document
      .getElementById(`${col},${row}`)
      .setAttribute(
        "onclick",
        `handelClick("${clicked_piece_local}", ${col}, ${row})`
      );
    document.getElementById(`${col_start},${row_start}`).innerHTML = "";

    document
      .getElementById(`${col_start},${row_start}`)
      .classList.remove("filled");
    document
      .getElementById(`${col_start},${row_start}`)
      .setAttribute("onclick", `handelClick("", ${col_start}, ${row_start})`);
  }
  if (turn == "w") {
    isMovingBack = (a, b) => a < b;
    turn = "b";
  } else {
    isMovingBack = (a, b) => a > b;
    turn = "w";
  }
}
