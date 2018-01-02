import Vue from 'vue'

const app = new Vue({
  el: '#app',
  data: {
    status: 'hello World'
  },
  template: '<h2>{{status}}</h2>'
});