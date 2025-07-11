# 🗂️ Tiny Archives Task Manager

A real-time developer tool inspired by code review platforms for managing engineering workflows. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, it supports role-based routing, task status transitions, and optimized performance.

![Demo](./public/demo-screenshot.png)

---

## 🚀 Features

- ✅ Create, complete, and delete tasks
- ✅ Role-Based Routing (RBAC) for Guest, Reviewer, and Admin
- ✅ Task status workflow: `pending` → `in-review` → `approved` / `changes-requested`
- ✅ Reviewer Dashboard for status transitions
- ✅ Real-time localStorage syncing
- ✅ Optimized Lighthouse score with dynamic imports and Next.js `<Image />`
- ✅ Mobile-responsive and accessible UI

---

## 📁 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **Image Optimization:** `next/image`
- **Performance:** `next/dynamic`, `localStorage`, static generation

---

## 🧩 Folder Structure

```
app/
├── page.tsx                  # Main task manager (Guest/Admin)
├── reviewer/page.tsx         # Reviewer dashboard
├── admin/page.tsx            # Admin-only view (optional)
components/
├── Header.tsx
├── TaskInput.tsx
├── FilterTabs.tsx
├── TaskCard.tsx
├── RoleGate.tsx              # RBAC wrapper
context/
├── RoleContext.tsx
public/
├── demo-screenshot.png       # Optional preview image
```

---

## 🔧 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/tiny-archives-task-manager.git
cd tiny-archives-task-manager
npm install
```

### 2. Configure Remote Images

Add to `next.config.js`:

```js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
};
```

### 3. Run the App

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Role-Based Access

This app uses `localStorage` and React Context to manage user roles:

- **Guest:** View and add tasks
- **Reviewer:** Access `/reviewer`, change task statuses
- **Admin:** All access, including potential `/admin` route

You can switch roles from the top-right dropdown in the header.

---

## 🌈 Status Workflow

Each task has a status field:
- `pending`
- `in-review`
- `approved`
- `changes-requested`

Reviewers can change statuses using buttons on the dashboard.

---

## 📈 Performance Optimizations

- Used `next/dynamic` to lazy-load components
- Switched from `<img>` to `<Image />` for background optimization
- Reduced layout shift using `priority` loading and `backdrop-blur`
- Bundle size decreased by loading only necessary UI pieces

---

## 💡 Future Enhancements

- 🔒 Firebase/Auth integration
- 📦 Backend support (MongoDB/PostgreSQL)
- 📊 Metrics dashboard for team productivity
- 📂 CSV/JSON export of task data

---

## 📄 License

MIT License. Free for personal and commercial use.