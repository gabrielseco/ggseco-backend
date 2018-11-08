import Curl from './curl';

export default function Contacts(api) {

  const createContact = (message) => {
    const endpoint = api + '/contacts';
    return new Curl().post(endpoint, message);
  }

  const validateRecaptcha = (message) => {
    const endpoint = api + '/contacts/validateRecaptcha';
    return new Curl().post(endpoint, message);
  }

  return {
    createContact,
    validateRecaptcha
  }
}