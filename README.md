# DND Social — Premium Starter

A responsive front-end starter for **DND Social**, designed with a premium black, purple, and neon-lime visual system. It includes desktop and Android/mobile layouts.

## Project files

```text
dnd-social-starter/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    └── dnd-mark.svg
```

## How to publish with GitHub + Netlify

1. Create a GitHub repository named `dnd-social`.
2. Upload every file while preserving the `assets` folder.
3. Confirm `index.html`, `styles.css`, `app.js`, and `assets/dnd-mark.svg` are in the expected paths.
4. In Netlify, choose **Add new site → Import an existing project**, connect GitHub, and choose the repository.
5. Use the repository root as the publish directory. No build command is needed for this static starter.
6. Deploy, then open the Netlify URL on your phone and test the mobile bottom navigation.

## What works in this starter

- Responsive website layout and mobile navigation.
- Page switching between Home, Discover, Shorts, Communities, Messages, Live, Marketplace, Creator Studio, Create, and Settings.
- Local text-post creation in the browser preview.
- Local like/save/follow/join interactions.
- Character counter for text posts.
- Toast feedback for unfinished modules.
- Custom SVG logo and CSS-made illustrations/cards.
- Creator dashboard preview with clearly labeled sample metrics.

## What is still a placeholder

This is **not yet a production social network**. It has no server or database, so different people cannot see each other's posts.

The following need backend/provider integration before public launch:
- Real sign-up/login, profiles, account recovery, and permissions.
- Shared posts, comments, follows, communities, and messaging.
- Image/video uploads and durable media storage.
- A vertical video player, feed ranking, recommendations, and search indexing.
- Live streaming and real-time chat.
- Marketplace listings, inventory, checkout, refunds, delivery, and seller payouts.
- Creator monetization, eligibility rules, analytics, and payouts.
- Notifications, reporting, blocking, moderation, age/safety controls, privacy tools, and admin console.

## Recommended next build phase

1. Add Supabase Auth, database tables, Row Level Security, and Storage policies.
2. Add profiles, posts, follows, comments, likes, and reporting.
3. Add media uploads and a proper video delivery solution.
4. Add marketplace checkout through a supported payment provider and verify local legal/payment requirements.
5. Add live streaming through a specialist provider; do not attempt to run video streaming from a static Netlify page.
6. Add admin/moderation tools, privacy policy, terms, community rules, and abuse-response procedures.
7. Wrap the responsive site as an Android app only after core flows are tested. A website URL is not an Android APK/AAB.

## Important

Do not put service-role keys, payment secrets, stream keys, or private credentials in `app.js` or any public GitHub repository. Use server-side functions or provider-managed secrets for private keys.
