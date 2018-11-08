import { version } from '../../package.json';
import { Router } from 'express';
import Contacts from './contacts';

export default () => {
	let api = Router();
	let contacts = Contacts();

	api.post('/contacts', contacts.sendEmail);
	api.post('/contacts/validateRecaptcha', contacts.validateRecaptcha)

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
