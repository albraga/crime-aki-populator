const firebase = require('firebase/app')
require('firebase/database')

const config = {
    apiKey: 'AIzaSyCAhXz7ULD5AiWSE7-qvq5Pu3vg0l89bEY',
    authDomain: 'parseapp-e8b30.firebaseapp.com',
    databaseURL: 'https://parseapp-e8b30.firebaseio.com',
    projectId: 'parseapp-e8b30',
    storageBucket: 'parseapp-e8b30.appspot.com',
    messagingSenderId: '246109443388'
}

firebase.initializeApp(config)

const dbRef = firebase.database().ref()
const ocorrenciasRef = dbRef.child('ocorrencias')

// let lat = [
//     -33.43722152709961, 
//     -26.44917, 
//     -9.218119621276855,
//     -9.218119621276855, 
//     -9.218119621276855, 
//     -9.218119621276855, 
//     7.156984806060791,
//     9.766220092773438,
//     35.89223098754883,
//     39.94516,
//     51.12180709838867,
//     51.12180709838867,
//     51.12180709838867,
//     51.12180709838867,
//     51.12180709838867,
//     54.95417022705078
// ]


// let autor = ['-LZjMwOQkuleCe9Ai9WN', '-LZjMNOcms4nFWw1PH97']

// for (let x = 0; x < autor.length; x++) {

//     ocorrenciasRef.orderByChild('id_fb').equalTo(autor[x].toString()).once('value', snapshot => {
//         const updates = {};
//         snapshot.forEach(child => updates[child.key] = null);
//         ocorrenciasRef.update(updates);
//     });

// }

let count = 0
ocorrenciasRef.orderByChild('autor').on("child_added", function(snapshot) {
    
  console.log(snapshot.key + ' ' + snapshot.val().autor + ' ' + count++);
});