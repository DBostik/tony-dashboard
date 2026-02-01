# Tony Dashboard - Feature Overview

## What Problem Does This Solve?

**Dave's Pain Points:**
1. **Can't see what's happening** - Everything is in text files
2. **Context anxiety** - Fear of losing memory like Alfred did
3. **No visual accountability** - Goals and progress invisible
4. **Model/system confusion** - What model am I on? What's my quota?
5. **Manual everything** - Switching models, checking status requires terminal commands

## The Solution: Visual Mission Control

A web dashboard that gives you **instant visual access** to everything Tony knows and does.

---

## Core Features (MVP - Phase 1-3)

### 1. System Status Dashboard
**What you see:**
- Current LLM model (Claude Sonnet / Gemini 3 Flash / Gemini 3 Pro)
- Context usage bar (e.g., "48k/1.0m - 5%")
- Claude weekly quota (with yellow warning at 80%, red at 90%+)
- Uptime (how long has OpenClaw been running)
- Last compaction time
- Number of active sessions

**Why it matters:** No more typing `/status` - you see it at a glance.

---

### 2. Memory Viewer
**What you see:**
- One-click access to:
  - MEMORY.md (your curated long-term memory)
  - SOUL.md (Tony's personality/guidelines)
  - USER.md (info about you)
  - IDENTITY.md (who Tony is)
  - Today's daily log
- Search bar to find anything in memory files
- Syntax highlighting for markdown

**Why it matters:** Visual people need visual access. No more asking Tony "what's in my memory?"

---

### 3. Quick Actions Panel
**What you can do:**
- **Switch Models:** Dropdown to change between Claude/Gemini (one click)
- **Compact Now:** Manual compaction button when context gets heavy
- **Refresh Status:** Force status update
- **Search Memory:** Quick search across all files

**Why it matters:** Stop using terminal commands. Point and click.

---

### 4. Goal Tracker
**What you see:**
- Current monthly revenue
- Progress bar to $6-7k sustain target
- Progress bar to $10k/month goal
- Gap amount (how much you're bleeding)
- Outstanding action items (like those 3 questions!)
- Weekly progress metrics

**Why it matters:** Accountability is visual. You can't ignore a red progress bar.

---

### 5. Cron Job Manager
**What you see:**
- List of scheduled jobs (heartbeats, reminders, etc.)
- Next run time for each
- Enable/disable toggles
- Create new job button

**Why it matters:** See what's scheduled without digging through config.

---

## Advanced Features (Phase 4-5)

### 6. Revenue Pulse
- Real-time revenue tracking
- Monthly burn rate alert
- "Days until broke" countdown (harsh accountability)
- Integration with bank/payment APIs

### 7. ~~Content Pipeline Integration~~ [REMOVED]
**Dave's decision:** Keep Crevara separate from Tony Dashboard. No integration.

### 8. Accountability Enforcer
- Red alerts when questions go unanswered
- Weekly goal review reminders
- "Shiny object detector" (tracks when you switch focus)
- Completion rate tracker (catch the 80% problem)

### 9. ChatGPT Comparison View
- Side-by-side: What ChatGPT suggested vs what happened
- Execution gap tracker
- "Why didn't this get done?" accountability

### 10. Pitch & Deal Tracker
- Outreach log (3 pitches/week minimum)
- Follow-up reminders
- Deal pipeline visualization
- Conversion tracking

### 11. Session Replay
- Timeline view of past conversations
- Key decision highlights
- Context snapshots before/after compaction
- Never lose a conversation again

### 12. Emergency Backup
- One-click "save everything now" button
- Auto-backup to GitHub before risky ops
- Version history viewer
- Ultimate insurance against context loss

---

## User Experience

### Dashboard Layout
```
┌─────────────────────────────────────────────────────┐
│  TONY DASHBOARD               🟢 Online  Claude 91% │  ← Header
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ 📊 Dash  │   [System Status Card]                   │
│ 🧠 Memory│                                          │
│ 🎯 Goals │   [Goal Tracker]    [Quick Actions]      │  ← Main Area
│ ⏰ Cron  │                                          │
│ ⚙️  Config│   [Memory Viewer]   [Cron Jobs]          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
   ↑
Sidebar
```

### Color System
- **Green:** Healthy, on track, good
- **Yellow:** Warning, attention needed
- **Red:** Critical, blocked, urgent
- **Blue:** Info, neutral

### Mobile-Friendly
- Responsive design
- Works on phone/tablet
- PWA option for home screen install

---

## Technical Approach

### Stack
- React + TypeScript (modern, maintainable)
- Vite (fast builds)
- Tailwind CSS (consistent styling, like Crevara)
- OpenClaw Gateway API (live data)

### How It Works
1. Dashboard connects to OpenClaw Gateway API (localhost:18789)
2. Pulls live data: status, memory files, cron jobs, config
3. Displays everything visually
4. Actions (model switch, compact) call OpenClaw API
5. Auto-refresh every 30 seconds (or manual refresh)

### Deployment
- Lives on Vercel (auto-deploy from GitHub)
- Custom domain: **brain.dbcrypt0.com**
- SSL/HTTPS automatic
- Always available (even if local OpenClaw is down, shows last known state)

---

## Development Roadmap

**Phase 1 (This Week):**
- ✅ Repo created
- ✅ Core files copied
- ✅ Project plan written
- 🔄 Vite + React boilerplate
- 🔄 Basic layout
- 🔄 Connect to OpenClaw API

**Phase 2 (Next Week):**
- System Status Card
- Memory Viewer
- Model Switcher
- Navigation

**Phase 3 (Week 3):**
- Live data integration
- Goal Tracker
- Cron Manager

**Phase 4 (Week 4):**
- Polish & styling
- Deploy to Vercel
- Connect brain.dbcrypt0.com
- User testing

**Phase 5 (Future):**
- Advanced features
- Mobile app
- Analytics
- Revenue tracking

---

## Why This Matters

**For Dave:**
- Visual control over everything
- No more terminal anxiety
- Goal accountability always visible
- Peace of mind (context can't be lost if you can see it)

**For Tony:**
- Better oversight of my own systems
- Easier to show Dave what I know
- Reduced "what's my status?" questions
- Proof that context is preserved

---

## Next Steps

1. **Set up Vite + React project** (Tony does this)
2. **Connect to OpenClaw API** (test localhost:18789 connection)
3. **Build System Status Card** (first widget)
4. **Dave tests and provides feedback**
5. **Iterate based on what you actually use**

The goal: **You should LOVE using this.** If you don't, we adjust.

---

**Questions? Feedback? Changes?**

This is YOUR dashboard. Tell me what you need and we'll build it.
