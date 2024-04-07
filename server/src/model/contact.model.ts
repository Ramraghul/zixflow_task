import mongoose, { Document } from 'mongoose';

// Address Type
interface Address {
    line1: string;
    line2?: string;
    city: string;
    country: string;
    zipCode: string;
}

// All Model Type
interface UserInterface extends Document {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    address: Address;
    email: string;
    phone: string;
    other?: string;
}

const UserContactsSchema = new mongoose.Schema<UserInterface>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        match: /^[A-Za-z]+$/
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        match: /^[A-Za-z]+$/
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE', 'OTHERS']
    },
    address: {
        line1: {
            type: String,
            required: true,
            min: 8
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            uppercase: true
        },
        zipCode: {
            type: String,
            required: true,
            max: 10
        }
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    other: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model<UserInterface>('UserContact', UserContactsSchema, 'UserContacts');
