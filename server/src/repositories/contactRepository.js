"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const client_1 = require("@prisma/client");
const customError_1 = require("../utils/customError");
const prisma = new client_1.PrismaClient();
class ContactRepository {
    getContactsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userContacts = yield prisma.contact.findMany({
                where: { userId },
            });
            return userContacts;
        });
    }
    getContactById(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield prisma.contact.findUnique({
                where: { id: contactId },
            });
            return contact;
        });
    }
    createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdContact = yield prisma.contact.create({
                data: contact,
            });
            return createdContact.id;
        });
    }
    updateContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedContact = yield prisma.contact.update({
                where: { id: contact.id },
                data: {
                    name: contact.name,
                    email: contact.email,
                    phoneNumber: contact.phoneNumber,
                    address: contact.address,
                    profilePicture: contact.profilePicture,
                },
            });
            if (!updatedContact) {
                throw new customError_1.CustomError("Contact not found or not updated", 404);
            }
        });
    }
    deleteContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedContact = yield prisma.contact.delete({
                where: { id: contactId },
            });
            if (!deletedContact) {
                throw new customError_1.CustomError("Contact not found or already deleted", 404);
            }
        });
    }
}
exports.ContactRepository = ContactRepository;
