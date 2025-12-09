export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM events").all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    const data = await request.json();
    await env.DB.prepare(
      "INSERT INTO events (title, date, description) VALUES (?, ?, ?)"
    )
    .bind(data.title, data.date, data.description)
    .run();
    return new Response("Event added", { status: 200 });
  }
}
