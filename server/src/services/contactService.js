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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const customError_1 = require("../utils/customError");
const axios_1 = __importDefault(require("axios"));
class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    getContactsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contactRepository.getContactsByUserId(userId);
        });
    }
    createContact(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            contactData.profilePicture = yield this.normalizeProfilePicture(contactData.profilePicture);
            const createdContactId = yield this.contactRepository.createContact(contactData);
            return Object.assign(Object.assign({}, contactData), { id: createdContactId });
        });
    }
    updateContact(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingContact = yield this.contactRepository.getContactById(contactData.id);
            if (!existingContact || existingContact.userId !== contactData.userId) {
                throw new customError_1.CustomError("Unauthorized or contact not found", 403);
            }
            contactData.profilePicture = yield this.normalizeProfilePicture(contactData.profilePicture);
            yield this.contactRepository.updateContact(contactData);
            return contactData;
        });
    }
    deleteContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactRepository.getContactById(contactId);
            if (!contact) {
                throw new customError_1.CustomError("Contact not found", 404);
            }
            yield this.contactRepository.deleteContact(contactId);
        });
    }
    downloadAndConvertProfilePicture(profilePicture) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(profilePicture, { responseType: "arraybuffer" });
                const responseUnit8Array = new Uint8Array(response.data);
                return responseUnit8Array;
            }
            catch (error) {
                throw new customError_1.CustomError("Error downloading image from Cloudinary", 500);
            }
        });
    }
    normalizeProfilePicture(profilePicture) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof profilePicture === "string") {
                return yield this.downloadAndConvertProfilePicture(profilePicture);
            }
            if (profilePicture instanceof Buffer) {
                return new Uint8Array(profilePicture);
            }
            return profilePicture;
        });
    }
}
exports.ContactService = ContactService;
