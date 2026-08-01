export const prerender = false;

import type { APIRoute } from "astro";
import resumeData from "../content/resume.json";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(resumeData, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
