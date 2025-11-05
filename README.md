<div align="center">

<img src="https://img.icons8.com/fluency/96/link.png" width="90"/>

# 🔗 **Shurl**

### The open-source URL shortener with superpowers

**One Backend → Unlimited Clients (Web + Discord Bot + Telegram Bot)**

<br/>

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![PRs welcome](https://img.shields.io/badge/PRs-Welcome-blue.svg)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Made With Node](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)

</div>

---

## 🚀 What is Shurl?

Shurl is a **scalable URL shortening platform** where:

✅ Users can shorten URLs from
→ Web Dashboard
→ Discord Bot
→ Telegram Bot

✅ All of them share the **same backend logic**
✅ Tracks analytics **per-user** (based on Discord UID / Telegram UID / Auth user)

> In simple terms:
> One backend. Multiple bots. Multiple clients. Zero code duplication.

---

## 🧠 Why Shurl Exists?

Other URL shorteners:

- ❌ Only web-based
- ❌ No multi-platform integration
- ❌ Not built for automation or bots

Shurl:

- ✅ Works everywhere (Discord, Telegram, Web Dashboard)
- ✅ Service-based architecture (clean, reusable logic)
- ✅ Designed to add WhatsApp, Slack, or any bot later
- ✅ Open-source & dev-friendly

> Think of it as **tinyurl + bitly + bot automation**, but hackable.

---

## ✨ Features

| Feature                                                                  | Status           |
| ------------------------------------------------------------------------ | ---------------- |
| URL Shortening (with slug generator)                                     | ✅               |
| Discord bot (slash commands)                                             | ✅               |
| Telegram bot (commands & auto previews)                                  | ✅               |
| Track links by creator (`discord_id`, `telegram_id`, `user_id`, `guest`) | ✅               |
| Analytics (click count, platform breakdown)                              | 🚧 (coming soon) |
| Web dashboard with auth                                                  | 🚧 (planned)     |
| Add more bots (WhatsApp, Slack, etc.)                                    | Future           |

---

## 📂 Project Structure (Service-Based)

```
shurl/
│
├── src/
│   ├── core/          → Business logic (NO bot or HTTP code here)
│   ├── api/           → REST API (shorten, redirect, analytics)
│   ├── bots/          → Discord + Telegram + more future bots
│   ├── database/      → models + connection setup
│   ├── config/        → env / constants
│   └── app.ts         → entrypoint, starts API + bots
├── package.json
└── README.md
```

> Logic lives in `core/services`, everything else consumes it.

---

## 🔐 Handling Identity

Every shortened link stores:

```
createdBy.type = "discord" | "telegram" | "web" | "guest"
createdBy.id   = platform-specific id OR web-user id
```

So analytics can do:

- "show all links created by this discord user"
- "show all links created by this telegram user"
- "show all my dashboard links"

---

## 🛠 Setup (Local Development)

```sh
git clone https://github.com/himanshujain112/shurl.git
cd shurl
npm install
cp .env.example .env
npm run dev
```

---

## 🧪 Tech Stack

| Area          | Tech                  |
| ------------- | --------------------- |
| Backend       | Node.js + Fastify     |
| Database      | MongoDB               |
| Bots          | discord.js + telegraf |
| Auth (future) | JWT + dashboard       |

---

## 🤝 Contributing

PRs, issues, and suggestions are welcome 🙌
If you're adding a bot, create a folder inside `src/bots/<bot-name>`.

---

## ⭐ Support the project

If you like this project, star the repo 🌟
It helps discoverability and motivates development.

---

### MIT License © 2025 Himanshu Jain
