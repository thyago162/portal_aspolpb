import Vue from 'vue';

Vue.filter('date', function (value) {
    return value.split('-').reverse().join('/')
})

Vue.filter('name', function (value) {
    
    let userName = value.split(" ");
    return  userName[0].toUpperCase();
        
})  