import { IContactRepository } from '../interfaces/IContactRepository';
import { ContactRepository } from '../repositories/contactRepository';


export class ContactController {
    private contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

     
}