// Nomor 4
const rightAndLeftDiagonalSubstraction = (matrix) => {
  let rightDiagonal = 0;
  let leftDiagonal = 0;
  for (let i = 0; i < matrix.length; i++) {
    rightDiagonal += matrix[i][i];
    leftDiagonal += matrix[i][matrix.length - 1 - i];
  }
  return rightDiagonal - leftDiagonal;
};
const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(rightAndLeftDiagonalSubstraction(Matrix));
