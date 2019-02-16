export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('learnlarivaar_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('learnlarivaar_state', serializedState);
  } catch (err) {
    // To-do: log error
  }
};
