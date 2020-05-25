 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
  apiKey: 'AIzaSyCO8YeZ9RGhmfFzscabcJXFMVMJi8IHE8s',
  authDomain: 'platzi-store-749d0.firebaseapp.com',
  databaseURL: 'https://platzi-store-749d0.firebaseio.com',
  projectId: 'platzi-store-749d0',
  storageBucket: 'platzi-store-749d0.appspot.com',
  messagingSenderId: '3106451202',
  appId: '1:3106451202:web:2d334853e9d501c2d01c1b'
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]