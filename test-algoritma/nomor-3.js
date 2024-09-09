// Nomor 3
const occuranceFromArray = (input, query) => {
  const occurance = query.map((queryEntry) => {
    let count = 0;
    input.forEach((inputEntry) => {
      if (inputEntry === queryEntry) count++;
    });
    return count;
  });
  return occurance;
};
const query = ["bbb", "ac", "dz"];
const input = ["xc", "dz", "bbb", "dz"];
console.log(occuranceFromArray(input, query));
