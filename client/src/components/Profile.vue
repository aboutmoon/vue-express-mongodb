<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>Name: </td>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{{ email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import {getToken} from '../../utils/auth'

export default {
  data () {
    const token = getToken()
    const decoded = jwtDecode(token)
    console.log(token)
    console.log(decoded)
    return {
      name: decoded.name,
      email: decoded.email
    }
  }
}
</script>
