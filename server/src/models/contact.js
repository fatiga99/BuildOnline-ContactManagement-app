"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(id, name, email, phoneNumber, address, profilePicture, userId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.profilePicture = profilePicture;
        this.userId = userId;
    }
}
exports.Contact = Contact;
