const request = require('request');
const axios = require('axios');

const getPokemonNameCallback = function(pokeNumber, callback) {
  request.get(`http://pokeapi.co/api/v2/pokemon/${pokeNumber}`, function(error, response, body) {
    if (error) {
      callback(error, null);
    }
    var body = JSON.parse(body);
    callback(null, body.forms[0].name)
  });
}

const getPokemonNamePromise = function(pokeNumber) {
  return axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
  .then((response) => {
    return response.data.forms[0].name;
  });
}

/* 
Write a function that takes two pokenumbers (1-150)
and a callback and creates a stringified array of the format [{number, name}]
for example, for 11 and 1, it should create the following: 
"[{"number":11,"name":"metapod"},{"number":1,"name":"bulbasaur"}]"
*/

const getTwoPokemonNameCallback = (num1, num2, callback) => {
  let output = [];
  getPokemonNameCallback(num1, (error, name1) => {
    if (error) {
      // console.log(error);
      callback(error, null);
    } else {
      output.push({number: num1, name: name1});
      getPokemonNameCallback(num2, (error, name2) => {
        if (error) {
          // console.log(error);
          callback(error, null);
        } else {
          output.push({number: num2, name: name2});
          callback(err, output);
          // callback(err, JSON.stringify(output));
        }
      })
    }
  });
}

/* 
Write a function that takes two pokenumbers (1-150)
and returns a promise that resolves to a stringified array of the format 
[{number, name}] for example, for 11 and 1, it should create the following: 
"[{"number":11,"name":"metapod"},{"number":1,"name":"bulbasaur"}]"
*/

const getTwoPokemonNamePromise = (num1, num2) => {
  let output = [];
  return getTwoPokemonNamePromise(num1)
    .then(name1 => {
      output.push({'number': num1, 'name': name1});
      return getTwoPokemonNamePromise(num2);
    })
    .then(name2 => {
      output.push({'number': num2, 'name', name2});
      return output;
      // return JSON.stringify(output);
    });
}

module.exports = { getPokemonNameCallback, getPokemonNamePromise, getTwoPokemonNameCallback, getTwoPokemonNamePromise };