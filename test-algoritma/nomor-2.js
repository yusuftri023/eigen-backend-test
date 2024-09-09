// Nomor 2
const longestWord = (str) => {
  const words = str.split(" ");
  let longestStr = "";
  words.forEach((word) => {
    if (word.length > longestStr.length) {
      longestStr = word;
    }
  });
  return `${longestStr}: ${longestStr.length} character`;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longestWord(sentence));
