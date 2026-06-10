# TalkBuzz — Chat App Rebuild Plan

**Date:** June 10, 2026  
**Status:** PLANNING → EXECUTION  
**Firebase Project:** talkbuzz-6f0e9  
**Database:** https://talkbuzz-6f0e9-default-rtdb.asia-southeast1.firebasedatabase.app/

---

## Architecture

### Tech Stack
- **Frontend:** Vanilla HTML/CSS/JS (no build tools — deploy directly to Firebase Hosting)
- **Database:** Firebase Realtime Database (with offline persistence)
- **Auth:** Google Sign-In + Anonymous Auth fallback
- **Hosting:** Firebase Hosting
- **Analytics:** Firebase Analytics

### Why Vanilla JS?
- Zero build step = instant deployment
- Firebase Hosting serves static files directly
- No npm, no vite, no bundler needed
- Works offline immediately with service worker

---

## Features

### Core Chat
- [x] Real-time messaging via Firebase RTDB
- [x] Multiple chat rooms
- [x] Direct messages (DMs)
- [x] Message timestamps
- [x] Offline message queuing (auto-send when back online)

### Presence & Status
- [x] Online/Offline indicator (`.info/connected` + `onDisconnect`)
- [x] Last seen timestamp
- [x] Typing indicators

### Read Receipts
- [x] Sent (✓) → Delivered (✓✓) → Read (✓✓ blue)
- [x] Store `lastReadBy` per user per room
- [x] Real-time read status updates

### Auth
- [x] Google Sign-In (primary)
- [x] Anonymous Auth (fallback for quick access)
- [x] Account linking (anonymous → Google)

### Admin Panel
- [x] Broadcast messages to all users
- [x] User management (view, kick, ban)
- [x] Room management (create, delete, archive)
- [x] Admin credentials stored in Firebase DB
- [x] Admin role verification from database

### Offline Support
- [x] Firebase persistence enabled
- [x] Service Worker for static assets
- [x] Offline banner indicator
- [x] Messages queue locally, sync when online

---

## Firebase Data Structure

```
/
├── users/
│   └── {userId}/
│       ├── name: string
│       ├── email: string
│       ├── avatar: string
│       ├── status: "online" | "offline"
│       ├── lastSeen: timestamp
│       └── role: "user" | "admin"
│
├── rooms/
│   └── {roomId}/
│       ├── name: string
│       ├── type: "group" | "dm"
│       ├── createdAt: timestamp
│       ├── createdBy: userId
│       └── lastMessage: { text, sender, timestamp }
│
├── room_members/
│   └── {roomId}/
│       └── {userId}/
│           ├── joinedAt: timestamp
│           └── lastRead: timestamp
│
├── messages/
│   └── {roomId}/
│       └── {messageId}/
│           ├── text: string
│           ├── sender: userId
│           ├── senderName: string
│           ├── timestamp: timestamp
│           ├── type: "text" | "image" | "system"
│           └── readBy: { userId: true }
│
├── admin/
│   ├── credentials/
│   │   └── {adminId}/
│   │       ├── email: string
│   │       └── role: "superadmin" | "admin"
│   └── broadcasts/
│       └── {broadcastId}/
│           ├── message: string
│           ├── sentBy: userId
│           └── timestamp: timestamp
│
└── typing/
    └── {roomId}/
        └── {userId}: timestamp
```

---

## File Structure

```
TalkBuzz/
├── index.html          # Main app (single page)
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── app.js          # Main app init & routing
│   ├── auth.js         # Firebase Auth (Google + Anonymous)
│   ├── chat.js         # Chat messaging logic
│   ├── rooms.js        # Room management
│   ├── presence.js     # Online/offline/typing
│   ├── admin.js        # Admin panel
│   └── utils.js        # Helpers (time formatting, etc.)
├── sw.js               # Service Worker (offline)
├── manifest.json       # PWA manifest
├── assets/
│   ├── icon-192.png    # App icon
│   └── icon-512.png    # App icon
├── firebase.json       # Firebase hosting config
├── .firebaserc         # Firebase project config
└── PLAN.md             # This file
```

---

## Admin Setup

**Default Admin:**
- Email: `shubham.mallick1440@gmail.com`
- Password: `ABSM` (stored hashed in Firebase DB)
- Role: `superadmin`

**Admin Database Path:** `/admin/credentials/{adminId}`

---

## UI Design

### Color Scheme
- Primary: `#6366f1` (Indigo)
- Background: `#0f172a` (Dark)
- Surface: `#1e293b`
- Text: `#f1f5f9`
- Accent: `#22d3ee` (Cyan)
- Online: `#22c55e`
- Sent: `#94a3b8`
- Read: `#22d3ee`

### Layout (Mobile-First)
1. **Login Screen** — Google Sign-In button + Anonymous option
2. **Room List** — Sidebar (desktop) / Full screen (mobile)
3. **Chat View** — Message bubbles, input bar, typing indicator
4. **Admin Panel** — Broadcast, user list, room management
5. **Settings** — Profile, theme, about

---

## Execution Order

1. Create folder structure
2. Build `firebase.json` and `.firebaserc`
3. Build `index.html` (complete SPA)
4. Build `css/styles.css` (mobile-first responsive)
5. Build `js/auth.js` (Google + Anonymous auth)
6. Build `js/chat.js` (messaging + read receipts)
7. Build `js/rooms.js` (room CRUD)
8. Build `js/presence.js` (online/offline/typing)
9. Build `js/admin.js` (broadcast + management)
10. Build `js/app.js` (init + routing)
11. Build `js/utils.js` (helpers)
12. Build `sw.js` (offline support)
13. Build `manifest.json` (PWA)
14. Generate app icons
15. Test locally
16. Deploy to Firebase
17. Update portfolio site
18. GitHub release
