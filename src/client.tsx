import { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";

async function startApp() {
  const router = getRouter();

  // Load initial route state before first paint in pure SPA static hosting.
  await router.load();

  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Could not find root element");
  }

  startTransition(() => {
    createRoot(container).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });
}

void startApp();
