const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomArrItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const onlyContainsSpaces = (string) => {
  let isOnlySpaces = true;

  for (let i = 0; i < string.length; i++) {
    if (string[i] != " ") {
      isOnlySpaces = false;
      break;
    }
  }

  return isOnlySpaces;
};

export { randomNum, randomArrItem, onlyContainsSpaces };
