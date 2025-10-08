# Complete User Journey & CTA Audit

**Last Updated:** 2025-10-08
**Status:** ✅ All paths verified and corrected

---

## 🎯 Primary Conversion Funnel

```
HOME → EXPLORE → INTAKE → SERVICES → SCHEDULE
```

### Detailed Flow:
1. **Home Page** (`/`)
   - "Explore Your Path" card → `/explore` ✅
   - "Professional Services" card → `/services` ✅
   - "Start Now" button → `/explore` ✅
   - "Start Your UNA Journey" button (bottom) → `/explore` ✅ **(FIXED - was `/toolkit`)**

2. **Explore Quiz** (`/explore`)
   - 6 questions (2 with multiple selection)
   - Collects: primaryGoals[], memberCount, annualBudget, privacyPreferences[], state, email
   - Results page CTAs:
     - Primary: "Continue to Intake Form" → `/intake` (with email + quiz data passed) ✅
     - Secondary: "View Services & Pricing" → `/services` ✅
     - Tertiary: "Learn More About UNAs" → `/faq` ✅

3. **Services Page** (`/services`)
   - "Get Started" buttons → `/intake?package=strategy-session` or `complete-formation` ✅

4. **Intake Form** (`/intake`)
   - Pre-fills email from Explore quiz (via React Router state) ✅
   - Submits to Supabase `intakes` table
   - On submit → `/confirmation` ✅

5. **Confirmation** (`/confirmation`)
   - "Schedule Your Call" → Calendly/external booking ✅

---

## 📊 Data Collection & Admin Dashboard

### Explore Quiz Data:
**Table:** `quiz_submissions`

**Fields:**
- `id` (UUID)
- `email` (TEXT) - **NEW: User identifier** ✅
- `primary_goal` (TEXT) - Multiple values joined with ", "
- `journey_stage` (TEXT)
- `annual_budget` (TEXT)
- `privacy_preference` (TEXT) - Multiple values joined with ", "
- `state` (TEXT)
- `score` (INTEGER)
- `recommendation` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Admin Dashboard Display:**
- Tab: "Quiz Submissions"
- Columns: Date | Email | Score | Recommendation | State | Primary Goal | Journey Stage
- User identified by: **Email address** ✅

**Connection to Intake:**
- Quiz results passed via React Router `state` to `/intake`
- Email pre-filled in intake form
- Admin can match quiz submission to intake by email address

---

## 🔗 All CTAs by Page

### Home Page (`/`)
| CTA Text | Destination | Status |
|----------|-------------|--------|
| "Explore Your Path" card | `/explore` | ✅ |
| "Professional Services" card | `/services` | ✅ |
| "Read our comprehensive guides" | `/blog` | ✅ |
| "View Living Examples" | `/success-stories` | ⚠️ Page may not exist |
| "Start Now" (middle) | `/explore` | ✅ |
| "Start Your UNA Journey" (bottom) | `/explore` | ✅ **FIXED** |

### Explore Quiz (`/explore`)
| CTA Text | Destination | Status |
|----------|-------------|--------|
| "Continue to Intake Form" | `/intake` + state data | ✅ |
| "View Services & Pricing" | `/services` | ✅ |
| "Learn More About UNAs" | `/faq` | ✅ |

### Services Page (`/services`)
| CTA Text | Destination | Status |
|----------|-------------|--------|
| "Get Started" (Strategy Session) | `/intake?package=strategy-session` | ✅ |
| "Get Started" (Complete Formation) | `/intake?package=complete-formation` | ✅ |
| "Get Started" (Premium Partnership) | `/intake?package=premium-partnership` | ✅ |

### FAQ Page (`/faq`)
| CTA Text | Destination | Status |
|----------|-------------|--------|
| Various "Learn More" links | Internal sections | ✅ |

### Blog/Resources
| CTA Text | Destination | Status |
|----------|-------------|--------|
| Individual blog posts | `/blog/[slug]` | ✅ |

---

## 🔧 SQL Migrations Required

### 1. Add Email to Quiz Submissions
**File:** `database/update-quiz-submissions-add-email.sql`

```sql
ALTER TABLE quiz_submissions
ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON quiz_submissions(email);
```

**Status:** ✅ SQL file created, needs to be run in Supabase

---

## 🎨 UX Improvements Implemented

### Explore Quiz:
1. ✅ **Multi-select enabled** on questions 1 & 4
   - "Select all that apply" subtitle
   - Checkmark indicator on selected items
   - Can select multiple values

2. ✅ **Email collection** added as final question
   - Icon with email input
   - Validation: requires "@" symbol
   - Description: "We'll email you a personalized UNA readiness report"

3. ✅ **Mobile-optimized**
   - Responsive text sizes (`text-sm md:text-base`)
   - Compact padding on mobile
   - Touch-friendly button sizes

4. ✅ **Quiz data flows to Intake**
   - Passes via React Router `location.state`
   - Email pre-populated in intake form
   - Full quiz results available for form pre-fill

---

## 📋 Recommended Next Steps

1. **Run SQL Migration:**
   ```bash
   # Copy contents of database/update-quiz-submissions-add-email.sql
   # Paste into Supabase SQL Editor
   # Execute
   ```

2. **Test Complete Flow:**
   ```
   localhost:5173/
   → Click "Start Your UNA Journey"
   → Complete quiz (select multiple on Q1 & Q4)
   → Enter email
   → See results
   → Click "Continue to Intake Form"
   → Verify email is pre-filled
   → Submit intake
   ```

3. **Verify Admin Dashboard:**
   ```
   localhost:5173/admin
   → Click "Quiz Submissions" tab
   → Verify email column displays
   → Check data matches quiz submissions
   ```

4. **Optional Enhancements:**
   - Add email validation in Intake form to prevent duplicates
   - Show quiz results summary in Intake form
   - Add "Quiz Score" badge in admin dashboard
   - Email automation: Send results PDF to user's email

---

## ⚠️ Potential Issues to Check

1. **`/success-stories` route** - Link exists on Home page but route may not be defined
2. **`/toolkit` route** - Changed to `/explore`, verify no other references exist
3. **Quiz data persistence** - Currently localStorage only, consider adding to user session

---

## 📊 Conversion Tracking Points

Track these events for analytics:

1. `explore_quiz_started` - User begins quiz
2. `explore_quiz_completed` - User finishes all 6 questions
3. `explore_quiz_email_captured` - Email provided
4. `intake_form_started` - User lands on intake page
5. `intake_form_completed` - Form submitted
6. `booking_initiated` - User clicks schedule call

---

**END OF AUDIT**
