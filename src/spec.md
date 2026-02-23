# Daily Routine & Productivity Tracker

## Current State

The app currently stores all task data locally in browser storage using localStorage. This means:
- Data is device-specific and cannot be synced between devices
- Tasks, scores, streaks, and achievements are isolated to each browser
- Users cannot access their data from multiple devices (phone and laptop)
- No user authentication or identity management exists

The app has the following features:
- Task management (create, edit, delete, toggle completion)
- Daily productivity scoring
- Spider/radar chart for category balance
- Weekly performance tracking and analytics
- Streak tracking (daily and category streaks)
- Achievement/gamification system
- Calendar heatmap view
- Routine repetition capabilities

Current backend API only provides basic CRUD operations for tasks without user authentication:
- `createTask`, `updateTask`, `deleteTask`, `toggleTaskCompletion`
- `getTasksForDate`, `getTasksForDateRange`

## Requested Changes (Diff)

### Add
- User authentication using Internet Identity (ICP's native authentication system)
- User-specific data storage in backend (all tasks, streaks, achievements tied to authenticated user)
- Cloud-based data persistence so users can access their data from any device
- Login/logout UI flow
- Protected routes that require authentication
- User profile data storage (name, preferences, settings)

### Modify
- All backend task operations must be user-scoped (only return/modify tasks for authenticated user)
- Frontend must authenticate users before accessing app features
- All local storage data operations should be replaced with backend API calls
- Dashboard and all pages must check authentication status and redirect to login if needed

### Remove
- Local browser storage for tasks, streaks, and achievements
- Any localStorage-based data persistence

## Implementation Plan

1. **Select Authorization Component**
   - Add the `authorization` Caffeine component to enable user authentication and role-based access control

2. **Backend API Enhancement**
   - Regenerate backend with requirements for user authentication and user-scoped data storage
   - All task operations must be tied to the authenticated user's Principal ID
   - Add user profile management endpoints
   - Add endpoints for syncing all user data (tasks, streaks, achievements)

3. **Frontend Authentication Integration**
   - Add Internet Identity authentication flow
   - Create login page with authentication UI
   - Implement auth context/provider for managing user session state
   - Add logout functionality
   - Protect all routes to require authentication
   - Show user identity/profile in UI (header/navbar)

4. **Data Migration Strategy**
   - On first login, check if user has local data
   - Offer to migrate existing local data to cloud
   - Clear local storage after successful migration

5. **Cross-Device Sync**
   - Replace all localStorage reads/writes with backend API calls
   - Ensure all data operations go through authenticated backend
   - Test data persistence across multiple devices

## UX Notes

- Users should be greeted with a login screen on first visit
- Login flow should be simple and use Internet Identity (no password required)
- After login, users should see their existing data or empty state if new user
- User identity should be visible in the app header with logout option
- Seamless experience: once logged in, the app should work exactly as before but with cloud sync
- All existing features (tasks, charts, streaks, achievements) remain unchanged in functionality
- Users can access the same data from phone, laptop, or any browser after logging in
