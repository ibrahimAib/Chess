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
  { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
  { 1: "", 2: "b-pawn", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" },
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
let clicked_piece = null;
let row_start = 0;
let col_start = 0;
let turn = "w";
render();
function render() {
  document.getElementById("board").innerHTML = "";

  for (let row = 0; row < chess.length; row++) {
    for (let col = 1; col < 9; col++) {
      row_start_local = row;
      col_start_local = col;

      var square = chess[row][col] == null ? "" : chess[row][col];
      var board = document.getElementById("board");

      board.innerHTML += `<div onClick="handelClick('${square}',${col_start_local},${row_start_local})" class="square ${
        square == "" ? "" : "filled"
      }">${
        square == "" ? "" : `<img src="/imges/${square}.png" alt="">`
      }</div>`;
    }
  }
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

    default:
      break;
  }

  render();
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
  }
}
function handel_Wpawn(row_start, col_start, clicked_piece, square, col, row) {
  let isInRightCol = col_start != col;
  let isInRightPotentialTake =
    col == col_start + 1 || (col == col_start - 1) & (row_start - 1 == row);
  let isMyPiece = square == "" || square[0] == turn;
  if (isInRightCol) {
    if (isInRightPotentialTake) {
      if (isMyPiece) {
        return;
      }
    }
  }
  // اذا تلاقت قطعتين
  if (square != "") {
    if (square[0] == turn) {
      return;
    }
    if (col == col_start) {
      return;
    }
  }
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

  move_pieces(row_start, col_start, clicked_piece, square, col, row);
}
