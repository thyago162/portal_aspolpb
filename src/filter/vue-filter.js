import Vue from 'vue';

Vue.filter('date', function (value) {
    return value.split('-').reverse().join('/')
})

Vue.filter('name', function (value) {
    
    let userName = value.split(" ");
    return  userName[0].toUpperCase();
        
})

Vue.filter('fullDate', function (value) {
    let date =  value.split(' ')

    return date[0].split('-').reverse().join('/') +' '+ date[1]
}) 

Vue.filter('namedDate', function (value) {
    let  months = ['Janeiro', 'Fevereiro','Março','Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
    if (value) {
        let date = value.split('-');

        return `${date[2]} de ${months[parseInt(date[1])]} de ${date[0]}`

    } else {
        return ''
    }
    
})

Vue.filter('fileName', function(value) {
   let name = "Arquivo";
   let extension = value.split('.');

   return `${name}.${extension[1]}`
   
})

Vue.filter('newsContent', function(value) {
    let finalText = '';
    let text = '';
                
    value = value.replace('<p>', '');
    value = value.replace('<p class="ql-align-justify">', '')
    value = value.replace('</p>', '')

    text = value.split(',');
    
    finalText = text[0]
    finalText += text[1]
    

    return `${finalText}...`
})