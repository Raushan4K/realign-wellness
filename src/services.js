import http from "./http-common";

class Login {
  verifyOtpLogin(body) {
    return http.post("/auth/verify-otp", body);
  }

  requestOtpLogin(body) {
    return http.post("/auth/request-otp", body);
  }

  register(body) {
    return http.post("/auth/register", body);
  }

  getCurrentUserProfile() {
    return http.get("/users/me");
  }
}

const LoginService = new Login();

export { LoginService };
