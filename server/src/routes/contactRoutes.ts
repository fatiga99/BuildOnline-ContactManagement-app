import express from 'express';
import { ContactController } from '../controllers/contactController';
import { ContactRepository } from '../repositories/contactRepository';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateContact } from '../middleware/contactValidator';

const contactRouter = express.Router();
const contactRepository = new ContactRepository();


contactRouter.get('/contacts', authMiddleware, ContactController.getContacts);

contactRouter.post('/contacts', authMiddleware, validateContact, ContactController.createContact);

contactRouter.put('/contacts/:contactId', authMiddleware, validateContact, ContactController.updateContact);

contactRouter.delete('/contacts/:contactId', authMiddleware, ContactController.deleteContact);

export default contactRouter;
