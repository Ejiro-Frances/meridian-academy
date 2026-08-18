import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount and drain React's scheduler before jsdom teardown. Concurrent-mode
// callbacks queued via setImmediate can outlive a test file and then hit
// `window is not defined` once the environment is gone (flaky in CI).
// afterEach hooks run last-registered-first, so this runs before RTL's
// auto-cleanup hook; the explicit cleanup() keeps unmount work inside the
// drain below.
afterEach(async () => {
  cleanup();
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
});
