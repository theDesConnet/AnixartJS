const { Anixart, AnixartError, HttpError } = require("../dist/index");

async function main() {
  const profileId = Number(process.argv[2]);

  if (!Number.isSafeInteger(profileId) || profileId <= 0) {
    throw new Error("Передайте положительный ID: node examples/getProfile.js 171123");
  }

  const client = new Anixart({});
  if (process.env.ANIXART_TOKEN) client.setToken(process.env.ANIXART_TOKEN);

  const controller = new AbortController();
  const cancel = () => controller.abort();
  process.once("SIGINT", cancel);

  try {
    console.log("Запрашиваем профиль. Ctrl+C отменяет запрос.");
    const { profile } = await client.endpoints.profile.get(profileId, {
      signal: controller.signal,
      timeoutMs: 15_000,
    });

    console.table([{
      id: profile.id,
      login: profile.login,
      status: profile.status,
      watching: profile.watching_count,
      completed: profile.completed_count,
      friends: profile.friend_count,
    }]);
  } finally {
    process.removeListener("SIGINT", cancel);
  }
}

main().catch((error) => {
  process.exitCode = 1;

  if (error instanceof AnixartError) {
    console.error(`Ошибка Anixart: код ${error.code} (${error.codeName}), endpoint ${error.path}`);
    return;
  }

  if (error instanceof HttpError) {
    console.error(`Ошибка HTTP: ${error.status}`);
    return;
  }

  if (error instanceof Error && error.name === "AbortError") {
    console.error("Запрос отменён.");
    process.exitCode = 130;
    return;
  }

  if (error instanceof Error && error.name === "TimeoutError") {
    console.error("Сервер не ответил за 15 секунд.");
    return;
  }

  console.error(error instanceof Error ? error.message : String(error));
});
