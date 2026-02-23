# GRINDTRACKER

## Current State

The app has user authentication with Internet Identity and authorization-based access control. When users log in, they are authenticated but not automatically granted the `#user` permission required to access profile and task data. The `getCallerUserProfile` function checks for `#user` permission before returning the profile, causing an authorization error that manifests as an infinite loading state when the query fails and retries.

## Requested Changes (Diff)

### Add
- Auto-registration system that grants `#user` permission to new authenticated users
- Backend endpoint to register/initialize new users with proper permissions
- Frontend logic to handle first-time user registration seamlessly

### Modify
- `ProtectedRoute.tsx`: Add error handling and retry logic to detect authorization failures
- `useQueries.ts`: Update `useGetCallerUserProfile` to handle errors gracefully and prevent infinite loading
- Backend profile access: Allow profile retrieval to return null for new users without trapping on permission errors

### Remove
- (None)

## Implementation Plan

1. **Backend**: Add auto-registration logic that grants `#user` permission when a new principal first attempts to access their profile
2. **Backend**: Modify `getCallerUserProfile` to auto-grant `#user` permission for authenticated non-anonymous users if they don't have it yet
3. **Frontend**: Add error boundary in `useGetCallerUserProfile` to prevent infinite retry loops
4. **Frontend**: Update `ProtectedRoute` to handle authorization errors and show appropriate error messages

## UX Notes

After this fix, when users reload the page:
- Authentication initializes → identity restored from storage
- Actor initializes → backend connection established
- Profile loads → user is auto-granted permissions if needed → profile returns (null for new users or existing profile)
- New users see profile setup dialog, existing users proceed to dashboard
- No more infinite "Loading your profile..." state
