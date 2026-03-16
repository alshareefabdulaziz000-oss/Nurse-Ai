# NurseAI Pro

Professional bilingual (Arabic/English) nursing AI assistant.

## Contents

- **24 procedures** across 8 categories — each with full text guide and 5 quiz questions
- **49 medications** in the dose calculator — grouped by category  
- **120 NCLEX-style** quiz questions
- **AI-powered** drug encyclopedia and dose calculator (Groq API)
- **Vital signs** assessment tool

## How to Deploy

1. Create new GitHub repo
2. Upload all files (keep folder structure)
3. Settings → Actions → General → "Read and write permissions" → Save
4. Connect to Vercel — it reads `vercel.json` automatically

## Adding Videos Later

Edit `src/data.json` → find the procedure → change `"vid": ""` to `"vid": "YOUTUBE_VIDEO_ID"` → push → auto-deploys.

## Adding a Procedure

Edit `src/data.json` — see existing procedures for format.

## Adding a Medication

Edit `src/drugs.json`:
```json
{"n": "Drug Name", "d": "min:max:max_total:frequency", "cat": "Category"}
```
