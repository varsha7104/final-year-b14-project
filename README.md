# Knowledge-Aware AI Agent for Smarter Conversations

## Overview
The Knowledge-Aware AI Agent is an intelligent conversational system designed to provide accurate, context-aware, and domain-specific responses. It integrates artificial intelligence with real-time communication features to enhance user interactions across multiple domains such as education, business, and customer support.

This project improves traditional chatbots by using structured knowledge, contextual understanding, and adaptive learning.

## Features
- Knowledge Integration for accurate responses
- Natural Language Processing (NLP)
- Context-aware conversation handling
- Real-time response generation
- Secure communication
- Scalable architecture
- Future support for multilingual interaction and personalization

## System Architecture
The system consists of the following components:

1. Frontend
   - Chat-based user interface
   - Built using modern web technologies

2. Backend
   - Handles API requests
   - Connects frontend with AI engine

3. AI Engine
   - Processes user input
   - Generates intelligent responses

4. Knowledge Base
   - Stores domain-specific data

5. Database
   - Stores chat history and user data

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js / FastAPI
- AI/ML: Python, NLP models
- Database: MongoDB / PostgreSQL
- Tools: Git, GitHub, Postman

## Project Structure
```
knowledge-aware-ai-agent/
│── public/
│── src/
│── drizzleconfig.ts
│── database/
│── docs/
│── README.md
```


```
src
    ├───app
    │   ├───(auth)
    │   │   ├───sign-in
    │   │   └───sign-up
    │   ├───(dashboard)
    │   │   ├───agents
    │   │   │   └───[agentId]
    │   │   └───meetings
    │   │       └───[meetingId]
    │   ├───api
    │   │   ├───auth
    │   │   │   └───[...all]
    │   │   └───trpc
    │   │       └───[trpc]
    │   ├───call
    │   │   └───[meetingId]
    │   └───inngest
    ├───components
    │   └───ui
    ├───db
    ├───hooks
    ├───lib
    ├───modules
    │   ├───agents
    │   │   ├───hooks
    │   │   ├───server
    │   │   └───ui
    │   │       ├───components
    │   │       └───views
    │   ├───auth
    │   │   └───ui
    │   │       └───views
    │   ├───call
    │   │   └───ui
    │   │       ├───components
    │   │       └───views
    │   ├───dashboard
    │   │   └───ui
    │   │       └───components
    │   ├───home
    │   │   └───ui
    │   │       └───views
    │   └───meetings
    │       ├───hooks
    │       ├───server
    │       └───ui
    │           ├───components
    │           └───views
    └───trpc
        └───routers
```
## Installation and Setup

1. Clone the repository

3. Install dependencies



3. Run the project
## Use Cases
- Educational assistant
- Business communication tool
- Customer support chatbot
- Developer assistant

## Future Enhancements
- Multilingual support
- Advanced personalization
- Integration with enterprise tools
- Voice-based interaction
- Improved scalability and security

## Contribution
Contributions are welcome. You can fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Author
SRI HIMA VARSHA 




Summary of Meet AI Video Call App Development and Features
Meet AI is an innovative video calling app powered entirely by AI agents trained for specific roles such as language tutors, sales assistants, or interview coaches. The app integrates real-time AI assistance during calls, combined with comprehensive full-stack development using modern web technologies, including Next.js, TRPC, Drizzle ORM, and Stream Video SDK.

Core Features and Functionalities
Real-time AI Agents:
Live AI agents actively participate in calls, providing role-specific assistance. Example: a "Hustle Coach" AI that gives startup advice in real-time.

Meeting Lifecycle and Content Management:
Upon call completion, background workflows automatically:

Fetch transcripts
Summarize meetings by topic and timestamp
Save searchable transcripts and summaries
Provide a chatGPT-like interface to query meeting details
Subscription Model:
Users start with a free trial, then upgrade via a subscription with payment handled through Polar integration.

Authentication:
Built using Better Out with support for email/password, social providers (GitHub, Google), session management, and secure database integration.

Responsive UI/UX:
Fully responsive design adapting layouts and components for mobile and desktop, using Tailwind v4 and ShatCN UI components.

Technology Stack
Category	Technology/Library	Version/Notes
Frontend Framework	Next.js 15, React 19	Server components, SSR support
Styling	Tailwind CSS 4, ShatCN UI	Accessible, reusable UI components
State Management	React Hook Form, Tanstack React Query	For forms and API state management
Backend API	TRPC 11.1.2	Type-safe API, server/client integration
ORM & Database	Drizzle ORM, Postgres via Neon	Database schema, migrations, queries
Authentication	Better Out	Secure auth, social login providers
Video & Chat	Stream Video SDK, Stream Chat SDK	For real-time video calls and messaging
Background Jobs	Ingest	Event-driven background processing
AI Integration	OpenAI, OpenAI Realtime API	For AI agent conversations and summarizations
Utilities	Nooks (URL state sync), NanoID, Zod	Query state sync, unique IDs, schema validation
Development Timeline & Major Implementation Steps
Phase	Description	Key Implementations
Project Setup & UI Components	Setup Next.js environment, install ShatCN UI, Tailwind, Git workflows	Installed all dependencies, set up responsive UI, added reusable UI components like buttons, dialogs
Database & ORM Integration	Set up Postgres database with Neon, define schema using Drizzle ORM	Defined tables for users, agents, meetings; schema migrations applied; connection string secured
Authentication Setup	Implemented Better Out authentication with email/password and social providers (GitHub, Google)	Created auth API routes, login/signup forms, session management, protected routes
Dashboard Layout & Navigation	Created dashboard sidebar, navbar, user menus	Added navigation links, user dropdown with logout, responsive drawer for mobile
TRPC Setup	Installed and configured TRPC with Tanstack React Query	Created router, client and server utils, integrated into Next.js app layout
Agents Module	Created agents schema, APIs, list page with server-side data fetching, loading/error states	Added agent creation, editing, deletion, UI forms, and data tables with pagination and filters
Meetings Module	Created meetings schema, APIs, list page with filtering, pagination, and protected routes	Added meeting creation, editing, deletion; linked agents; implemented filtering and pagination UI
Individual Agent & Meeting Pages	Created detailed pages with breadcrumb navigation, edit/delete functionality	Added loading and error states, modal dialogs for edits, confirmation prompts
Video Call Integration	Integrated Stream Video SDK for live calls; created lobby, active call, ended call UI	Generated secure tokens, created calls on meeting creation, joined calls with real-time video streams
Webhook & Background Jobs	Implemented Stream video webhooks and background jobs with Ingest	Managed call session events, transcription, recording upload, AI summarization using OpenAI and Ingest
Completed Meeting State	Added UI tabs for summary, transcript, recording, and AI chat	Used React Markdown to render AI-generated summaries; added playback for recordings
Agent Connection to Calls	Connected AI agents to calls, generated tokens, handled participant join/leave events	Enabled real-time AI agent participation and transcription summarization
Key Concepts and Components
Protected Procedures:
API endpoints secured with session validation to prevent unauthorized access.

Prefetching & Hydration:
Server components prefetch data and hydrate Tanstack React Query cache for faster client rendering.

Responsive Dialogues & Command Select:
Custom components for responsive modals and searchable select inputs with server-side filtering.

Background Job Workflow:
Using Ingest to asynchronously process transcript parsing, speaker identification, AI summarization, and database updates.

Stream Video SDK Integration:

Creating video calls linked to meetings
Generating user tokens for authentication
Handling call lifecycle events via webhooks
Rendering lobby, active call, and ended screens
AI-Powered Meeting Summarization:
Transcript processed via real-time OpenAI agents through Ingest background jobs.

Quantitative Data & Versions
Package/Dependency	Version
Next.js	15.3.2
React	19.x
Tailwind CSS	4.x
Drizzle ORM	0.43.1
Neon (Postgres)	Latest
TRPC	11.1.2
Tanstack React Query	4.29.2
Better Out	1.2.8
Stream Video SDK (Node)	8.1.0
Stream Video React SDK	2.16.0
OpenAI SDK	Latest
Ingest	3.37.0
Nooks	2.4.3
React Markdown	Latest
Humanize Duration	3.27.0
Date FNS	2.30.0
Highlights & Best Practices
Explicit Route Protection:
Pages and API procedures explicitly check for authenticated sessions for security.

Use of Layout Groups & Route Groups:
Organizes routes and layouts efficiently without polluting URLs with folder names.

State Synchronization via Nooks:
Synchronizes React state and URL query parameters for search and pagination filters.

AI & Video Call Synchronization:
Real-time webhooks track call session events and update meeting statuses accordingly.

Separation of Concerns:
UI components, API procedures, and background jobs are modular and reusable.

Git Workflow with AI Code Review:
Pull requests are reviewed by AI tools (Code Rabbit) for summaries and actionable suggestions.

Important Notes & Known Issues
React Query Infinite Update Loop:
An occasional “maximum update depth exceeded” issue with Tanstack React Query was noted. It is mitigated by downgrading or awaiting upcoming fixes.

Token Generation:
Stream video user tokens may omit expiration/issued-at fields as they are optional.

Tailwind CSS JIT Caching:
Occasionally requires clearing .next cache to recognize new classes (e.g., for status colors).

Webhooks Signature Verification:
Ensures only legitimate requests update meeting states.

Background Job Fetching Method:
Changed recommended fetch method in background jobs to avoid malformed JSON errors in production.

UI/UX Improvements:
Responsive dialogues and command selects enhance usability on mobile devices.

OpenAI API Keys and Enrock Setup:
Required for AI summarization and webhook accessibility during development.

Conclusion
The Meet AI app is a comprehensive full-stack solution integrating AI agents into real-time video calls with rich features such as meeting transcription, summarization, authentication, and dynamic UI components. The development incorporates best practices in modern web development with solid state and API management, robust background processing, and seamless integration of third-party services for video and AI functionalities. This modular, scalable approach ensures a maintainable codebase with clear separation between client, server, and background operations.

This summary strictly reflects the video transcript content, emphasizing key development stages, technologies, and architectural decisions without fabrication.
