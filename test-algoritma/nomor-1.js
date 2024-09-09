// Nomor 1
const reverseStringNumberStay = (str) => {
  const reversedStr = str
    .split("")
    .filter((char) => !Number.isInteger(Number(char)))
    .reverse()
    .join("");
  const numberInString = str
    .split("")
    .filter((char) => Number.isInteger(Number(char)))
    .join("");
  return reversedStr + numberInString;
};
const stringToReverse = "eigen1";
console.log(reverseStringNumberStay(stringToReverse));
