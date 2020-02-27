import Vue from 'vue';

Vue.filter('date', function (value) {
    return value.split('-').reverse().join('/')
})