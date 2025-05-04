let uncategorizedCount = 0;
let listeners = [];

export const getUncategorizedCount = () => uncategorizedCount;

export const setUncategorizedCount = (count) => {
  uncategorizedCount = count;
  listeners.forEach((listener) => listener(count));
};

export const subscribeToUncategorizedCount = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
