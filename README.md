# CodeBlue

## Authors
CPEN 491 JY-41 Modular Phone App for Cardiac Arrest Detection

Akash Randhawa, Emily Lukas, Gurman Toor, Sean Garvey, Stella Wang

## Repository Structure
    CodeBlue
    ├── algorithm/
    ├── android/
    ├── src/app/
    |   ├── constants/
    |   |    └── images/
    |   ├── components/
    |   ├── navigation/
    │   └── screens/
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
### UI Component Storybook
To run the components Storybook set the `STORYBOOK_START` variable in `./App.tsx` to be `true`. Then run:
```bash
npm run storybook # Start storybook server
```
in a new terminal 
```bash
npx react-native run-android # Start emulator/ app
```
If needed, add any newly written stories by running 
```bash
npm run prestorybook # Add any newly written stories
```

**Notes:** 
- Might need to run `export NODE_OPTIONS=--openssl-legacy-provider` first if seeing a `digital envelope routines::unsupported` error (MacOS)
- Storybook also opens on the browser using an arbitrary local ip but it renders the components on the connected device/ emulator anyways so I would just close and ignore the browser
- Set the `STORYBOOK_START` variable in `./App.tsx` back to `false` to run CodeBlue app

### Integration Testing
- [Jest](https://jestjs.io/)

### E2E Testing
- manual


## Debugging
Quick debugging tips for how to solve common errors:
- run `npm i` to install all dependencies
- Storybook on MacOS: Might need to run `export NODE_OPTIONS=--openssl-legacy-provider` first if seeing a `digital envelope routines::unsupported` error
- Reboot android device/ emulator
