import { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";

async function startApp() {
  const router = getRouter();

  const container = document;

  startTransition(() => {
    createRoot(container).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });

  // Keep route loading non-blocking so first paint is not delayed.
  void router.load();
}

void startApp();
