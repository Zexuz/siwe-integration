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

export const update = async (id: string, username: string, bio: string) => {
  const user = await findById(id);
  if (!user) {
    return false;
  }

  if (username) {
    user.username = username;
  }
  if (bio) {
    user.bio = bio;
  }
  await user.save();
  return true;
};
