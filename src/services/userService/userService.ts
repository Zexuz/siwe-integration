import { User } from "../../models/userModel";

export const findById = async (id: string) => {
  return User.findById({ _id: id });
};

export const findByUserName = async (username: string) => {
  return User.findOne({ username: username });
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
