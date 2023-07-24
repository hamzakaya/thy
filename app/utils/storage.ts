const storage = (key: string) => ({
  get: () => {
    return JSON.parse(window.localStorage.getItem(key) as string);
  },
  set: (value: string) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    window.localStorage.removeItem(key);
  },
});

export default storage;
