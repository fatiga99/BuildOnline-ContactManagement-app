import express from 'express';
import { ContactController } from '../controllers/ContactController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateContact } from '../middleware/contactValidator';

const contactRouter = express.Router();

contactRouter.get('/contacts', authMiddleware, ContactController.getContacts);

contactRouter.post('/contacts', authMiddleware, validateContact, ContactController.createContact);

contactRouter.put('/contacts/:contactId', authMiddleware, validateContact, ContactController.updateContact);

contactRouter.delete('/contacts/:contactId', authMiddleware, ContactController.deleteContact);

export default contactRouter;
