import axios from "axios";

function testLogin() {
  return axios.get("/api/auth/login/user2@example.com");
}
export { testLogin };
