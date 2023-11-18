import axios from "axios";

function testLogin(id: number) {
  return axios.get(`/api/auth/login/user${id}@example.com`);
}
export { testLogin };
