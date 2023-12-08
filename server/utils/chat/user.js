const users = [];

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
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//get users
const getOnlineUsers = () => {
  return users;
};

module.exports = {
  userOnline,
  userOffline,
  getOnlineUsers,
};
