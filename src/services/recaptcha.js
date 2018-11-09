import r2 from "r2";

const RecaptchaService = () => {
  
  const validate = (async (token, ip) => {
    const api = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
      remoteip: ip
    };

    const endpoint = api + `?secret=${payload.secret}&response=${payload.response}&remoteip=${payload.remoteip}`;

    const data = await r2.get(endpoint).json;
    
    return data;
  });

  return {
    validate,
  }
}

export default RecaptchaService;
