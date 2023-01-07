# CodeBlue

## Authors
CPEN 491 JY-41 Modular Phone App for Cardiac Arrest Detection

Akash Randhawa, Emily Lukas, Gurman Toor, Sean Garvey, Stella Wang

## Repository Structure
    CodeBlue
    ├── algorithm
    ├── android
    ├── src/app
    |   ├── assets
    |   |    |   constants
    |   |    └── images
    |   ├── components
    |   |    └── utils
    |   ├── navigation
    │   └── screens
    └── ...

## Best Practices
1. Update tickets on Clickup to track progress
2. Submitting PR's
    1. Upload screenshots/ recordings of changes when available
    2. Request everyone to review
    3. Merge changes after 1-2 approvals (depending on size of PR)
      - When merging, choose the "Squash and merge" option
      - Prettier bot will automatically append a `Prettified code!` commit to each PR

## Testing
#### UI Component Testing
- Run [Storybook](https://storybook.js.org/) using `yarn storybook` or `npm run strorybook`
- Might need to run `export NODE_OPTIONS=--openssl-legacy-provider` first if seeing a `digital envelope routines::unsupported` error (MacOS)

#### UI and Integration Testing
- [Jest](https://jestjs.io/)

#### E2E Testing
- manual