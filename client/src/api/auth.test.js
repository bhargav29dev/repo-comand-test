import { jest } from "@jest/globals";

const get = jest.fn();
const post = jest.fn();
const create = jest.fn(() => ({ get, post }));

jest.unstable_mockModule("axios", () => ({
  default: { create },
}));

const { userRegister, userLogin, getMe, profile } = await import("./auth.js");

describe("auth API", () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
  });

  it("creates an API client for the backend API", async () => {
    const axios = await import("axios");

    expect(axios.default.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:5000/api",
    });
  });

  it("sends registration to the auth endpoint", () => {
    const data = {
      name: "Test User",
      email: "test@example.com",
      password: "StrongPass123",
    };

    userRegister(data);

    expect(post).toHaveBeenCalledWith("/auth/register", data);
  });

  it("sends login to the auth endpoint", () => {
    const data = { email: "test@example.com", password: "StrongPass123" };

    userLogin(data);

    expect(post).toHaveBeenCalledWith("/auth/login", data);
  });

  it.each([getMe, profile])(
    "sends the current-user request with a Bearer token",
    (request) => {
      request("test-token");

      expect(get).toHaveBeenCalledWith("/auth/me", {
        headers: { Authorization: "Bearer test-token" },
      });
    },
  );
});
