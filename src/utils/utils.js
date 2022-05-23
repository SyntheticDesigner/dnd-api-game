const fetchJSON = async (url) => {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
  return response;
};

export const getData = (append) => {
  return fetchJSON(
    append ? `https://www.dnd5eapi.co${append}` : "https://www.dnd5eapi.co/api"
  );
};

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const rollDice = (diceString) => {
  // const regex = new RegExp(/d/);
  const regex = new RegExp(
    /^(\d|\d{2}|\d{3})+d+((\d|\d{2}|\d{3})|(\d|\d{2}|\d{3})+(\+|-)+(\d|\d{2}|\d{3}))/
  );
  //checking to make sure the correct string format is passed into the function (### d ### +/- ###)
  let formula = {
    numberOfDice: 0,
    die: 0,
    add: 0,
    subtract: 0,
  };

  if (regex.test(diceString)) {
    let dienum = diceString.split("d");
    let _string = dienum.pop();
    formula.numberOfDice = parseInt(dienum[0]);
    //extract the set of numbers before d
    if (_string.includes("+")) {
      let _die = _string.split("+");
      formula.die = parseInt(_die[0]);
      formula.add = parseInt(_die.pop());
      //extract numbers before and after a plus sign
    } else if (_string.includes("-")) {
      let _die = _string.split("-");
      formula.die = parseInt(_die[0]);
      formula.subtract = parseInt(_die.pop());
      //extract numbers before and after a minus sign
    } else {
      formula.die = parseInt(_string);
    }
    let rollTotal =
      formula.numberOfDice * randomNumber(1, formula.die) +
      formula.add -
      formula.subtract;
    return rollTotal;
  }else if(diceString == 1){
    return 1;
  } else {
    alert("Check the Dice String");
  }
};
