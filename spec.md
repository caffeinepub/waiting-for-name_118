# GRINDTRACKER v28

## Current State
- Landing/Login page: dark SaaS-style with hero, stats bar, features grid, CTA. Violet/fuchsia palette hardcoded.
- Dashboard: header, WeeklyTaskCalendar, score card, StreakDisplay, ProductivityLevelCard, task list, CategoryRadarChart, Suggestions panel.
- ProductivityLevelCard shows text-based productivity level.
- Routine page: premium-only with next-day presetting.
- Friends page: leaderboard. Profile viewing supported.
- App pages use default shadcn tokens while login uses hard-coded dark palette — inconsistent.

## Requested Changes (Diff)

### Add
- Global Theme System: unified dark theme CSS vars across all pages matching login page palette (deep dark bg, violet/fuchsia accents).
- Login: tagline "Become the top 1% disciplined person", animated background (floating particles/gradient), spider chart preview, Routine Mode demo button.
- Dashboard Weekly Section: weekly progress bar chart, task completion summary, weekly improvement %.
- Routine Mode toggle on Dashboard: transforms to Advanced Mode with large score circle, spider chart, pie chart, weekly graph, task stats, Weekly Tick System (Mon-Sun checklist, future days locked).
- Rank System: replace ProductivityLevelCard with 8-tier rank (Rookie/Focused/Consistent/Disciplined/Elite/Beast/Machine/Apex). Each rank has icon image + glow color. Shown on Dashboard, Profile, Friends.
- 8 rank icon images (minimal + glowing, different color per rank).
- Friends Motivation Alerts: show inline alerts when friend has streak >= 7 or daily tasks >= 10.
- Profile fix: ensure username/tasks/rank/streak/weekly stats display correctly.
- UX Empty States: "Start building your grind 💪" instead of "No tasks".
- Progress Insights: weekly improvement % on dashboard.
- Goal Setting: user sets daily/weekly targets.
- Daily Reminder: browser notification if no tasks by noon.

### Modify
- index.css: unified dark theme CSS variables used everywhere.
- Dashboard.tsx: Routine Mode toggle, weekly section, RankCard, better empty states.
- LoginPage.tsx: tagline, animated bg, spider chart preview, routine mode preview button.
- FriendsPage.tsx: rank badge per friend, motivation alerts.
- Profile: fix data fetching, show rank + stats.
- RoutinePage.tsx: Weekly Tick System.

### Remove
- ProductivityLevelCard beginner-style text level (replaced by RankCard).

## Implementation Plan
1. Generate 8 rank icon images.
2. Update index.css with unified dark theme.
3. Add getRank() helper in taskCalculations.ts.
4. Create RankCard.tsx component.
5. Update Dashboard with Routine Mode toggle, advanced view, weekly section, empty states, goals.
6. Update LoginPage with tagline, animated bg, spider preview.
7. Update FriendsPage with rank badges + motivation alerts.
8. Fix Profile data fetching and display.
9. Add weekly tick system to RoutinePage.
10. Wire Notification API for daily reminder.
