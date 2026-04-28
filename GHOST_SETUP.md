# Ghost Setup

This repo now contains a deployable Ghost theme in `ghost-theme/`.

## 1. Create a Ghost custom integration

In Ghost Admin, go to **Settings -> Integrations** and create a custom integration.

Copy:

- `Admin API URL`
- `Admin API Key`

## 2. Add GitHub Actions secrets

In your GitHub repo:

**Settings -> Secrets and variables -> Actions**

Create:

- `GHOST_ADMIN_API_URL`
- `GHOST_ADMIN_API_KEY`

## 3. Upload routes once in Ghost

This theme uses custom static routes for the 20 team pages.

In Ghost Admin, go to **Settings -> Labs** and upload [ghost-routes.yaml](ghost-routes.yaml).

That will create routes like:

- `/arsenal/`
- `/man-utd/`
- `/spurs/`

## 4. Push to deploy

The workflow file at `.github/workflows/deploy-theme.yml` will deploy the theme from `ghost-theme/` automatically on every push to `main`.
