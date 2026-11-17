import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "klka-demo-app" });
});

app.get("/api/message", (_, res) => {
  res.json({
    message: "Hello from a Klka-hosted full-stack app!",
    time: new Date().toISOString()
  });
});

app.get("/", (_, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Klka Demo App</title>
        <style>
          body { font-family: system-ui; background:#0b1020; color:#fff; max-width:700px; margin:80px auto; padding:24px }
          button { background:#58d6a7; border:0; padding:12px 16px; border-radius:8px; font-weight:bold; cursor:pointer }
          pre { background:#121c32; padding:16px; border-radius:8px; color:#b8ffd9 }
        </style>
      </head>
      <body>
        <h1>Klka Full-Stack Demo</h1>
        <p>This frontend is served by a Node.js backend container.</p>
        <button onclick="loadMessage()">Call API</button>
        <pre id="result">Click the button to call /api/message</pre>
        <script>
          async function loadMessage() {
            const response = await fetch("/api/message");
            document.getElementById("result").textContent =
              JSON.stringify(await response.json(), null, 2);
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log("App running on port " + port);
});
