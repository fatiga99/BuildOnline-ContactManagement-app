import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contactService';
import { CreateContactDTO} from '../interfaces/DTOs/createContactDTO';
import { ContactWithBase64DTO} from '../interfaces/DTOs/contactWithBase64DTO';
import { ContactDTO } from '../interfaces/DTOs/contactDTO';
import { CustomError } from '../utils/customError';
import { contact as Contact } from "@prisma/client";
import upload from '../../multerConfig'; 
import axios from 'axios';
import cloudinary from '../../cloudinaryConfig';
import { ContactUpdateDTO } from '../interfaces/DTOs/contactUpdateDTO';

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

            const contactsWithBase64Images = this.convertContactsToBase64(contacts);
    
            res.json(contactsWithBase64Images);
        } 
        catch (error) {
            next(error);
        }
    }


    public async createContact (req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
            const userId = req.user?.id;
            if (!userId) {
              return next(new CustomError('User ID is missing', 400));
            }
        
            const contactData: CreateContactDTO = {
              name: req.body.name,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              profilePicture: req.file ? new Uint8Array(req.file.buffer) : null,
              userId,
            };
    
            const newContact = await this.contactService.createContact(contactData);
            res.status(201).json(newContact);

          } catch (error) {
            next(error);
          }
        }
      
    
      public async updateContact (req: Request, res: Response, next: NextFunction): Promise<void>  {
          try {
            const userId = req.user?.id;
            const contactId = parseInt(req.params.contactId);
    
            if (!userId) {
              return next(new CustomError('User ID is missing', 400));
            }
    
            const contactData: ContactUpdateDTO = {
              id: contactId,
              name: req.body.name,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              profilePicture: req.file ? new Uint8Array(req.file.buffer) : null,
              userId,
            };
    
            const updatedContact = await this.contactService.updateContact(contactData);
            res.status(200).json(updatedContact);
          } catch (error) {
            next(error);
          }
        }
    

    private convertContactsToBase64(contacts: Contact[]): ContactWithBase64DTO[] {
        return contacts.map(contact => {
            const profilePictureBase64 = contact.profilePicture
                ? `data:image/jpeg;base64,${Buffer.from(contact.profilePicture).toString("base64")}` 
                : null;
    
            return {
                ...contact,
                profilePicture: profilePictureBase64,
            };
        });
    }

    public async deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = parseInt(req.params.contactId);
            await this.contactService.deleteContact(contactId);
            res.status(204).end();
        } 
        catch (error) {
            next(error);
        }
    }
}