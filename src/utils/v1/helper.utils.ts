export const generateId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return Number(`${timestamp}${random}`.slice(0, 10));
};

