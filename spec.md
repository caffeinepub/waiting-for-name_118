# GRINDTRACKER

## Current State
Premium is a permanent one-time unlock via access codes (per-user or universal master code). Admin approves applications and generates codes. There is no expiry, billing cycle, or monthly subscription concept. The `isPremium` map stores a simple Bool per user.

## Requested Changes (Diff)

### Add
- `monthlyExpiry: ?Int` field to track when a user's monthly subscription expires (nanosecond timestamp)
- Backend function `grantMonthlyAccess(user: Principal, months: Nat)` — admin only, sets expiry = now + N months
- Backend function `revokeMonthlyAccess(user: Principal)` — admin only, clears expiry
- Backend function `isCallerMonthlyActive()` — returns Bool, true if user has unexpired monthly subscription OR permanent premium
- Backend function `getMonthlyExpiryDate(user: Principal)` — admin only, returns expiry timestamp
- Admin panel UI: new "Monthly Subscriptions" tab showing all users with subscription status, grant/revoke buttons, expiry dates, and a text field to grant N months
- Admin panel: show each user's monthly subscription status alongside their premium application

### Modify
- `isCallerPremium()` — now returns true if user has permanent premium OR active monthly subscription
- `PremiumGate` component — uses updated `isCallerPremium()` which now includes monthly check
- Admin panel applications list — add monthly subscription controls per user row
- `PremiumStatus` type — add `monthlyExpiry: ?Int` field

### Remove
- Nothing removed

## Implementation Plan
1. Update backend `PremiumStatus` type to include `monthlyExpiry: ?Int`
2. Add `grantMonthlyAccess`, `revokeMonthlyAccess`, `isCallerMonthlyActive` backend functions
3. Update `isCallerPremium()` to also return true if monthly subscription is active (not expired)
4. Update AdminPage.tsx: add monthly subscription management controls — grant months input + button, revoke button, show expiry date per user
5. No changes needed to PremiumGate (it already uses `isCallerPremium` which will now cover monthly)
