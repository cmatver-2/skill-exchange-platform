# Contributing Guide — Skill Exchange Platform

Welcome! This doc gets you from `git pull` to your first Pull Request. Read it once, keep it open while you work.

---

## 1. Get set up

```bash
git checkout main
git pull origin main
git checkout -b feature/<your-name>-<your-module>
```

Use your assigned branch name:

| Person | Branch |
|---|---|
| Dane | `feature/dane-skill-search` |
| Derick | `feature/derick-requests-sessions` |
| Govind | `feature/govind-profile-dashboard` |
| Daniel | `feature/daniel-admin-home` |

Then install and run:

```bash
npm install
npm run dev
```

You should see the navbar and be able to click between all pages (each showing a placeholder heading right now).

---

## 2. Where your code goes

Your page already exists as a placeholder — just edit it:

```
src/pages/<YourPage>/index.jsx
```

Anything reusable across pages (a card, a button, a modal) goes in:

```
src/components/
```

Any helper function (filtering, date formatting, validation) goes in:

```
src/utils/
```

**Don't** touch other people's page folders, `AppRoutes.jsx`, or `App.jsx` — if you need a route change, ask Chris.

---

## 3. Using the shared mock data

All the "database" data lives in `src/data/` as plain arrays: `users.js`, `skills.js`, `requests.js`, `sessions.js`, `reviews.js`.

You can import it directly for read-only reference:

```jsx
import { skills } from "../../data/skills";
```

But for anything that needs to **update live** (accepting a request, adding a review, editing a profile), use the shared context instead — see below.

---

## 4. Using `AppContext` (shared live state)

This is what makes the app behave like a real one — state changes in one page (e.g. accepting a request) show up correctly on other pages (e.g. sessions list).

### How to read data

```jsx
import { useAppContext } from "../../context/AppContext";

function SomePage() {
  const { currentUser, requests, sessions, reviews } = useAppContext();

  return <p>Logged in as {currentUser.name}</p>;
}
```

### How to update data

Always use the `set...` functions from context — never mutate arrays directly.

```jsx
import { useAppContext } from "../../context/AppContext";

function RequestsPage() {
  const { requests, setRequests } = useAppContext();

  function acceptRequest(requestId) {
    setRequests(prev =>
      prev.map(r =>
        r.id === requestId ? { ...r, status: "accepted" } : r
      )
    );
  }

  return (
    <ul>
      {requests.map(r => (
        <li key={r.id}>
          {r.status}
          <button onClick={() => acceptRequest(r.id)}>Accept</button>
        </li>
      ))}
    </ul>
  );
}
```

**Available from `useAppContext()`:**

| Value | Type | Notes |
|---|---|---|
| `currentUser` | object | The mock "logged in" user |
| `requests` / `setRequests` | array | Learning requests |
| `sessions` / `setSessions` | array | Scheduled sessions |
| `reviews` / `setReviews` | array | Submitted reviews |

> ⚠️ `users` and `skills` are static catalogs — read them directly from `src/data/` rather than through context, unless you specifically need to edit a user's profile (ask Chris if that comes up, since it affects other pages too).

---

## 5. Data shapes — the contract

Don't invent new fields on your own. If you need something that isn't there (e.g. a new field on `sessions`), message Chris first so it gets added centrally — otherwise other people's code may break.

Quick reference:

**User**
```js
{ id, name, role, avatar, bio, interests, skillsTaught: [{skillId, proficiency}], skillsWanted: [...], rating }
```

**Skill**
```js
{ id, name, category }
```

**Request**
```js
{ id, fromUserId, toUserId, skillId, message, status, createdAt }
// status: "pending" | "accepted" | "rejected"
```

**Session**
```js
{ id, requestId, teacherId, learnerId, skillId, date, time, duration, location, status }
// status: "upcoming" | "completed" | "cancelled"
```

**Review**
```js
{ id, sessionId, reviewerId, revieweeId, rating, comment, createdAt }
// reviewerId = learner, revieweeId = teacher
```

---

## 6. Committing your work

Commit often, with clear messages:

```bash
git add .
git commit -m "Add skill search filtering UI"
git push -u origin feature/dane-skill-search
```

---

## 7. Opening a Pull Request

1. Go to the repo on GitHub → you'll see a banner suggesting your recently pushed branch → click **Compare & pull request**
2. Set the base branch to `main`
3. Write a short description of what you built
4. Submit the PR
5. Chris will review it — check back for comments or an approval/merge

---

## 8. Before you open your PR, double check

- [ ] `npm run dev` runs with no errors in the console
- [ ] You didn't edit files outside your page/component folders (besides adding to shared `components/`, `utils/` if genuinely reusable)
- [ ] You used `useAppContext()` for anything that needs to persist/update across pages
- [ ] No leftover `console.log`s or commented-out code
- [ ] Your page looks reasonable on both desktop and mobile widths

---

Questions or blocked on something? Ping Chris before guessing — it's faster to unblock than to rework later.
