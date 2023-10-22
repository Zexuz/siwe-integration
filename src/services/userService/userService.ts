import { User } from "../../models/userModel";

export const findById = async (id: string) => {
  return User.findById({ _id: id });
};

export const create = async (id: string, nonce: string = "") => {
  const newUser = new User({
    _id: id,
    username: id,
    bio: "",
    loginNonce: nonce,
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

export const setLoginNonceForUser = async (id: string, nonce: string) => {
  const user = await findById(id);
  if (!user) {
    await create(id, nonce);
    return;
  }

  user.loginNonce = nonce;
  await user.save();
};

export const getLoginNonceForUser = async (id: string): Promise<string> => {
  const user = await findById(id);
  if (!user) {
    return "";
  }

  return user.loginNonce;
};

export const deleteLoginNonceForUser = async (id: string) => {
  const user = await findById(id);
  if (!user) {
    return false;
  }

  user.loginNonce = "";
  await user.save();
};
