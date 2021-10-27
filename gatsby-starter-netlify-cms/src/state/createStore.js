import { createStore } from 'redux';

function reducer(state, action) {
    if (action.type === `ADD_PROPERTY`) {
        console.log(action)
        return Object.assign({}, state, {
          properties: [...state.properties, {name: action.propName, id: action.propId, img: action.propImg, bedrooms: action.bedrooms, bathrooms: action.bathrooms, baseGuests: action.baseGuests}]
        })
      }
      return state
}

const initialState = { 
    properties: []
 }

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, initialState);
};