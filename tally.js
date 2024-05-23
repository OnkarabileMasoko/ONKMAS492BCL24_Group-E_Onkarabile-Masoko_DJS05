store.dispatch({ type: "ADD" });
store.dispatch({ type: "ADD" }); // Scenario 2

store.dispatch({ type: "SUBTRACT" }); // Scenario 3

store.dispatch({ type: "RESET" }); // Scenario 4

// Unsubscribe
  unsubscribe();