/* Action Types */
const SET_BUDGET = 'SET_BUDGET';
const SET_PERSON = 'SET_PERSON';
const SET_CATEGORY = 'SET_CATEGORY'
const SET_CHARACTER = 'SET_CHARACTER';
const RESET_STATE = 'RESET_STATE';

export const setBudget = (budget) => {return { type: SET_BUDGET, budget }}
export const setPerson = (person) => {return { type: SET_PERSON, person}}
export const setCharacter = (character) => {return { type: SET_CHARACTER, character}}
export const setCategory = (category) => {return { type: SET_CATEGORY, category}}
export const resetState = () => { return { type: RESET_STATE }}

const initialState = {
    budget: 20,
    person: [
    'mom',
    'sibling',
    'coworker',
    'niece',
    'grandchild',
    'grandson',
    'dad',
    'parents',
    'grandma',
    'sister',
    'grandpa',
    'brother',
    'grandparent',
    'granddaughter',
    'partner',
    'couple',
    'cousin',
    'child',
    'son',
    'daughter',
    'client',
    'boss',
    'niece',
    'nephew',
    'aunt',
    'uncle'],
    character: [
      {id: 1, name: 'Fitness Enthusiast'},
      {id: 2, name: 'Artist'},
      {id: 3, name: 'Traveller'},
      {id: 4, name: 'Techie'},
      {id: 5, name: 'Foodie'},
      {id: 6, name: 'Influencer'},
      {id: 7, name: 'Spiritualist'},
      {id: 8, name: 'None'}
    ],
    category: []

}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET: 
      return {...state, budget: action.budget}
    case SET_PERSON: 
      return {...state, person: action.person}
    case SET_CHARACTER: 
      return {...state, character: action.character}
    case SET_CATEGORY: 
      return {...state, category: action.category}
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}