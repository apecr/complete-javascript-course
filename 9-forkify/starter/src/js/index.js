// Global app controller
//4123db471815928653437ec47bf2744b
//https://www.food2fork.com/api/search
import axios from 'axios';

const key = '4123db471815928653437ec47bf2744b';

const getResults = async query => {
  try {
    const response = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    console.log(response);
  } catch (e) {
    console.log(e);
  }

};

getResults('galician');