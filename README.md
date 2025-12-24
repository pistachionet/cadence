# Cadence - High-Velocity Reader

Cadence is a speed reading application that leverages **Rapid Serial Visual Presentation (RSVP)** to help you read faster. By displaying words one at a time at a fixed location, it eliminates the need for your eyes to move across the page (saccades), allowing for significantly higher reading speeds and improved focus.

## Features

- **High-Speed Reading**: Adjust speeds from **100 up to 700 WPM** (Words Per Minute).
- **Optimal Recognition Point (ORP)**: Highlights the optimal viewing position within each word (colored in subtle light red) to maximize recognition speed.
- **PDF Support**:
  - **Drag and Drop**: Simply drag a PDF file onto the reader to start reading immediately.
  - **File Picker**: Use the standard upload button.
- **Interactive Controls**:
  - **Scrubbing**: Click or drag along the progress bar to jump to any point in the text.
  - **Rewind**: "Back a Sentence" button to quickly re-read the previous segment.
  - **Play/Pause**: Easy toggle with spacebar or on-screen controls.
- **Distraction-Free UI**: Minimalist dark mode design to keep you focused on the text.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **PDF Processing**: pdf.js
- **State Management**: Zustand

## Getting Started

1.  Clone the repository.
2.  Navigate to `frontend`: `cd frontend`
3.  Install dependencies: `npm install`
4.  Run development server: `npm run dev`

## Deployment

This project is configured for deployment on Netlify.

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
