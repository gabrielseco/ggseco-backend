import r2 from "r2";

const RecaptchaService = () => {
  
  const validate = (async (token, ip) => {
    const api = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
      remoteip: ip
    };

    const data = await r2(api, payload).json;
    
    return data;
  });

  return {
    validate,
  }
}

export default RecaptchaService;
