# Unlocking the Speed of Thought: Why I Built Cadence

Reading has always been a cornerstone of my morning ritual—a necessary grounding before the demands of the day take over. Yet, like many, I often find my time limited. Despite a desire to read deeply and widely, the constraints of a busy schedule frequently intervene, leaving me unable to turn as many pages as I would like.

The inspiration for Cadence came from observing the untapped potential of the human mind. A demonstration of rapid visual processing highlighted a fascinating truth: our brains are capable of comprehending words significantly faster than our eyes can scan them. The traditional mechanics of reading—saccades, line tracking, and page turning—act as a bottleneck for our cognitive speed.

I built Cadence to remove this friction. By employing Rapid Serial Visual Presentation (RSVP), the tool delivers content directly to the "optimal recognition point" of your vision, allowing you to bypass the physical limitations of eye movement. It transforms reading from a passive scan into a high-velocity stream of information, empowering you to consume curated content at the speed your mind is actually capable of processing.

To possess such a powerful cognitive engine and not utilize it to its full extent felt like a wasted opportunity. Cadence is my answer to that problem—a tool designed to ensure the mind's potential is never left idle.

# Engineering Speed & Focus

Building a tool centered on speed and focus required a technology stack that embodies those same principles.

**The Tech Stack:**

- **React & TypeScript:** Selected for building a robust, type-safe user interface that can handle rapid state changes without hitching.
- **Vite:** Just as Cadence aims to accelerate reading, Vite accelerates development. Its lightning-fast hot module replacement ensuring that the build process is never the bottleneck.
- **Tailwind CSS:** A utility-first framework allowing for rapid UI development, keeping the codebase clean and the design system consistent.

**Design Choices:**

- **Radical Minimalism:** The interface is intentionally stripped of all non-essential elements. When you are reading at 500+ WPM, even a minor visual clutter can be a distraction. The focus is solely on the word in front of you.
- **Optimal Recognition Point (ORP):** The "red letter" highlighting isn't just an aesthetic choice; it anchors the eye to the center of the word—the optimal viewing position—reducing the time the brain needs to recognize the word and eliminating the need for micro-saccades.
