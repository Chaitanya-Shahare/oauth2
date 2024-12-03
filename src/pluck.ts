export const pluck = (elements, field) => {
  return elements.map((element) => element[field]);
};

// pluck([{ a: 1 }, { a: 2 }], 'a'); // [1, 2]
