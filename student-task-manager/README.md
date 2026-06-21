# Student Task Manager

A full-stack Student Task Manager web application built with React, Tamagui, Hono, and oRPC.

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 10+

## Install

```bash
npm install
```

## Run Development

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3000

## Build

```bash
npm run build
```

## Type Check

```bash
npm run typecheck
```

## Notes

- Task data persists in the browser's `localStorage` only (no server database in v1).
- The Hono + oRPC server is scaffolded for future server-side persistence.
- All CRUD operations are client-side with immediate `localStorage` sync.
