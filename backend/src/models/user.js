let users = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Phone', price: 499 }
];

export const findAll = () => users;

export const findById = (id) => users.find(u => u.id === id);

export const create = (userData) => {
  const newUser = { 
    id: Date.now().toString(), 
    ...userData 
  };
  users.push(newUser);
  return newUser;
};
