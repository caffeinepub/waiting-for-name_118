# GRINDTRACKER

## Current State

The app is a daily routine and productivity tracker with:
- Task management system with categories and priorities
- Spider/radar charts for category balance visualization
- Weekly task completion calendar with color-coded progress
- Streak tracking and productivity levels
- Achievement system
- User authentication via Internet Identity
- Cloud sync for cross-device access
- Historical data storage with daily spider chart snapshots

Current pain points:
- Loading screen is slow to appear and spinner is not centered
- Loading animations are basic with no visual polish
- Task adder dialog UI is functional but plain
- No AI-powered task suggestions or personalized recommendations

## Requested Changes (Diff)

### Add
- **AI Task Suggestion System**: Backend endpoint and frontend UI for generating personalized daily task suggestions based on user history, incomplete categories, and productivity patterns
- **Enhanced Loading Experience**: 
  - Faster initial render with optimized loading component
  - Centered loading spinner with smooth animations
  - Progress indicator or pulsing effects
  - Animated logo or branded loading experience
- **Redesigned Task Form Dialog**:
  - Modern card-based layout with better spacing
  - Animated form elements with smooth transitions
  - Visual category icons or color indicators
  - Priority badges with distinctive styling
  - AI suggestion button integrated into task creation flow
- **AI Suggestions Panel**: Dedicated section in dashboard showing AI-recommended tasks based on patterns

### Modify
- **ProtectedRoute loading screen**: Center spinner, add animations, show branded loading experience
- **Dashboard loading screen**: Match new loading design standards
- **TaskFormDialog component**: Complete visual overhaul with better UX and AI integration

### Remove
- Basic plain loading spinners without animations
- Plain form inputs without visual hierarchy

## Implementation Plan

1. **Backend - AI Task Generation**:
   - Add endpoint `generateTaskSuggestions()` that analyzes user's task history, completion patterns, weak categories, and time of day
   - Returns array of suggested tasks with reasoning (e.g., "You haven't done fitness in 3 days")
   - Consider user's typical categories and priorities from past data

2. **Frontend - Loading Screen Improvements**:
   - Create new `LoadingScreen` component with centered spinner, smooth animations, and optional message
   - Add logo animation or pulsing diamond logo during load
   - Implement fade-in/fade-out transitions
   - Use in ProtectedRoute and Dashboard

3. **Frontend - Task Form Dialog Redesign**:
   - Redesign layout with better spacing and visual hierarchy
   - Add category color indicators and priority badges
   - Add smooth transitions and hover effects
   - Integrate "Get AI Suggestions" button that fetches and displays recommended tasks
   - Allow users to quick-add suggested tasks

4. **Frontend - AI Suggestions Panel**:
   - Add collapsible section in Dashboard showing 3-5 AI-recommended tasks
   - Display suggestions with reasoning text
   - One-click "Add" button for each suggestion
   - Refresh button to generate new suggestions

5. **Validation**: Ensure typecheck, lint, and build pass; test AI suggestions with various user histories

## UX Notes

- Loading screens should feel instant (<100ms to render) with smooth animations
- AI suggestions should feel helpful, not intrusive—placed in a dedicated section users can expand
- Task form should feel modern and polished with clear visual feedback
- Use existing design system colors and maintain dark mode consistency
- AI suggestions should be contextual (e.g., "Complete your fitness streak", "Balance your categories")
