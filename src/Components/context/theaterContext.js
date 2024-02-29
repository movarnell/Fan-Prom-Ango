import { createContext } from "react";

/*
This example allows you to pass function, values, 
or other data types and use those values in other components
Allows you to create a new Context for the addRecipeToList function
*/

// Create a new Context for recipes
export const TheaterContext = createContext({
  // Define the default values for the context
  movies: [],
  setMovies: () => {}, 
  // A boolean value, could represent a state like 'isLoading'
  isLoading: false,

  // An array of objects, could be used to store a list of recipes
  recipes: [],

  // A string value, could be used for various purposes like a status message
  statusMessage: "",

  // A function, as previously defined
  addRecipeToList: () => {},

  // You can add as many different types of data as needed for your application
  // Just remember to provide meaningful default values
});
