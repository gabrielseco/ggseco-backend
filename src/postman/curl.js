const Curl = () => {
  const post = (endpoint, message) => {
    return `
      curl -d '${JSON.stringify(message)}' -H "Content-Type: application/json" -X POST ${endpoint}
    `
  }
  return {
    post
  }
}

export default Curl;
