# Development Environments

## Prerequirement

Please refer to the [setup guide](https://github.com/kms-grove/grove-enterprise/tree/develop/docs/system/setup.md)

## Setup

- Backend:

  - Create proxy to aws's infrastructure (database, redis, rabbitmq, nats, etc.)
    - sudo kubefwd services -n dev
  - yarn package:be
  - cd backend/services/<SERVICE_NAME>
  - yarn start:dev

- Frontend:

  - yarn package:fe
  - cd frontend/webapps/<WEBAPP_NAME>
  - yarn dev
  - Site: kms.localhost:3000

- Fullstack:

  - yarn package:all
  - cd backend/services/<SERVICE_NAME>
  - yarn start:dev

## DEPLOYMENT

- docker build -f ./deploy/backend.Dockerfile --build-arg SERVICE=<SERVICE_NAME> --build-arg VERSION=<SERVICE_VERSION> .
- docker build -f ./deploy/frontend.Dockerfile --build-arg SERVICE=<WEBAPP_NAME> --build-arg VERSION=<WEBAPP_VERSION> .

## COMMIT STEP

- wizard:
  - git add .
  - git commit (wizard to create commit message)

## COMMIT MESSAGE CONVENTION

- type: message lower case text here
- type(package-name): message lower case text here

- type:
  - feat: A new feature
  - fix: A bug fix
  - chore: Build process or auxiliary tool changes
  - perf: A code change that improves performance
  - test: Adding missing tests
  - docs: Documentation only changes
  - ci: CI related changes
  - style: Markup, white-space, formatting, missing semi-colons...
  - refactor: A code change that neither fixes a bug or adds a feature
