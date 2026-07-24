---
name: Maeterna
description: Patient-first Health Logging
cover: /assets/images/projects/maeterna.png
deployment: https://momhealth.app
order: 1
technologies:
  [Hono, React, TanStack Router, TanStack Query, TypeScript, Tailwind CSS, SQLite (Cloudflare D1), Cloudflare R2, Better Auth, Google OAuth, Drizzle ORM, OpenAPI]
---

A maternal health monitoring platform built for high-risk pregnant patients and Obstetrician/Gynaecologists in Trinidad & Tobago and the wider Caribbean. It replaces paper-based, disorganised tracking of blood glucose and blood pressure readings with a structured system where patients own their health data and explicitly control who can see it.

![Comparison of paper-based workflow and mobile UI](maeterna/compare.png)

Maeterna features a mobile-first interface for patients and a highly detailed dashboard for doctors which includes chart-based representation of data, automatic gestational age calculation and the ability to set patient flags.

![Blood glucose chart with normal bands](maeterna/chart.png)

![Smart categorisation of meals based on time](maeterna/log.png)


### Key Features

- Patient-owned data & consent model — patients log glucose and blood pressure readings and explicitly grant or revoke access to individual doctors or entire hospital departments.
- Clinical dashboard for doctors: glucose and BP charts with per-reading severity colouring, shaded threshold bands, fasted vs non-fasted markers and time-range filtering.
- Glucose and BP readings organized into date-row tables (Fasted/meal columns; AM/PM columns) instead of flat chronological lists, with automatic slot assignment from reading timestamps
- Per-patient severity thresholds: doctors have the ability to override threshold defaults for patients who are above or below normal ranges (eg, insulin-resistant cases)
Flexible institution model: patients can share readings with an entire hospital department if they belong to the public clinic.
