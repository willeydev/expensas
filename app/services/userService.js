
const key = 'expensas_user';

const getUser = async () => {
  return {
    id: 1,
    name: 'Willey'
  }
};


const isLoggedIn = async () => {
  return await getUser() ? true : false
}

module.exports = {
    getUser
}