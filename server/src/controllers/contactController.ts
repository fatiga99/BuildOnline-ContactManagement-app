import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contactService';
import { CreateContactDTO} from '../interfaces/DTOs/createContactDTO';
import { ContactDTO } from '../interfaces/DTOs/contactDTO';
import { CustomError } from '../utils/customError';

export class ContactController {
    private contactService: ContactService;

    constructor(contactService: ContactService) {
        this.contactService = contactService;
    }

    public async getContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) return next(new CustomError('User ID is missing', 400));

            const contacts = await this.contactService.getContactsByUserId(userId);
            res.json(contacts);
        } catch (error) {
            next(error);
        }
    }

    public async createContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) return next(new CustomError('User ID is missing', 400));

            const contactData = req.body as CreateContactDTO;
            const newContact = await this.contactService.createContact(contactData);
            res.status(201).json(newContact);
        } catch (error) {
            next(error);
        }
    }

    public async updateContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactData = req.body as ContactDTO;
            await this.contactService.updateContact(contactData);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    public async deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = parseInt(req.params.contactId);
            await this.contactService.deleteContact(contactId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}