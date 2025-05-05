import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  userName?: string;
  userEmail: string;
  userPassword: string;
  comparePassword(candidatePassword: string): boolean;
}

const userSchema = new Schema(
  {
    userName: { type: String },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true, set: (v: string) => bcrypt.hashSync(v, 10) }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.userPassword);
};

const UserModel = model<IUser>('Users', userSchema);

export default UserModel;
