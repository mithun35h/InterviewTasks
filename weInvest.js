function solution(A, N) {
  var result = [];
  var seatNumber = [];
  var totalW = 0;
  var totalA = 0;
  var totalM = 0;
  var dummyCounter = 0;
  var maxRows = 0;
  var totalColumns = 0;
  var totalColumnsArr = [];
  for (var i = 0; i < A.length; i++) {
    // console.log(A[i]);
    var lane = [];
    var rows = A[i][0];
    maxRows = maxRows >= rows
      ? maxRows
      : rows;
    var colums = A[i][1];
    totalColumns = totalColumns + colums;
    totalColumnsArr.push(totalColumns);
    // console.log(rows,colums);
    for (var x = 0; x < rows; x++) {
      lane[x] = [];
      for (var y = 0; y < colums; y++) {
        if (i == 0) {
          if (y == 0) {
            lane[x][y] = "w";
            totalW++;
          } else if (y == colums - 1) {
            lane[x][y] = "a";
            totalA++;
          } else {
            lane[x][y] = "m";
            totalM++;
          }
        } else if (i == A.length - 1) {
          if (y == colums - 1) {
            lane[x][y] = "w";
            totalW++;
          } else if (y == 0) {
            lane[x][y] = "a";
            totalA++;
          } else {
            lane[x][y] = "m";
            totalM++;
          }
        } else if (i != 0 && i != A.length - 1) {
          if (y == colums - 1) {
            lane[x][y] = "a";
            totalA++;
          } else if (y == 0) {
            lane[x][y] = "a";
            totalA++;
          } else {
            lane[x][y] = "m";
            totalM++;
          }
        } else {
          lane[x][y] = "m";
          totalM++;
        }
      }
    }
    // console.log(lane);
    result[i] = lane;
  }
  console.log(result);
  // console.log(totalW, totalA, totalM);
  // console.log(maxRows, totalColumns, totalColumnsArr);

  var seatNumber = mergeLanes(maxRows, totalColumns, totalColumnsArr, result);

  seatNumber = assignSeats(seatNumber, 'a', 0, N);
  seatNumber = assignSeats(seatNumber, 'w', totalA, N);
  seatNumber = assignSeats(seatNumber, 'm', totalA + totalW, N);

  var seatNumber = deMergeLanes(maxRows, totalColumns, totalColumnsArr, result, seatNumber);

  // console.log(result);
  if(N > totalW + totalA + totalM){
    console.error("Seats to be allocated are more than available Seats");
  }



  return result;
}
function indexBreak(A, V) {
  for (var i = 0; i < A.length; i++) {
    if (A[i] > V) {
      return i;
    }
  }
}
function colorSeart(i, x, y, totalW, totalA, totalM, A, lane, colums) {
  // console.log("Lane: ", i, "Row: ", x, "Column: ", y, "maxRows:", maxRows, "colums:", totalColumns);
  if (i == 0) {
    if (y == 0) {
      lane[x][y] = "w";
      totalW++;
    } else if (y == colums - 1) {
      lane[x][y] = "a";
      totalA++;
    } else {
      lane[x][y] = "m";
      totalM++;
    }
  } else if (i == A.length - 1) {
    if (y == colums - 1) {
      lane[x][y] = "w";
      totalW++;
    } else if (y == 0) {
      lane[x][y] = "a";
      totalA++;
    } else {
      lane[x][y] = "m";
      totalM++;
    }
  } else if (i != 0 && i != A.length - 1) {
    if (y == colums - 1) {
      lane[x][y] = "a";
      totalA++;
    } else if (y == 0) {
      lane[x][y] = "a";
      totalA++;
    } else {
      lane[x][y] = "m";
      totalM++;
    }
  } else {
    lane[x][y] = "m";
    totalM++;
  }
  return lane;
}
function deMergeLanes(maxRows, totalColumns, totalColumnsArr, result, seatNumber) {
  for (var m = 0; m < maxRows; m++) {
    for (var n = 0; n < totalColumns; n++) {
      var tmpLane = indexBreak(totalColumnsArr, n);
      // console.log(totalColumnsArr,n);
      var remvN = n - totalColumnsArr[tmpLane - 1];
      if (isNaN(remvN)) {
        remvN = n;
      }
      // console.log(m, n, tmpLane, remvN);
      if (typeof result[tmpLane][m] != 'undefined') {
        if (typeof result[tmpLane][m][remvN] != 'undefined') {
          result[tmpLane][m][remvN] = seatNumber[m][n];
        }
      }
    }
  }
  // console.log(result);
  return result;
}
function mergeLanes(maxRows, totalColumns, totalColumnsArr, result) {
  var seatNumber = [];
  for (var m = 0; m < maxRows; m++) {
    seatNumber[m] = [];
    for (var n = 0; n < totalColumns; n++) {
      var tmpLane = indexBreak(totalColumnsArr, n);
      var remvN = n - totalColumnsArr[tmpLane - 1];
      if (isNaN(remvN)) {
        remvN = n;
      }
      // console.log(m, n, tmpLane, remvN);
      seatNumber[m][n] = 'e';
      if (typeof result[tmpLane][m] != 'undefined') {
        if (typeof result[tmpLane][m][remvN] != 'undefined') {
          seatNumber[m][n] = result[tmpLane][m][remvN];
        }
      }
    }
  }
  return seatNumber;
}
function assignSeats(seats, seatType, allocatedSeats, max) {
  var seatCounter = allocatedSeats;
  for (var i = 0; i < seats.length; i++) {
    for (var j = 0; j < seats[i].length; j++) {
      if (seats[i][j] === seatType) {
        if (seatCounter >= max) {
          return seats;
        }
        seats[i][j] = ++seatCounter + seats[i][j];
      }
    }
  }
  return seats;
}


console.log(solution([[2, 3],[3, 4],[3, 2],[4, 3]], 30));
console.log(solution([[3, 4],[4, 5],[2, 3],[3, 4]], 28));
console.log(solution([[3,4]],20));
var test1 = indexBreak([ 3, 7, 9, 12 ], 8);
if(test1 != 2){
  console.error("Error in testing1",test1);
}
var test2 = indexBreak([ 4, 9, 12, 16 ], 13);
if(test2 != 2){
  console.error("Error in testing2",test2);
}
var test3 = indexBreak([4], 2);
if(test3 != 2){
  console.error("Error in testing3",test3);
}
