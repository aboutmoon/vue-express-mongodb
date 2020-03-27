let ldap = require('./LdapAuth')

ldap({
  email: 'biao.he@kaiostech.com',
  password: 'okmwsx12345'
})
.then(data => {
  console.log(data)
})
.catch(data => {
  console.log(data)
})

