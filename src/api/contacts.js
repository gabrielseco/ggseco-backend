import nodemailer from 'nodemailer';

const createTransportLayer = ({ service, user, pass}) => {
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

		const { name, email, subject, body } = req.body;


    if (name === undefined || email === undefined ) {
      res.status(409).send({
        message: 'Some fields such as name or email are empty'
      })
    }


		const mail = {
			from: `${name} <${email}>`,
			to: process.env.MAIL_USER,
			subject: subject,
			html: `<p>${body}</p>`
	}
	
		smtpTransport.sendMail(mail, function(error, response) {
			if(error){
					res.send(error);
			} else {
				res.send({
					message: response.message
				})
			}

			smtpTransport.close();
		});
  }
  return {
    sendEmail,
  }
}