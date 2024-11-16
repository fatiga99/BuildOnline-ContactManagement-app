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

contactRouter.use(authMiddleware);

contactRouter.get('/', contactController.getContacts.bind(contactController));
contactRouter.post('/', validateContact, contactController.createContact.bind(contactController));
contactRouter.put('/:contactId', validateContact, contactController.updateContact.bind(contactController));
contactRouter.delete('/:contactId', contactController.deleteContact.bind(contactController));


export default contactRouter;