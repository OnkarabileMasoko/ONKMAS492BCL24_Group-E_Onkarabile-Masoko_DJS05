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
  
  // Create the Store
  const store = new Store(tallyReducer, 0);
  
  // Subscribe to Changes
  const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState);
  });

  // Subscribe to Changes
  const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState);
  });

  // Test Scenarios
  console.log("Initial state:", store.getState()); // Scenario 1
  