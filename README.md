<div align="center">
  <h1>Cadence</h1>
  <h3>High-Velocity Serial Reader</h3>
  <p>
    Hosted at <a href="https://ireadfaster.com"><strong>ireadfaster.com</strong></a>
  </p>

  <p>
    <!-- License -->
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square" alt="License: CC BY-NC 4.0" />
    </a>
    <!-- Tech Stack -->
    <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

---

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

## Contributing

If you have suggestions for layout improvements, new features, or bug fixes, please feel free to open a Pull Request.

## License

Distributed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

This means you are free to use, modify, and distribute this software for personal use or to contribute to the project, but you **cannot** use it for commercial purposes (e.g., selling it, using it in a commercial product) without permission.

See `LICENSE` for more information.
