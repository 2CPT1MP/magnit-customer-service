import { Schema, Document, model} from 'mongoose';


export interface UserDocument extends Document{
    username: string,
    password: string
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<UserDocument>('User', userSchema);