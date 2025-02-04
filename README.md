## Frontend states library
- simplified React-Redux like library.
- Deno-based states management library [Node-free].
- functional-style library [OOP-free].

### Usage
```javascript
import {render} from "/scripts/rendering.js"
import {createAction, createGlobalState, createReducer, dispatchAction, getGlobalStates, setSelectors, useSelector, Global_State} from "/scripts/states.js"

const changeAuthAction = createAction("userState/changeAuth", {isAuth: true})
const userState = createGlobalState("userState", ({ isAuth: false }))
const userStateReducer = createReducer("userState", {
  changeAuth: (userState, action) => ({ ...userState, ...action.payload })
})

export const App = () =>
  <main>
    <Global_State state={userState} reducer={userStateReducer}></Global_State>
    <User_Login logged="Logged in" login="Login"></User_Login>
  </main>

export const User_Login = (props, elem) => {
  const selectors = setSelectors(elem)
  const globalStates = getGlobalStates(elem)
  const isAuth = useSelector(selectors, "isAuth", (states) => states.userState.isAuth, globalStates)

  return isAuth?
    <div>{props.logged}</div>:
    <button onclick={() => dispatchAction(elem, changeAuthAction)}>{props.login}</button>
}

render(<App></App>, document.body)
```

### Modules
- *high-level modules*: states, states-components.
- *low-level modules*: states-actions, states-html, states-middlewares, states-reducers, states-states, states-selectors, states-equalities.
- *low-level modules* completely independent ["parallel" modules].

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
  - `Global_State`: register global state, state reducer, actions middleware.