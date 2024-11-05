import express from 'express';
import { ContactRepository } from '../repositories/contactRepository';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateContact } from '../middleware/contactValidator';
import { ContactController } from '../controllers/contactController';
import { ContactService } from '../services/contactService';

const contactRouter = express.Router();
const contactRepository = new ContactRepository();
const contactService = new ContactService(contactRepository)
const contactController = new ContactController(contactService);


contactRouter.get('/', authMiddleware, contactController.getContacts.bind(contactController));

contactRouter.post('/', authMiddleware, validateContact, contactController.createContact.bind(contactController));

contactRouter.put('/:contactId', authMiddleware, validateContact, contactController.updateContact.bind(contactController));

contactRouter.delete('/:contactId', authMiddleware, contactController.deleteContact.bind(contactController));

export default contactRouter;
