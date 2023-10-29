import { findById, findByUserName } from "./userService";

export enum UpdateError {
  UsernameTaken = "Username is already taken",
  UserNotFound = "User not found",
}

type UpdateResult = {
  success: boolean;
  errorCode: UpdateError | null;
  error: Error | null;
};

export const update = async (
  id: string,
  username: string,
  bio: string,
): Promise<UpdateResult> => {
  const user = await findById(id);
  if (!user) {
    return {
      success: false,
      errorCode: UpdateError.UserNotFound,
      error: new Error("User not found"),
    };
  }

  if (username !== user.username) {
    const existingUser = await findByUserName(username);
    if (existingUser) {
      return {
        success: false,
        errorCode: UpdateError.UsernameTaken,
        error: new Error("Username is already taken"),
      };
    }
  }

  if (username) {
    user.username = username;
  }
  if (bio) {
    user.bio = bio;
  }
  await user.save();
  return {
    success: true,
    errorCode: null,
    error: null,
  };
};
