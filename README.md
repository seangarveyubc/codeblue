# CodeBlue

## Authors
CPEN 491 JY-41 Modular Phone App for Cardiac Arrest Detection

Akash Randhawa, Emily Lukas, Gurman Toor, Sean Garvey, Stella Wang

## Repository Structure
CodeBlue
    ├── android/
    ├── assets/
    ├── codeblue-server/
    ├── docs/
    ├── src/app/
    |   ├── assets/
    |   ├── backgroundMode/
    |   ├── ble/
    |   ├── components/
    |   ├── constants/
    |   ├── emsCall/
    |   ├── localStorage/
    |   ├── navigation/
    |   ├── screens/
    │   └── utils/
    ├── storybook/
    ├── App.tsx
    ├── index.js
    ├── README.md
    └── ...

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
- update the corresponding `.stories` file if making changes to any component/screen
- Set the `STORYBOOK_START` variable in `./App.tsx` back to `false` to run CodeBlue app

### Integration Testing
- [Jest](https://jestjs.io/)

### E2E Testing
- manual


## Documentation
See `/docs/` for Requirements Document, Design Document, Verification & Validation document, List of Deliverables, and poster pdf. 

## Design
See `/docs/design/` for a pdf of CodeBlue's design or view the Figma here: [link](https://www.figma.com/file/7OU2D8eeyulnAefY1gSlYP/Capstone?node-id=157%3A5068&t=BwlZVMN370W3oOyi-1)

## Video
See `/src/app/assets/CodeBlue_V3.mp4` for product video. 
