/* Action Types */
const SET_BUDGET = 'SET_BUDGET';
const SET_PERSON = 'SET_PERSON';
const SET_CATEGORY = 'SET_CATEGORY'
const SET_CHARACTER = 'SET_CHARACTER';
const RESET_STATE = 'RESET_STATE';

export const setBudget = (budget) => {return { type: SET_BUDGET, budget }}
export const setPerson = (person) => {return { type: SET_PERSON, person}}
export const setCategory = (category) => {return { type: SET_CATEGORY, category}}
export const setCharacter = (character) => {return { type: SET_CHARACTER, character}}
export const resetState = () => { return { type: RESET_STATE }}

const initialState = {
    budget: 20,
    person: ['sister',
    'brother',
    'sibiling',
    'mom',
    'dad',
    'parent',
    'grandma',
    'grandpa',
    'grandparent',
    'grandson',
    'granddaughter',
    'grandchild',
    'partner',
    'couple',
    'cousin',
    'coworker',
    'child',
    'son',
    'daughter',
    'client',
    'coworker',
    'boss',
    'niece',
    'nephew',
    'aunt',
    'uncle'],
    category: [],
    character: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET: 
      return {...state, budget: action.budget}
    case SET_PERSON: 
      return {...state, person: action.person}
    case SET_CATEGORY: 
      return {...state, category: action.category}
    case SET_CHARACTER: 
      return {...state, character: action.character}
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}