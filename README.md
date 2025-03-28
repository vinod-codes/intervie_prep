# Interview Prep AI 🚀

I built this project to help developers practice technical interviews with AI. It provides real-time feedback and helps improve interview skills through mock interviews.

## What it does 🎯

- Conducts mock technical interviews using AI
- Provides instant feedback on your responses
- Analyzes communication skills and technical knowledge
- Tracks progress over time
- Helps practice common interview questions

## Tech Stack 💻

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Firebase (Auth & Firestore)
- **AI**: Google Gemini AI
- **Voice**: VAPI for voice interactions

## Getting Started 🏁

1. Clone the repo:
```bash
git clone https://github.com/yourusername/interview-prep.git
cd interview-prep
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env`:
```env
# VAPI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=

# App URL
NEXT_PUBLIC_BASE_URL=

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features 🌟

- **AI-Powered Interviews**: Practice with an AI interviewer that adapts to your responses
- **Real-time Feedback**: Get instant feedback on your interview performance
- **Voice Interaction**: Natural conversation with voice support
- **Progress Tracking**: Monitor your improvement over time
- **Customizable Questions**: Practice different types of technical questions

## How I Built It 🛠️

I created this project using:
- Next.js for the frontend and API routes
- Firebase for authentication and database
- Google's Gemini AI for natural language processing
- VAPI for voice interaction
- Tailwind CSS for styling

## What's Next 🔜

I'm planning to add:
- [ ] More interview question categories
- [ ] Video interview support
- [ ] Interview recording and playback
- [ ] Peer review features
- [ ] Advanced analytics dashboard

## Local Development 💻

To run the project locally:

1. Make sure you have Node.js installed
2. Set up your Firebase project and get credentials
3. Configure environment variables
4. Run `npm install` and `npm run dev`

## Contributing 🤝

Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests
- Share feedback

## License 📝

This project is MIT licensed.

---
Built with 💻 by [Your Name]
