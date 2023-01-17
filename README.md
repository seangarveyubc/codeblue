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
```bash
npm run prestorybook # Add any newly written stories
npm run storybook # Start storybook server
```
in a new terminal 
```bash
npx react-native run-android # Start emulator/ app
```
**Notes:** 
- Might need to run `export NODE_OPTIONS=--openssl-legacy-provider` first if seeing a `digital envelope routines::unsupported` error (MacOS)
- The navigator/ menu bar on browser at url `http://localhost:7007/?path=/story/*` does not load, view stories in the emulator instead

### Integration Testing
- [Jest](https://jestjs.io/)

### E2E Testing
- manual


## Debugging
Quick debugging tips for how to solve common errors:
- run `npm i` to install all dependencies
- Storybook on MacOS: Might need to run `export NODE_OPTIONS=--openssl-legacy-provider` first if seeing a `digital envelope routines::unsupported` error
- Reboot android device
- Google the error message or ask in group. Most likely someone else has ran into the same error
