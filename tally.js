// store.js
class Store {
    constructor(reducer, initialState) {
      this.reducer = reducer;
      this.state = initialState;
      this.listeners = [];
    }
  
    getState() {
      return this.state;
    }
  
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach((listener) => listener(this.state));
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
  }
  
  // Tally Counter Reducer (Pure Function)
  const tallyReducer = (state = 0, action) => {
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "SUBTRACT":
        return state - 1;
      case "RESET":
        return 0;
      default:
        return state;
    }
  };
  
  // Create the Store
  const store = new Store(tallyReducer, 0);
  
  // Subscribe to Changes
  const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState);
  });
  
  // Test Scenarios
  console.log("Initial state:", store.getState()); // Scenario 1
  
  store.dispatch({ type: "ADD" });
  store.dispatch({ type: "ADD" }); // Scenario 2
  
  store.dispatch({ type: "SUBTRACT" }); // Scenario 3
  
  store.dispatch({ type: "RESET" }); // Scenario 4
  
  // Unsubscribe
  unsubscribe();