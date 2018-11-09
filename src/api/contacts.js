import nodemailer from 'nodemailer';
import Validators from '../validators';
import RecaptchaService from './../services/recaptcha';

const createTransportLayer = ({
  service,
  user,
  pass
}) => {
  return nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: pass
    }
  });
}

export default function Contacts() {
  const sendEmail = (req, res) => {
    const smtpTransport = createTransportLayer({
      service: "gmail",
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    })

    const {
      name,
      email,
      subject,
      body,
      score,
    } = req.body;

    const validators = new Validators();

    const nameIsValid = validators.isRequired(name, validators.types.STRING);
    const emailIsRequired = validators.isRequired(email, validators.types.STRING);
    const emailIsValid = validators.isEmailValid(email);
    const subjectIsValid = validators.isRequired(subject, validators.types.STRING);
    const bodyIsValid = validators.isRequired(body, validators.types.STRING);

    const validatorArrayShouldBeZero = [
      nameIsValid,
      emailIsRequired,
      subjectIsValid,
      bodyIsValid
    ].filter(validator => validator === false);

    if (validatorArrayShouldBeZero.length !== 0) {
      res.status(409).send({
        message: 'Some fields are empty'
      })
      return;
    }

    if (emailIsValid === false) {
      res.status(409).send({
        message: 'The email is invalid'
      })
      return;
    }
    
    if (score < 0.5) {
      res.status(409).send({
        message: 'The score is not enough'
      })
    }


    const mail = {
      from: `${name} <${email}>`,
      to: process.env.MAIL_USER,
      subject: subject,
      html: `
      <div>
        <p>Nombre: ${name}</p>
        <p>Email: ${email}</p>
        <p>Asunto: ${subject}</p>
        <p>${body}</p>
      </div>
      `
    }

    smtpTransport.sendMail(mail, function (error, response) {
      if (error) {
        res.send(error);
      } else {
        res.send({
          message: response.message
        })
      }

      smtpTransport.close();
    });
  }

  const validateRecaptcha = (async (req, res) => {
    const recaptchaService = new RecaptchaService();
    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const token = req.body.token;
    
    const data = await recaptchaService.validate(token, ip);

    try {
      res.send(data);
    } catch(err) {
      res.send(err);
    }
  });

  return {
    sendEmail,
    validateRecaptcha
  }
}