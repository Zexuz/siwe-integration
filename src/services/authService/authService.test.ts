import { signIn } from "./authService";

const mockCreate = jest.fn();
const mockFindById = jest.fn();
jest.mock("../userService", () => ({
  create: (...args: any) => mockCreate(args),
  findById: (...args: any) => mockFindById(args),
}));

const mockVerify = jest.fn();
jest.mock("siwe", () => {
  return {
    SiweMessage: jest.fn().mockImplementation(() => {
      return {
        verify: (...args: any) => mockVerify(args),
      };
    }),
  };
});

jest.mock("../../utils/jwtHelper", () => {
  return {
    createTokenWithUserId: jest.fn().mockImplementation(() => {
      return "newToken";
    }),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TEST", () => {
  it("should create the user if its the first time signing in", async () => {
    mockVerify.mockReturnValue({
      success: true,
      data: {
        address: "address",
      },
    });
    mockFindById.mockReturnValue(null);

    const res = await signIn("message", "signature");

    expect(res).toEqual({
      success: true,
      errorCode: null,
      error: null,
      token: "newToken",
    });
    expect(mockCreate).toHaveBeenCalledWith(["address"]);
  });

  it("should NOT create the user if already exists", async () => {
    mockVerify.mockReturnValue({
      success: true,
      data: {
        address: "address",
      },
    });
    mockFindById.mockReturnValue({});

    const res = await signIn("message", "signature");

    expect(res).toEqual({
      success: true,
      errorCode: null,
      error: null,
      token: "newToken",
    });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("should return an error if signature is invalid", async () => {
    mockVerify.mockReturnValue({
      success: false,
      error: new Error("There was a error"),
      data: null,
    });

    const res = await signIn("message", "signature");

    expect(res).toEqual({
      success: false,
      errorCode: "Error verifying signature",
      error: new Error("Error verifying signature"),
      token: null,
    });
  });
});
