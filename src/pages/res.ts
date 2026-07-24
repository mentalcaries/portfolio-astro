export const prerender = false;

import type { APIRoute } from "astro";

interface ResumeEntry {
  title: string;
  meta: string | null;
  bullets: string[];
}

interface ResumeSection {
  title: string;
  entries: ResumeEntry[];
  text: string[];
}

interface ResumeData {
  name: string | null;
  contact: string | null;
  sections: ResumeSection[];
}

function stripInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .trim();
}

function parseResumeMd(markdown: string): ResumeData {
  const lines = markdown.split("\n");
  const result: ResumeData = { name: null, contact: null, sections: [] };

  let currentSection: ResumeSection | null = null;
  let currentEntry: ResumeEntry | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") continue;

    const h1 = line.match(/^#\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    const bullet = line.match(/^[-*]\s+(.*)/);

    if (h1) {
      result.name = stripInline(h1[1]);
    } else if (h2) {
      currentSection = { title: stripInline(h2[1]), entries: [], text: [] };
      currentEntry = null;
      result.sections.push(currentSection);
    } else if (h3) {
      currentEntry = { title: stripInline(h3[1]), meta: null, bullets: [] };
      currentSection?.entries.push(currentEntry);
    } else if (bullet) {
      const text = stripInline(bullet[1]);
      if (currentEntry) currentEntry.bullets.push(text);
      else if (currentSection) currentSection.text.push(text);
    } else {
      const text = stripInline(line);
      if (!result.name) continue;
      if (!currentSection) {
        result.contact = result.contact ? result.contact + " " + text : text;
      } else if (currentEntry && !currentEntry.meta) {
        currentEntry.meta = text;
      } else if (currentEntry) {
        currentEntry.bullets.push(text);
      } else {
        currentSection.text.push(text);
      }
    }
  }

  return result;
}

// Vite glob import — reads the raw file content as text at build/dev time,
// without Astro intercepting it as a markdown component, and without node:fs.
const modules = import.meta.glob("../content/resume.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const resumeRaw = Object.values(modules)[0] as string;

export const GET: APIRoute = async () => {
  const data = parseResumeMd(resumeRaw);

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
