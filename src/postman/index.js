import Contacts from './contacts';
import { executeCommand } from './../utils';

const api = 'http://localhost:8080/api'

const contacts = Contacts(api);

(async () => {
  let message = {
    "name":"", 
    "email":"", 
    "subject": "", 
    "body": "",
    "score": 0
  }
  
  console.log('Exectuting api with this arguments', message)
  
  await executeCommand(contacts.createContact(message));
})();

(async() => {
  let message = {
    "name":"gabriel", 
    "email":"gabriel.garcia.amaris", 
    "subject": "prueba con postman", 
    "body": "llaalalalalland",
    "score": 0.9
  }
  
  console.log('Exectuting api with an incorrect email and the arguments are', message)
  
  await executeCommand(contacts.createContact(message));
})();

(async() => {
  let message = {
    "name":"gabriel", 
    "email":"gabriel.garcia.amaris@xbyorange.com", 
    "subject": "prueba con postman", 
    "body": "llaalalalalland",
    "score": 0.4
  }
  
  console.log('Exectuting api with an incorrect score and the arguments are', message)
  
  await executeCommand(contacts.createContact(message));
})();

(async() => {
  let message = {
    "name":"gabriel", 
    "email":"gabriel.garcia.amaris@gmail.com", 
    "subject": "prueba con postman", 
    "body": "llaalalalalland",
    "score": 0.9
  }
  
  console.log('Exectuting api with this arguments', message)
  
  await executeCommand(contacts.createContact(message));
})();


(async() => {
  let message = {
    "token":"3039Z2390I39E0sdijosddsjio", 
  }
  console.log('Validation recaptcha', message);
  await executeCommand(contacts.validateRecaptcha(message));
})();
