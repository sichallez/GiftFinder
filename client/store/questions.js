import axios from "axios";

/* Action Types */
const SET_BUDGET = 'SET_BUDGET';
const SET_PERSON = 'SET_PERSON';
const SET_CATEGORY = 'SET_CATEGORY'
const SET_CHARACTER = 'SET_CHARACTER';
const RESET_STATE = 'RESET_STATE';

/* Action Creators */
const setBudget = (budget) => {return { type: SET_BUDGET, budget }}
const setPerson = (person) => {return { type: SET_PERSON, person }}
const setCategory = (category) => {return { type: SET_CATEGORY, category }}
const setCharacter = (character) => {return { type: SET_CHARACTER, character }}

// export const setCharacter = (character) => {
//   return {
//     type: actionTypes.SET_CHARACTER,
//     payload: { character },
//   };
// };

/* Thunks */
export const initialState = {
    budget: null,
    person: null,
    category: [],
    character: null
}

/* Flower Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET: 
      return action.budget
    case SET_PERSON: 
      return action.person
    case SET_CATEGORY: 
      return action.category
    case SET_CHARACTER: 
      return action.character
    default:
      return state;
  }
}
