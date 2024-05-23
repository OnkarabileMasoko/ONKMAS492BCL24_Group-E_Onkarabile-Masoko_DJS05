// store.js

// Store class that implements a basic state management system
class Store {
    // Constructor to initialize the store with a reducer and an initial state
    constructor(reducer, initialState) {
      this.reducer = reducer; // Reducer function to manage state transitions
      this.state = initialState; // Initial state of the store
      this.listeners = []; // Array to hold all subscribed listeners
    }
  
    // Method to get the current state
    getState() {
      return this.state;
    }
  
    // Method to dispatch an action to the reducer
    dispatch(action) {
      // Update the state by passing the current state and action to the reducer
      this.state = this.reducer(this.state, action);
      // Notify all subscribed listeners with the updated state
      this.listeners.forEach((listener) => listener(this.state));
    }
  
    // Method to subscribe a listener to state changes
    subscribe(listener) {
      this.listeners.push(listener); // Add the listener to the array
      // Return an unsubscribe function to remove the listener
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
  }
  
  // Tally Counter Reducer (Pure Function)
  // Function to handle state transitions based on the action type
  const tallyReducer = (state = 0, action) => {
    switch (action.type) {
      case "ADD": // Increment state by 1
        return state + 1;
      case "SUBTRACT": // Decrement state by 1
        return state - 1;
      case "RESET": // Reset state to 0
        return 0;
      default: // Return current state for unknown action types
        return state;
    }
  };
  
  // Create the Store
  const store = new Store(tallyReducer, 0); // Initialize store with tallyReducer and initial state 0
  
  // Subscribe to Changes
  const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState); // Log the updated state whenever it changes
  });
  
  // Test Scenarios
  console.log("Initial state:", store.getState()); // Scenario 1: Log initial state (expected: 0)
  
  store.dispatch({ type: "ADD" }); // Dispatch "ADD" action (expected state: 1)
  store.dispatch({ type: "ADD" }); // Dispatch another "ADD" action (expected state: 2)
  
  store.dispatch({ type: "SUBTRACT" }); // Scenario 3: Dispatch "SUBTRACT" action (expected state: 1)
  
  store.dispatch({ type: "RESET" }); // Scenario 4: Dispatch "RESET" action (expected state: 0)
  
  // Unsubscribe
  unsubscribe(); // Unsubscribe the listener to stop logging state updates
  