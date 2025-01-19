export class Contact {
    public id: number;
    public name: string;
    public email: string;
    public phoneNumber: string;
    public address: string;
    public profilePicture: Uint8Array | null;
    public userId: number;
  
    constructor(
      id: number,
      name: string,
      email: string,
      phoneNumber: string,
      address: string,
      profilePicture: Uint8Array,
      userId: number
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.profilePicture = profilePicture;
      this.userId = userId;
    }
  }