const Client = require('ldapts').Client

let client = new Client({
  url: 'ldap://10.81.67.8:389'
})

let auth = new Client({
  url: 'ldap://10.81.67.8:389'
})

module.exports = function(data) {

  let opts = {
    filter: '(mail=' + data.email + ')',
    scope: 'sub',
  }
  return new Promise(async (resolve, reject) => {
    try {
      await client.bind('cn=bugadmin,OU=ServicesUsers,DC=kaios,DC=com', 'bugpassword')

      const searchResult = await client.search('dc=kaios,dc=com', opts)
      if (searchResult.searchEntries.length <= 0) {
        reject({status: false, message: 'user not found'})
      }
      await auth.bind(searchResult.searchEntries[0].dn, data.password)

      resolve({status: true, message: 'success'})
    } catch (ex) {
      reject({status: false, message: ex})
    } finally {
      await client.unbind();
      await auth.unbind();
    }
  })
}
