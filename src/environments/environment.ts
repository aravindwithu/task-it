import { FirebaseApp } from "angularfire2";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyANTAU_tTV42CZvH5yBKswc9DxlcKonlZA",
    authDomain: "task-it-ae210.firebaseapp.com",
    databaseURL: "https://task-it-ae210.firebaseio.com",
    projectId: "task-it-ae210",
    storageBucket: "task-it-ae210.appspot.com",
    messagingSenderId: "1047014997477"
  }
};
