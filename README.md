# David Nguyen: architectural BIM portfolio

Single-page portfolio built with React, TypeScript and Vite.

## Run

```
npm install
npm run dev
```

## Projects

Each project is a folder in `projects/` named `NN - Title` containing a `description.md` and its images.
After changing that folder, run:

```
npm run import-projects
```

This compresses the images into `public/projects/` and writes `src/sample-projects.json`.

Name, role, email, skills and the test-version switch are in `src/data.ts`.
