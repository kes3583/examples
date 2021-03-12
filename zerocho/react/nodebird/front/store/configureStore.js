import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";

const configureStore = () => {
  const store = createSotre(reducer);
  store.dispatch({
    type:'CHANGE_NAME',
    name: 'lovelycherry'
  })
  return store;  
}
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development'
})

export default wrapper;