// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'http://localhost:3000/api',
  serverSocket: 'http://localhost:4000',
  firebase: {
    apiKey: 'AIzaSyCO8YeZ9RGhmfFzscabcJXFMVMJi8IHE8s',
    authDomain: 'platzi-store-749d0.firebaseapp.com',
    databaseURL: 'https://platzi-store-749d0.firebaseio.com',
    projectId: 'platzi-store-749d0',
    storageBucket: 'platzi-store-749d0.appspot.com',
    messagingSenderId: '3106451202',
    appId: '1:3106451202:web:2d334853e9d501c2d01c1b'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
