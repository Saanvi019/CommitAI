import http from "http";

export function waitForToken() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost:9900");
      const token = url.searchParams.get("token");

      if (!token) {
        res.end("❌ Authentication failed");
        server.close();
        return reject("No token");
      }

      res.setHeader("Content-Type", "text/html");
res.setHeader("Content-Type", "text/html");
res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CommitAI – Login Successful</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0c0f14;
      font-family: "Inter", system-ui, sans-serif;
      color: #e2e8f0;
      overflow: hidden;
    }

    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 40px;
      border-radius: 18px;
      width: 380px;
      text-align: center;
      animation: fadeIn 0.5s ease-out;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 40px rgba(0,0,0,0.4);
    }

    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    h2 {
      font-weight: 600;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtext {
      font-size: 15px;
      opacity: 0.65;
    }

    .btn {
      margin-top: 25px;
      padding: 12px 20px;
      text-decoration: none;
      display: inline-block;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: white;
      font-size: 15px;
      font-weight: 500;
      border-radius: 10px;
      box-shadow: 0 0 18px rgba(99, 102, 241, 0.4);
      transition: 0.25s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px rgba(99, 102, 241, 0.55);
    }

    .timer {
      margin-top: 15px;
      font-size: 13px;
      opacity: 0.5;
    }
  </style>

  <script>
    // Auto-close window after 3 seconds
    setTimeout(() => {
      window.close();
    }, 3000);

    // Redirect to docs as fallback
    setTimeout(() => {
      window.location.href = "https://commitai.dev/docs";
    }, 3000);
  </script>

</head>

<body>
  <div class="card">
    <h2>Login Successful</h2>
    <p class="subtext">You're now authenticated. Return to your terminal.</p>

    <a href="https://commitai.dev/docs" class="btn">Go to Documentation</a>

    <div class="timer">This window will close in 3 seconds…</div>
  </div>
</body>
</html>
`);


      server.close();
      resolve(token);
    });

    server.listen(9900, () => {
      console.log("⏳ Waiting for GitHub login...");
    });
  });
}
