import { User } from "../../models/userModel";

export const findById = async (id: string) => {
  return User.findById({ _id: id });
};

export const create = async (id: string) => {
  const newUser = new User({
    _id: id,
    username: id,
    bio: "",
  });
  await newUser.save();
};
