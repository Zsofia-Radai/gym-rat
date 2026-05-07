# GymRat

GymRat is a mobile-first workout planning and training log web app. It helps users create reusable workout templates, start live workout sessions from those templates, track sets during training, and review completed sessions later.

The project is built as a responsive React web app with a mobile-app style interface, so it works well in the browser today while keeping the interaction model close to a future mobile version.

<img width="1527" height="1207" alt="GymRat application screenshot" src="https://github.com/user-attachments/assets/cd16e914-b0b0-4fc9-b209-657c65c841ba" />

## Features

### Template management

- Create reusable workout templates.
- Add any number of exercises to a template.
- Configure each exercise with sets, reps, and weight.
- Edit existing templates.
- Delete templates with a confirmation modal.
- Persist templates in `localStorage`, so the data remains available after page refresh.

### Workout template details

- Open a template to review the planned workout before starting.
- See summary metrics for the template, including exercise count, total sets, and planned volume.
- Review each exercise in a scan-friendly card layout.
- Start a live workout session directly from the selected template.

### Live workout session tracking

- Generate a workout session from a saved template.
- Convert planned exercise data into editable set rows.
- Track reps and weight for each set.
- Add extra sets during a workout.
- Delete sets while logging.
- Mark sets as completed.
- Validate the session before saving, so incomplete sets are clearly highlighted.
- Show live workout progress based on completed sets.
- Show a running workout timer.
- Discard an active workout if needed.

### Session history

- View all completed workout sessions.
- See total session count and total training volume.
- Sort sessions with the newest sessions first.
- Open a completed session to review the workout details.
- Delete saved sessions with confirmation.
- Persist session history in `localStorage`.

### Completed session details

- Review a finished workout session.
- See the session date, duration, number of exercises, number of sets, and total volume.
- Inspect each completed exercise and its set-by-set reps and weight.

### Responsive UI

- Mobile-first layout with large touch-friendly controls.
- Desktop layout expands into wider cards and grids where useful.
- Shared app shell with top navigation for Templates and Sessions.
- CSS Modules are used for component-scoped styling.
- Global design tokens are defined in `src/index.module.css`.

## Tech Stack

- React 19
- React Router
- Vite
- Vitest
- Testing Library
- CSS Modules
- LocalStorage for browser-side persistence

## Project Structure

```txt
src/
  app/                 Error page
  components/ui/       Reusable UI components
  context/             Template state provider
  features/
    sessions/          Live session, session list, session details
    templates/         Template list, template form, details, editing
  hooks/               Reusable state and workflow hooks
  layout/              Shared app shell and navigation
  resources/           Images and icons
  utils/               Validation, formatting, and data creation helpers
```

## Key Implementation Details

### State and persistence

Templates are managed through `TemplatesContext`, which exposes template CRUD actions to the rest of the app. Sessions are managed in the top-level app state because multiple routes need access to the active and completed session list.

Both templates and sessions are synchronized to `localStorage`, keeping the app usable without a backend.

### Custom hooks

The app separates session workflow logic into custom hooks:

- `useSessions` handles live session form state, set updates, completion toggles, validation errors, and save behavior.
- `useSessionsActions` contains shared session actions such as deleting sessions.
- `useSessionsList` prepares sorted session history and total volume.
- `useSessionTimer` calculates and formats live workout duration.
- `useExercises` manages dynamic exercise rows inside template forms.

### Validation

Template validation checks required template names, exercise names, sets, reps, and weight values. Session validation checks whether all sets have been marked completed before saving.

### Styling

The UI uses CSS Modules throughout the app. Shared layout classes and reusable design primitives live in `src/layout/AppLayout.module.css`, while feature-specific styles stay next to their components.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Run the production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Current Test Coverage

The project uses Vitest and Testing Library for user-focused workflow tests. The current test suite covers:

- rendering the GymRat home screen
- showing the empty Templates state
- navigating to the Sessions tab
- showing the empty Sessions state
- creating a workout template through the UI
- displaying the saved template and success toast
- validating required template form fields

The next useful testing step would be adding workflow tests for:

- editing an existing template
- starting a workout session from a template
- completing sets during a live session
- saving a completed session
- opening a saved session detail page
- deleting templates and sessions

## Future Improvements

- Add TypeScript for stronger data-model safety.
- Add broader component and workflow tests.
- Add import/export for workout data.
- Add exercise categories or muscle groups.
- Add progressive overload insights.
- Add charts for volume and session frequency.
- Add backend sync and authentication.
- Package the app as a PWA for a more native mobile experience.
