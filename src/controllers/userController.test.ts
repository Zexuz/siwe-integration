import { meHandler, updateMeHandler } from "./userController";

const mockFindById = jest.fn();
const mockUpdate = jest.fn();
jest.mock("../services/userService", () => ({
  findById: (...args: any[]) => mockFindById(...args),
  update: (...args: any[]) => mockUpdate(...args),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserController", () => {
  describe("meHandler", () => {
    it("should return 404 if the user is not found", async () => {
      const req = {
        getUserIdOrFail: () => "userId",
      } as any;

      const res = {
        status: jest.fn(),
        json: jest.fn(),
      } as any;

      mockFindById.mockResolvedValue(null);

      await meHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return the user if the user is found", async () => {
      const req = {
        getUserIdOrFail: () => "userId",
      } as any;

      const res = {
        status: jest.fn(),
        json: jest.fn(),
      } as any;

      mockFindById.mockResolvedValue({
        username: "username",
        bio: "bio",
      });

      await meHandler(req, res);

      expect(res.json).toHaveBeenCalledWith({
        id: "userId",
        username: "username",
        bio: "bio",
      });
    });
  });

  describe("updateMeHandler", () => {
    it("should return 404 if the user is not found", async () => {
      const req = {
        getUserIdOrFail: () => "userId",
        body: {
          username: "username",
          bio: "bio",
        },
      } as any;

      const res = {
        status: jest.fn(),
        json: jest.fn(),
      } as any;

      mockUpdate.mockResolvedValue(false);

      await updateMeHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should update the user and return the user", async () => {
      const req = {
        getUserIdOrFail: () => "userId",
        body: {
          username: "username",
          bio: "bio",
        },
      } as any;

      const res = {
        status: jest.fn(),
        json: jest.fn(),
      } as any;

      mockUpdate.mockResolvedValue(true);

      await updateMeHandler(req, res);

      expect(mockUpdate).toHaveBeenCalledWith("userId", "username", "bio");
      expect(res.json).toHaveBeenCalledWith({
        id: "userId",
        username: "username",
        bio: "bio",
      });
    });
  });
});
