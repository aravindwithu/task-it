import { FirebaseApp } from "angularfire2";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyCBEL4a8q4juvR2qUoSH5k49akQ5aybeKA",
    authDomain: "the-log-4301d.firebaseapp.com",
    databaseURL: "https://the-log-4301d.firebaseio.com",
    projectId: "the-log-4301d",
    storageBucket: "",
    messagingSenderId: "1060587901365"
  }
};
