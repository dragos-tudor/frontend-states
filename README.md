## Frontend states library
- simplified React-Redux like library.
- Deno-based states management library [Node-free].
- functional-style library [OOP-free].

### Usage
```javascript
import {render} from "/scripts/rendering.js"
import {createAction, createStoreState, createReducer, dispatchAction, getStoreStates, setSelectors, useSelector, Store} from "/scripts/states.js"

const changeAuthAction = createAction("userState/changeAuth", {isAuth: true})
const userState = createStoreState("userState", ({ isAuth: false }))
const userStateReducer = createReducer("userState", {
  changeAuth: (userState, action) => ({ ...userState, ...action.payload })
})

export const App = () =>
  <main>
    <Store state={userState} reducer={userStateReducer}></Store>
    <UserLogin logged="Logged in" login="Login"></UserLogin>
  </main>

export const UserLogin = (props, elem) => {
  const selectors = setSelectors(elem)
  const states = getStoreStates(elem)
  const isAuth = useSelector(selectors, "isAuth", (states) => states.userState.isAuth, states)

  return isAuth?
    <div>{props.logged}</div>:
    <button onclick={() => dispatchAction(elem, changeAuthAction)}>{props.login}</button>
}

render(<App></App>, document.body)
```

### Modules
- main modules: states, states-components.
- support modules: states-\*, support-\*.

### [State](./states/)
- main functionality: dispatch actions, reduce states, update states consumers.
- state means one states slice.
- reducer means one group of change state funcs.
- states operations:
  - `dispatchAction` if action change states then update consumers.
  - `chainMiddlewares` send actions through middlewares chain.
  - `runAction` based on action type reduce state.
  - `updateConsumers`:
    - when reduced state is different than previous state.
    - when previous selectors values are different than reduced state selectors values.


### [Components](./states-components/)
- main functionality: implement states components.
  - `Store`: register state, state reducer, actions middleware.