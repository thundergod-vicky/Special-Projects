# 💕 Valentine Propose Day – “We Met Somehow in 8 Billion People”

A personal proposal website with a flip-book of your photos, love letter, and a dedication page. Built for **Saloni** 💕

## What’s inside

- **Intro** – “Propose Day Special” and “Open the surprise”
- **Find My Heart** – Find 3 hidden hearts among the icons
- **Envelope** → **Ready** → **Reasons** – Short reasons why you’re the one
- **Proposal** – “Will you be my Valentine?” with **Yes** / **Maybe later** (the “Maybe later” button runs away 😄)
- **Celebration** – Confetti and “She said YES!”
- **Book** – “Read your letter” opens a **cover** (one image + title “We Met Somehow in 8 Billion People” by Souvik Basu), then the **flip-book** with:
  - Your photos from `src/Our Pics /` (PNG/JPG), in order, with notes and tape-style layout
  - **Letter** in two parts (“My Dearest AmorZinho” + your message)
  - **Dedication** – “Made with love / For My Love / Saloni 💕”
- **Download PDF** – Print/save the whole book (all images + letter + dedication) as PDF

## Run locally

```bash
git clone <your-repo-url>
cd valentine-proposal
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`).

## Build & deploy

```bash
npm run build
npm run preview   # test production build locally
```

To publish on **Netlify**:

Connect the repo in the Netlify dashboard, set **Build command** to `npm run build`, **Publish directory** to `dist`. No extra config needed.



## Customize

- **Names:** Edit `GIRL_NAME` and `BOY_NAME` in `src/App.jsx`
- **Photos:** Add PNG/JPG in `src/Our Pics /` (ordered by filename: 1, 2, 3…). Only PNG and JPG are used.
- **Letter / dedication:** Edit `LETTER_LINES`, `LETTER_PAGE_1`, `LETTER_PAGE_2`, and the dedication block in `src/App.jsx`
- **Book title / author:** `BOOK_TITLE`, `BOOK_AUTHOR`, `BOOK_COVER_IMAGE` in `src/App.jsx`

## Tech

- **React 18** + **Vite** + **Framer Motion** + **react-pageflip** for the book.
