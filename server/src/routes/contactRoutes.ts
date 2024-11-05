import express from 'express';
import { ContactRepository } from '../repositories/contactRepository';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateContact } from '../middleware/contactValidator';
import { ContactController } from '../controllers/contactController';

const contactRouter = express.Router();
const contactRepository = new ContactRepository();
const contactService = new ContactService(contactRepository)
const contactController = new ContactController(contactService);


contactRouter.get('/contacts', authMiddleware, contactController.getContacts.bind(contactController));

contactRouter.post('/contacts', authMiddleware, validateContact, contactController.createContact.bind(contactController));

contactRouter.put('/contacts/:contactId', authMiddleware, validateContact, contactController.updateContact.bind(contactController));

contactRouter.delete('/contacts/:contactId', authMiddleware, contactController.deleteContact.bind(contactController));

export default contactRouter;
