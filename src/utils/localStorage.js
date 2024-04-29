const localStorageKey = "inventoryKey";

const getData = () => JSON.parse(localStorage.getItem(localStorageKey));

const updateData = (data) =>
  localStorage.setItem(localStorageKey, JSON.stringify(data));

export { getData, updateData, localStorageKey };
