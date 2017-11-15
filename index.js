// write a function that takes two pokemon numbers
// gets their names from the pokemon api
// then saves them to the database

const pokeApi = require('./api');
const pokeDB = require('./database');

const getAndSaveTwoPokemonCallback = (num1, num2) => {
  pokeApi.getTwoPokemonNameCallback(num1, num2, (error, pokeArr) => {
  	if (error) {
  	  console.log(error);
  	} else {
  	  pokeDB.saveTwoPokemonCallback(pokeArr[0], pokeArr[1], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
  	  });
  	}
  })
}

const getAndSaveTwoPokemonPromise = (num1, num2) => {
  return pokeApi.getTwoPokemonNamePromise(num1, num2)
    .then(pokeArray => pokeDB.saveTwoPokemonPromise(pokeArray[0], pokeArray[1]))
    .catch(error => console.log(error));
}