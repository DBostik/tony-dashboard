# Tony Dashboard - Project Plan

## Current Status
**Phase:** Planning & Architecture  
**Status:** Ready for Architect  
**Last Updated:** Feb 1, 2026

## Current Step
Initial setup - defining core features and technical approach.

## Vision
A mission control dashboard that gives Dave visual oversight of his OpenClaw workspace, goals, and systems. Solves the problem of "I can't see what's happening" and provides quick access to memory, status, and controls.

## Core Principles
1. **Visual First:** Dave is a visual person - dashboards beat text files
2. **No Context Loss:** Everything Alfred lost, we preserve and display
3. **Accountability:** Goals, progress, and metrics always visible
4. **Quick Access:** One-click to memory files, status, model switching
5. **Real-Time:** Live data from OpenClaw, not stale snapshots

## Tech Spec

### Stack
- **Frontend:** React 18+ with TypeScript
- **Build Tool:** Vite (fast, modern)
- **Styling:** Tailwind CSS (like Crevara)
- **State Management:** React Context + Hooks (keep it simple initially)
- **Backend:** OpenClaw Gateway API (port 18789)
- **Deployment:** Vercel (auto-deploy from main branch)
- **Domain:** brain.dbcrypt0.com

### API Integration
- **OpenClaw Gateway:** http://localhost:18789/api
- **Auth:** Token-based (gateway.auth.token from config)
- **Endpoints Needed:**
  - `/api/status` - System status, model, context, uptime
  - `/api/sessions` - List sessions
  - `/api/memory/search` - Search memory files
  - `/api/files` - Read workspace files (MEMORY.md, SOUL.md, etc.)
  - `/api/cron` - List/manage cron jobs
  - `/api/skills` - List installed skills
  - `/api/config` - Get/update config

### File Structure
```
tony-dashboard/
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.tsx      # Main dashboard layout
│   │   ├── StatusCard.tsx     # System status widget
│   │   ├── MemoryViewer.tsx   # File viewer
│   │   ├── GoalTracker.tsx    # Revenue/goal tracking
│   │   ├── CronManager.tsx    # Cron job list
│   │   └── ModelSwitcher.tsx  # Quick model switching
│   ├── hooks/            # Custom React hooks
│   │   ├── useOpenClaw.ts     # OpenClaw API hook
│   │   └── useMemory.ts       # Memory file loading
│   ├── lib/              # Utilities
│   │   └── api.ts             # API client
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── README.md
├── PLAN.md              # This file
└── package.json
```

## Design Spec

### Layout
- **Header:** System status bar (model, context %, uptime, Claude quota)
- **Sidebar:** Navigation (Dashboard, Memory, Goals, Cron, Settings)
- **Main Area:** Widget grid (customizable layout)

### Color Palette
- **Primary:** Keep it dark mode friendly
- **Accent:** Use Dave's brand colors (check media kit for DBCrypto colors)
- **Status Colors:**
  - Green: Healthy / On track
  - Yellow: Warning / Attention needed
  - Red: Critical / Blocked
  - Blue: Info / Neutral

### Key Widgets (Priority Order)
1. **System Status Card**
   - Current model
   - Context usage (with visual bar)
   - Claude quota % (with warning at 80%+)
   - Uptime
   - Last compaction time

2. **Memory Quick View**
   - Links to: MEMORY.md, SOUL.md, USER.md, IDENTITY.md
   - Today's daily log preview
   - Memory search bar

3. **Goal Tracker**
   - Current monthly revenue
   - Gap to $6-7k/month sustain target
   - Gap to $10k/month goal
   - Progress bars
   - Outstanding action items

4. **Active Tasks**
   - Pull from memory files or TodoIst API
   - Due today / this week
   - Accountability items

5. **Cron Jobs**
   - List of scheduled jobs
   - Next run times
   - Enable/disable toggles

6. **Model Switcher**
   - Dropdown: Claude Sonnet, Gemini 3 Flash, Gemini 3 Pro
   - Shows current selection
   - One-click switch

7. **Quick Actions**
   - Compact now
   - Search memory
   - View session history
   - Check status

## Roadmap

### Phase 1: Foundation (Week 1)
- [x] Repo created
- [x] Core workspace files copied
- [x] Skills imported (architect, engineer, designer, sentinel)
- [ ] Vite + React + TypeScript boilerplate
- [ ] Tailwind CSS setup
- [ ] Basic layout (header, sidebar, main area)
- [ ] OpenClaw API client (test connection to localhost:18789)

### Phase 2: Core Widgets (Week 2)
- [ ] System Status Card
- [ ] Memory Quick View (static files first)
- [ ] Model Switcher (call OpenClaw API)
- [ ] Navigation working

### Phase 3: Data Integration (Week 3)
- [ ] Live status from OpenClaw API
- [ ] Memory file viewer with syntax highlighting
- [ ] Goal Tracker (connect to revenue tracking)
- [ ] Cron job list/management

### Phase 4: Polish & Deploy (Week 4)
- [ ] Dark mode styling
- [ ] Responsive design (mobile-friendly)
- [ ] Deploy to Vercel
- [ ] Connect brain.dbcrypt0.com domain
- [ ] User testing with Dave

### Phase 5: Advanced Features (Future)
- [ ] ~~Crevara integration~~ [REMOVED - keep apps separate]
- [ ] Analytics dashboard (token usage over time)
- [ ] Memory search with vector similarity
- [ ] Chat interface (send messages to Tony from dashboard)
- [ ] Mobile app (React Native or PWA)

## Bug Log
*No bugs yet - just getting started.*

## Additional Features to Consider

Based on deep dive of Dave's needs:

1. **Revenue Pulse Widget**
   - Real-time revenue tracking
   - Connect to bank/Stripe APIs?
   - Monthly burn rate alert
   - "Days until broke" countdown (harsh but effective accountability)

2. **~~Content Pipeline Status~~** [REMOVED - Dave wants Crevara separate]
   - ~~Pull from Crevara~~
   - ~~Videos in progress~~
   - ~~Publishing schedule~~
   - ~~Performance metrics (views, engagement)~~

3. **Accountability Enforcer**
   - Red alert when Dave hasn't answered questions
   - Weekly goal review reminders
   - "Shiny object detector" (track topic/project switches)
   - Completion rate tracking (80% problem tracker)

4. **ChatGPT Comparison View**
   - Side-by-side: What ChatGPT suggested weeks ago vs what actually happened
   - Execution gap tracker
   - "Why did this not get done?" prompts

5. **Pitch Tracker**
   - Outreach log (3/week minimum)
   - Follow-up reminders
   - Deal pipeline visualization
   - Conversion tracking

6. **Learning Curve Visualizer**
   - Time spent on tool setup vs actual work
   - Frustration log (for OpenClaw content creation)
   - "Story gold" tracker (struggles = content opportunities)

7. **Session Replay**
   - Timeline view of conversations
   - Key decision highlights
   - Context snapshots before/after compaction

8. **Emergency Context Backup**
   - One-click "save everything" button
   - Auto-backup to GitHub before risky operations
   - Version history viewer

## Notes
- Use the **architect** skill to plan features
- Use the **engineer** skill to build backend/logic
- Use the **designer** skill for UI polish
- Use the **sentinel** skill to test and verify
- Keep it simple initially - iterate based on Dave's feedback
- Remember: Dave is non-technical, so UI must be intuitive
