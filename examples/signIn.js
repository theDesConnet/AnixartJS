const { Anixart } = require("../dist/index");

async function main() {
  const login = process.env.ANIXART_LOGIN;
  const password = process.env.ANIXART_PASSWORD;

  if (!login || !password) {
    throw new Error("Укажите ANIXART_LOGIN и ANIXART_PASSWORD.");
  }

  const client = new Anixart({});
  const options = { timeoutMs: 15_000 };
  const result = await client.endpoints.auth.signIn({ login, password }, options);
  const token = result.profileToken?.token;

  if (!token) {
    throw new Error("Сервер не вернул токен авторизации.");
  }

  client.setToken(token);

  const { profile } = await client.endpoints.profile.get(result.profile.id, options);
  console.log("Вход выполнен:", profile.login);
  console.log("ID профиля:", profile.id);
  console.log("Токен установлен в клиент и не выводится в консоль.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
