<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Login</h1>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" v-model="email" class="form-control" name="email">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password">
          </div>

          <button class="btn btn-lg btn-primary-btn-block">Sign in</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import request from '../../utils/request'
import {setToken} from '../../utils/auth'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      request.post('/api/users/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        setToken(res.data.token)
        this.email = ''
        this.password = ''
        router.push({name: 'Profile'})
        this.emitMethod()
      }).catch(err => {
        console.log(err)
      })
    },

    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
