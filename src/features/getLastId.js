export const getLastId = () => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (localUsers.length > 0) {
      const lastUser = localUsers[localUsers.length - 1];
      console.log('lastUser: ', lastUser);
      return lastUser.id + 1;
    }
};
