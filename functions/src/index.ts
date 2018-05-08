// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import { promise } from 'protractor';
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

exports.firestoreEmail = functions.firestore.document('tasks/{tasksId}')
.onCreate((snap, context)=>{
    const newValue = snap.data();
    const msg = {
        to: newValue.to_email,
        from: newValue.created_by,
        templateId:functions.config().sendgrid.template,
        substitutions:{
            date:newValue.created_on,
            status:newValue.status,
            subject:newValue.subject,
            description:newValue.description,
        }
    };

    return sgMail.send(msg)
    .then((rslt)=>{
        console.log('rslt -> ',rslt);
    })
    .catch((err)=>{
        console.log('err -> ', err);
    });
});
