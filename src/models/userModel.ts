import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string; // Ethereum address
  username: string; // Username of the user
  bio: string; // Bio or description about the user
}

const userSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid Ethereum address!`,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
    minlength: 1, // Minimum username length, ENS
    maxlength: 42, // Maximum username length, ETH address
  },
  bio: {
    type: String,
    required: false, // Making bio optional
    maxlength: 500, // Maximum bio length
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
