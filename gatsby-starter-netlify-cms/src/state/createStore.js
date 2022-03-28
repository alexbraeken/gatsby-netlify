import { createStore } from 'redux';

function reducer(state, action) {
  let newObj = state.properties
  let featuredProps = state.featuredProps
  let city = state.city
  let propType = state.propType
    if(action.type === `ADD_PROPERTY`) {
      if(!newObj[action.propId]){
        newObj[action.propId] = {name: action.propName, id: action.propId, img: action.propImg, bedrooms: action.bedrooms, bathrooms: action.bathrooms, baseGuests: action.baseGuests, city: action.city, rate: action.rate, currSymbol: action.currSymbol}
        return {
          properties: newObj
        }
      }
    }
    if(action.type === 'REMOVE_PROPERTY'){
      if(newObj[action.propId]){
        delete newObj[action.propId]
        return {
          properties: newObj
        }
      }
    }
    if(action.type === 'ADD_FEATURED'){
        featuredProps = action.propIds
        return{
          featuredProps: featuredProps,
          properties: newObj
        }
    }
      return state
}

const initialState = { 
    properties: (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('state')) || {} : {},
    city: "",
    propType:"", 
 }

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, initialState);
};