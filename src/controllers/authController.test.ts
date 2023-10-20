import { signInHandler } from "./authController";
import { SignInError } from "../services/authService";

const mockSignIn = jest.fn();
jest.mock("../services/authService", () => ({
  ...jest.requireActual("../services/authService"),
  signIn: (...args: any[]) => mockSignIn(...args),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AuthController", () => {
  it("should return 401 if there is a signatureError", async () => {
    const req = {
      body: {
        message: "message",
        signature: "signature",
      },
    } as any;

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    mockSignIn.mockResolvedValue({
      success: false,
      error: "error",
      errorCode: SignInError.SignatureError,
      token: null,
    });

    await signInHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it("should return 500 if there is an error", async () => {
    const req = {
      body: {
        message: "message",
        signature: "signature",
      },
    } as any;

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    mockSignIn.mockResolvedValue({
      success: false,
      error: "error",
      errorCode: "Unknown error",
      token: null,
    });

    await signInHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it("should return the token if there is no error", async () => {
    const req = {
      body: {
        message: "message",
        signature: "signature",
      },
    } as any;

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    mockSignIn.mockResolvedValue({
      success: true,
      error: null,
      errorCode: null,
      token: "token",
    });

    await signInHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: "token" });
  });
});
