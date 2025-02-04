export function pipeExecuter(pipe, appState) {
  return pipe.reduce((acc, update) => {
    // If the update is an array, recursively process it as a nested pipe
    if (Array.isArray(update)) {
      return pipeExecuter(update, acc);
    }
    // Otherwise, execute the update function normally
    return update(acc);
  }, appState);
}
