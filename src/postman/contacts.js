export default function Contacts(api) {

  const endpoint = api + '/contacts';
  
  const createContact = (message) => {
    return `
      curl -d '${JSON.stringify(message)}' -H "Content-Type: application/json" -X POST ${endpoint}
    `
  }
  
  return {
    createContact 
  }
}
