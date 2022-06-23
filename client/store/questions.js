/* Action Types */
const SET_BUDGET = 'SET_BUDGET';
const SET_PERSON = 'SET_PERSON';
const SET_CATEGORY = 'SET_CATEGORY'
const RESET_STATE = 'RESET_STATE';

export const setBudget = (budget) => {return { type: SET_BUDGET, budget }}
export const setPerson = (person) => {return { type: SET_PERSON, person}}
export const setCategory = (category) => {return { type: SET_CATEGORY, category}}
export const resetState = () => { return { type: RESET_STATE }}

const initialState = {
    budget: 30,
    person: [],
    category: []

}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET: 
      return {...state, budget: action.budget}
    case SET_PERSON: 
      return {...state, person: action.person}
    case SET_CATEGORY: 
      return {...state, category: action.category}
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}