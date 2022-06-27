import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/*
Токен уровня компании дает возможность поизводить действия с данными напрямую, 
без проверки прав доступа отдельного сотрудника. Перед началом работы нужно 
получить токен методом /v1/company/auth/getToken и далее отправлять его 
в заголовке при каждом запросе.

Срок жизни токена - 7 дней, однако рекомендуется получать токен 
каждый раз при работе с API, и по окончании 
удалять его методом /v1/company/auth/revokeToken
*/

const GET_TOKEN_URL = "/v1/company/auth/getToken";
const REVOKE_TOKEN_URL = "/v1/company/auth/revokeToken";
const UPDATE_TOKEN_PERIOD = 518400000; // 6 days

const instance = axios.create({
  baseURL: "https://api.moyklass.com",
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

async function setToken() {
  const token = await instance.post(
    GET_TOKEN_URL,
    JSON.stringify({
      apiKey: process.env.MOY_KLASS_API_KEY,
    })
  );

  instance.defaults.headers.common["x-access-token"] = token.data.accessToken;
  console.log("setToken");
}

async function revokeToken() {
  await instance.post(REVOKE_TOKEN_URL);
  console.log("revokeToken");
}

async function updateToken() {
  await revokeToken();
  await setToken();
  console.log("updateToken");
}

await setToken();

setInterval(async () => {
  await updateToken();
}, UPDATE_TOKEN_PERIOD);

export default instance;
