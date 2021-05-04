import Pusher from 'pusher-js'

let pusher = new Pusher('55dee10dc9023f5b092f', { cluster: 'us2' })

export default {

  subscribe () {
    return pusher.subscribe('upper-fi-channel');
  },
}