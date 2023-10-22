import { getNonce, signIn, SignInError } from "./authService";

const mockCreate = jest.fn();
const mockFindById = jest.fn();
const mockGetLoginNonceForUser = jest.fn();
const mockDeleteLoginNonceForUser = jest.fn();
const mockSetLoginNonceForUser = jest.fn();
jest.mock("../userService", () => ({
  create: (...args: any) => mockCreate(args),
  findById: (...args: any) => mockFindById(args),
  getLoginNonceForUser: (...args: any) => mockGetLoginNonceForUser(args),
  deleteLoginNonceForUser: (...args: any) => mockDeleteLoginNonceForUser(args),
  setLoginNonceForUser: (...args: any) => mockSetLoginNonceForUser(args),
}));

const mockVerify = jest.fn();
const mockGenerateNonce = jest.fn();
jest.mock("siwe", () => {
  return {
    SiweMessage: jest.fn().mockImplementation(() => {
      return {
        verify: (...args: any) => mockVerify(args),
      };
    }),
    generateNonce: (...args: any) => mockGenerateNonce(args),
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
    mockGetLoginNonceForUser.mockReturnValue("nonce");

    const res = await signIn("message", "signature", "address");

    expect(res).toEqual({
      success: true,
      errorCode: null,
      error: null,
      token: "newToken",
    });
    expect(mockDeleteLoginNonceForUser).toHaveBeenCalledWith(["address"]);
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
    mockGetLoginNonceForUser.mockReturnValue("nonce");

    const res = await signIn("message", "signature", "address");

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
    mockGetLoginNonceForUser.mockReturnValue("nonce");

    const res = await signIn("message", "signature", "address");

    expect(res).toEqual({
      success: false,
      errorCode: SignInError.SignatureError,
      error: new Error("Error verifying signature"),
      token: null,
    });
  });

  it("should return an error if nonce is not found for user", async () => {
    mockGetLoginNonceForUser.mockReturnValue("");

    const res = await signIn("message", "signature", "address");

    expect(res).toEqual({
      success: false,
      errorCode: SignInError.NonceError,
      error: new Error("No nonce found for user"),
      token: null,
    });
  });

  describe("getNonce", () => {
    it("should return the nonce", async () => {
      mockGenerateNonce.mockReturnValue("nonce");
      mockSetLoginNonceForUser.mockReturnValue("nonce");

      const res = await getNonce("address");

      expect(res).toEqual("nonce");
      expect(mockSetLoginNonceForUser).toHaveBeenCalledWith([
        "address",
        "nonce",
      ]);
    });
  });
});
