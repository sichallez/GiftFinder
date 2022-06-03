import axios from "axios";

/* Action Types */
const SET_BUDGET = 'SET_BUDGET';
const SET_PERSON = 'SET_PERSON';
const SET_CATEGORY = 'SET_CATEGORY'
const SET_CHARACTER = 'SET_CHARACTER';
const RESET_STATE = 'RESET_STATE';

const setBudget = (budget) => {return { type: SET_BUDGET, budget }}
const setPerson = (person) => {return { type: SET_PERSON, person }}
const setCategory = (category) => {return { type: SET_CATEGORY, category }}
const setCharacter = (character) => {return { type: SET_CHARACTER, character }}
const resetState = () => { return { type: RESET_STATE }}

export const initialState = {
    budget: null,
    person: null,
    category: [],
    character: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET: 
      return [...state, budget]
    case SET_PERSON: 
      return [...state, action.person]
    case SET_CATEGORY: 
      return [...state, action.category]
    case SET_CHARACTER: 
      return [...state, action.character]
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}
