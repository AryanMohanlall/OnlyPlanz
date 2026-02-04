let user = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Phone', price: 499 }
];

module.exports = {
  findAll: () => user,
  findById: (id) => user.find(p => p.id === id),
  create: (productData) => {
    const newUser = { id: Date.now().toString(), ...productData };
    user.push(newUser);
    return newUser;
  }
};