const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/poke');

var pokeSchema = mongoose.Schema({
  name: String,
  number: Number
});

var Pokemon = mongoose.model('Pokemon', pokeSchema);

/*
Write a function called saveOnePokemon, that takes an object
representing a pokemon and it to the database.
*/

const saveOnePokemonCallback = (pokeObj, callback) => {
  let pokeDoc = new Pokemon(pokeObj);
  Pokemon.save(pokeDoc, (error, results) => {
  	if (error) {
  	  callback(error);
  	} else {
  	  callback(results);
  	}
  });
}

const saveOnePokemonPromise = (pokeObj) => {
  let pokeDoc = new Pokemon(pokeObj);
  return Pokemon.save(pokeDoc)
    .then(results => results)
    .catch(error => console.log(error));
}

/*
Write a function called saveTwoPokemon, that takes two objects
representing pokemon and saves them to the database.
*/

const saveTwoPokemonCallback = (pokeObj1, pokeObj2, callback) => {
  saveOnePokemonCallback(pokeObj1, (error, results) => {
  	if (error) {
  	  callback(error, null);
  	} else {
  	  saveOnePokemonCallback(pokeObj2, (error, results) => {
  	    if (error) {
  	      callback(error, null);
  	    } else {
  	      callback(null, results);
  	    }
  	  });
  	}
  });
}

const saveTwoPokemonPromise = (pokeObj1, pokeObj2) => {
  return saveOnePokemonPromise(pokeObj1)
    .then(results => saveTwoPokemonPromise(pokeObj2))
    .catch(error => console.log(error));
}

module.exports = { saveOnePokemonCallback, saveOnePokemonPromise, saveTwoPokemonCallback, saveTwoPokemonPromise };