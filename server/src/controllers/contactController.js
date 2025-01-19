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
exports.ContactController = void 0;
const customError_1 = require("../utils/customError");
class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    getContacts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return next(new customError_1.CustomError('User ID is missing', 400));
                const contacts = yield this.contactService.getContactsByUserId(userId);
                const contactsWithBase64Images = this.convertContactsToBase64(contacts);
                res.json(contactsWithBase64Images);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    return next(new customError_1.CustomError('User ID is missing', 400));
                const contactData = req.body;
                contactData.userId = userId;
                const newContact = yield this.contactService.createContact(contactData);
                res.status(201).json(newContact);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const contactId = parseInt(req.params.contactId);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return next(new customError_1.CustomError('User ID is missing', 400));
                }
                const contactData = req.body;
                contactData.id = contactId;
                contactData.userId = userId;
                const updatedContact = yield this.contactService.updateContact(contactData);
                res.status(200).json(updatedContact);
            }
            catch (error) {
                next(error);
            }
        });
    }
    convertContactsToBase64(contacts) {
        return contacts.map(contact => {
            const profilePictureBase64 = contact.profilePicture
                ? `data:image/jpeg;base64,${Buffer.from(contact.profilePicture).toString("base64")}`
                : null;
            return Object.assign(Object.assign({}, contact), { profilePicture: profilePictureBase64 });
        });
    }
    deleteContact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = parseInt(req.params.contactId);
                yield this.contactService.deleteContact(contactId);
                res.status(204).end();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ContactController = ContactController;
