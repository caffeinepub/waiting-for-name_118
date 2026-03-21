# GRINDTRACKER

## Current State
- Friends page shows leaderboard with names, streaks, titles; no click-through to individual profiles
- No profile picture support anywhere in the app
- Routine page (premium) only copies tasks; no direct task creation for next day
- PublicUserStats has: displayName, currentStreak, highestStreak, totalTaskCompletions, level
- UserProfile has: name, preferences only
- Blob storage not yet integrated

## Requested Changes (Diff)

### Add
- Friend Profile Modal: clicking any user row in the leaderboard opens a modal showing their highest streak, total task completions, achievements (earned badges based on stats), earned titles (with rarity colors), and active/display title
- Active Title: users can select one of their earned wheel titles as their "display title" shown on their profile and leaderboard
- Profile Picture: users can upload a profile picture (via blob-storage); displayed in nav header, profile settings, and on friend profile modal
- Routine Next-Day Preset: new card in RoutinePage to add specific tasks directly for tomorrow (task name, category, priority, duration inputs)
- Backend: store activeTitle in PublicUserStats; store profilePictureUrl in a separate map; expose getProfilePicture(user) query; expose setActiveTitle(title) mutation

### Modify
- PublicUserStats: add `activeTitle: ?Text` field
- FriendsPage: add clickable rows with profile modal
- RoutinePage: add "Plan Tomorrow" section with task creation form
- Nav/Header: show user's own avatar if set

### Remove
- Nothing removed

## Implementation Plan
1. Backend: extend PublicUserStats with activeTitle field; add profilePicture map; add setActiveTitle, getProfilePicture, setProfilePicture functions; ensure updatePublicUserStats persists activeTitle
2. Frontend FriendsPage: add click handler on leaderboard rows; build FriendProfileModal component showing stats, achievements grid, titles with rarity colors
3. Frontend Profile: add profile picture upload button using blob-storage hook; display avatar in nav
4. Frontend WheelSpinPage: add "Set as Display Title" button next to each earned title
5. Frontend RoutinePage: add "Plan Tomorrow" card with form to add tasks for tomorrow's date using existing addTask backend function
