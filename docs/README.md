# LearnSelf AI documentation

Use this folder as the project’s technical and product reference.

## Documents

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — application layers, progress data, tutor request flow, validation, and operational boundaries.
- [`PRODUCT.md`](./PRODUCT.md) — product goal, learner journey, trade-offs, proposed measures, and roadmap.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — local setup, environment variables, Vercel deployment, verification, and troubleshooting.
- [`bugs.md`](./bugs.md) — known limitations, reliability notes, and how to report a new issue.

## Documentation maintenance

- Keep descriptions aligned with the implementation; code is the source of truth for runtime behavior.
- Mark proposals and hypotheses as such. Do not describe planned features as already available.
- Do not put credentials, private learner data, or unsanitized provider logs in documentation.
- Update the architecture and known-limitations pages when changing storage, API contracts, deployment settings, or user-facing behavior.
- The repository root [`README.md`](../README.md) remains the quick-start page for contributors.
