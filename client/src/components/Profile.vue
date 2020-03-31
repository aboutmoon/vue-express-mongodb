<script>
import request from '../../utils/request'

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import sourceData from './config'
import {getToken} from '../../utils/auth'
import JwtDecode from 'jwt-decode'

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import '@fullcalendar/core/main.css'
import '@fullcalendar/timegrid/main.css'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    flatPickr
  },

  data () {
    return {
      // datepicker
      datepicker: {
        enableTime: true,
        minTime: '09:00',
        maxTime: '19:00'
      },

      start: null,
      end: null,

      locations: sourceData.locations,
      rooms: null,
      selectedCity: null,
      selectedRoom: null,

      // calendar
      calendarPlugins: [
        timeGridPlugin,
        interactionPlugin
      ],
      defaultView: 'timeGridWeek',
      allDaySlot: false,
      slotEventOverlap: false,
      slotDuration: '00:30:00',
      minTime: '09:00:00',
      maxTime: '18:30:00',
      editable: true,
      events: [
        {
          id: 1,
          title: 'test',
          start: '2020-03-31 10:00',
          end: '2020-03-31 12:00'
        }
      ]
    }
  },
  methods: {
    eventRender (info) {
      console.log(info)
      let span = document.createElement('span')
      span.textContent = 'X'
      span.classList.add('remove_btn')
      info.el.append(span)
      info.el.querySelector('.remove_btn').addEventListener('click', (e) => {
        console.log(123)
      })
    },
    changeCity (e) {
      for (let i = 0; i < this.locations.length; i++) {
        if (this.locations[i].name === e.target.value) {
          this.rooms = this.locations[i].rooms
        }
      }
      console.log(this.selectedCity)
    },
    changeRoom (e) {
      console.log(this.selectedRoom)
    },
    order () {
      const token = getToken()
      let user = JwtDecode(token)

      request.post('/api/locations/order', {
        city: this.selectedCity,
        room: this.selectedRoom,
        user: user.name,
        start: this.start,
        end: this.end
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<template>
  <div class="container">
    <div >
      <label for="city">City: </label>
      <select name="city" v-model="selectedCity" @change="changeCity" id="city">
        <option :value="location.name" :key="location.name" v-for="location in locations" >{{location.name}}</option>
      </select>
      <label for="room">Room: </label>
      <select name="room" v-model="selectedRoom" @change="changeRoom" id="room">
        <option :value="room.name" :key="room.name" v-for="room in rooms" >{{room.name}}</option>
      </select>

      <form v-on:submit.prevent="order">
        <flat-pickr :config="datepicker"  v-model="start"></flat-pickr>
        <flat-pickr :config="datepicker"  v-model="end"></flat-pickr>

        <button class="btn btn-lg btn-primary-btn-block" type="submit">order</button>
      </form>

      <FullCalendar
        :defaultView="defaultView"
        :events="events"
        :editable="editable"
        :slotDuration="slotDuration"
        :allDaySlot="allDaySlot"
        :minTime="minTime"
        :maxTime="maxTime"
        :slotEventOverlap="slotEventOverlap"
        :plugins="calendarPlugins"
        @eventRender="eventRender"
      />
    </div>
  </div>
</template>

<style>
.remove_btn {
  color:black;
  position: absolute;
  top: 0;
  right: 0;
  width:13px;
  height: 13px;
  text-align:center;
  border-radius:50%;
  font-size: 10px;
  cursor: pointer;
  background-color: #FFF
}
</style>
