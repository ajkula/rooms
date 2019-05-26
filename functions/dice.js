
const diceRolls = (num = 1) => {
  if(num <= 1) return (Math.floor(Math.random() * 6)) + 1;
  if(num > 1) {
    let result = 0;
    for(let i = 1; i <= num; i++) {
      let rand = (Math.floor(Math.random() * 6)) + 1;
      result += rand
      console.log("jet:", rand)
    }
    return result;
  }
}

const range = (num = 1) => {
  if(num <= 1) return (Math.floor(Math.random() * 6)) + 1;
  if(num > 1) {
    return (Math.floor(Math.random() * num)) + 1;
  }
}

module.exports = { diceRolls, range };