let users = [];

// Join user to chat
const userOnline = (id, username) => {
  const user = { id, username };

  const existingUser = users.find((user) => user.username === username);

  if (!existingUser) {
    users.push(user);
  }

  return user;
};
// User leaves chat
const userOffline = (id) => {
  users = users.filter((user) => {
    return user.id !== id;
  });
  return users;
};

//get users
const getOnlineUsers = () => {
  console.log(users);
  return users;
};

module.exports = {
  userOnline,
  userOffline,
  getOnlineUsers,
};
