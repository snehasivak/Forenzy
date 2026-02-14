<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# Forenzy 🎯

## Basic Details

### Team Name: Apricodes

### Team Members
- Member 1: Sneha Sivakumar - Cochin University of Science and Technology
- Member 2: Maryam Mohamed Yahya - Cochin University of Science and Technology
### Hosted Project Link
https://forenzy.netlify.app

### Project Description
Forenzy is an interactive "Detective Academy" designed to teach school students the fundamentals of forensic science through gamified lab simulations. It simplifies complex topics like DNA, fingerprints, and skull growth into engaging, kid-friendly digital experiments.

### The Problem statement
Many school students find forensic science and advanced biology intimidating or abstract. Traditional textbooks lack the interactive "hands-on" feel required to spark genuine interest in investigative sciences.

### The Solution
Forenzy provides a digital "Junior Lab" where students can perform virtual experiments, such as analyzing glass fracture patterns using the "4R Rule" or conducting chemical blood tests like Kastle-Meyer and Luminol. It uses a friendly AI assistant powered by Groq to answer student questions in a kid-appropriate, encouraging tone.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: Typescript,  Javascript
- Frameworks used: React Native (Expo), Expo Router
- Libraries used: React Native Reanimated (Animations), Expo Router (Navigation), Ionicons (UI Icons), Lucide-React-Native (icons), Expo-Public-Env
- Tools used: VS Code, Git, Netlify (Hosting), Groq Cloud Console (AI)

---

## Features

- Junior Lab AI: A Groq-powered chatbot that uses Llama 3.3 to explain forensic concepts using fun analogies and emojis.
- Interactive Evidence Labs: Specialized modules for Glass Fracture (4R Rule), Blood Analysis (Kastle-Meyer/Luminol), Fingerprint Identification, and Skull Growth.
- Flippable Learning Cards: Educational flashcards that reveal "Science Secrets" with 3D-like animations.
- Detective Test Mode: A quiz system that evaluates what the student has learned, awarding titles like "Master Detective" or "Junior Agent."

---

## Implementation

### For Software:

#### Installation
```bash
# Clone the repository
git clone https://github.com/snehasivak/Forenzy.git

# Install dependencies
npm install
```

#### Run
```bash
# Start the development server
npx expo start

# Build for production (Web)
npx expo export --platform web
```

---

## Project Documentation

### For Software:

#### Screenshots
| Onboarding Screen    | Navigation  | AI Assistant    | Learn  | Evidences | Badges |
| ---------------------| ------------| ----------------| -------| ----------|--------|
| <img width="300" height="600" alt="Login" src="https://github.com/user-attachments/assets/19a3526b-f921-4eb7-8a5a-7f8a2c90ecd0" />  | <img width="300" height="600" alt="Choose" src="https://github.com/user-attachments/assets/bffdc029-bbe3-4a6f-8c75-2d45576d6cd4" /> | <img width="300" height="600" alt="AI" src="https://github.com/user-attachments/assets/d53b76ad-2f36-4b78-bffc-8d2e8f283d5b" /> | <img width="300" height="600" alt="Learn" src="https://github.com/user-attachments/assets/f327d166-2749-4b69-a7f1-6e1e310b46e8" /> | <img width="300" height="600" alt="Evidences" src="https://github.com/user-attachments/assets/58051f38-087e-4e6d-bc0b-d9804d20c7c5" /> | <img width="300" height="600" alt="Badge" src="https://github.com/user-attachments/assets/9ff87ddc-7613-4179-b780-b74b55b5d4ac" /> | 
| Kids enter the app with their name | Choose to chat, learn the basics or take a test | Clears confusions | Learn the basics of Forensics | Gain more insights with virtual labs| Test your knowledge



#### Diagrams

**System Architecture:**

The application is built on React Native (Expo). It interfaces with the Groq API over HTTPS to fetch AI responses, using Environment Variables (.env) to secure the API key from public exposure. Data flow is managed locally via React Context to track the student's name and progress.

**Application Workflow:**

Entry: User enters their name on the Index page.

Academy: User selects a mission (Lab) or asks the AI a question.

Experimentation: User performs interactive tasks (flipping cards, dropping reagents).

Evaluation: User completes the Final Exam.

Certification: User receives a Detective Title based on their score.

---

## Additional Documentation

### For Mobile Apps:

#### App Flow Diagram

App Flow Diagram
The user flows from a Welcome Screen to a Main Menu. From the menu, they can branch into the Junior Lab AI for Q&A, or the Explore section for specialized labs. All paths eventually lead to the Test Mode and the Results summary.

#### Installation Guide
For Web:
Open the link: https://forenzy.netlify.app/

Add to Home Screen (Optional): * iOS: Tap the "Share" icon in Safari and select "Add to Home Screen."

Android: Tap the three dots in Chrome and select "Install App."

The app will now behave like a native mobile app on your device!


**Building from Source:**
```bash
# Install dependencies
npm install

# To run in development mode
npx expo start

# To build for Android
npx expo run:android

# To build for iOS
npx expo run:ios
```

---


## Project Demo

### Video


https://github.com/user-attachments/assets/6a2eb92e-5a83-4790-8409-d9f1cd99beb4


*Forenzy is an interactive kid-friendly app built with React Native and Expo that simplifies forensic science for school students through laboratory simulations. The application allows users to engage in hands-on digital experiments—such as analyzing glass fracture patterns with the "4R Rule," testing blood samples via Kastle-Meyer and Luminol reagents, identifying fingerprint patterns, and observing cranial suture fusion—all while receiving guidance from a Groq-powered AI assistant that explains complex concepts using fun analogies.*

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** Gemini 3 Flash

**Purpose:**

UI Makeover: Refactored the entire application from a dark theme to a kid-friendly theme.

Interactive Logic: Assisted in creating state management for the "4R Rule" Glass Lab and the Luminol "Dark Room" effect in the Blood Lab.

Code Refactoring: Provided standard code structures for React Native components like the Junior Lab AI and the Pattern Academy flashcards.

Deployment Support: Provided diagnosis and solutions for Netlify secret scanner errors and environment variable configuration.

**Key Prompts Used:**
"Update the theme of evidences page to a bright, positive laboratory style for younger students."

"Refactor the Blood Lab code to include a dark toggle for Luminol testing."

"Why is a Netlify secret scanner error occurring with my EXPO_PUBLIC_GROQ_API_KEY?"

**Percentage of AI-generated code:** 92%

**Human Contributions:**
Core Concept: Conceived the "Detective Academy" theme for school forensic education.

System Architecture: Planned the integration between Expo (React Native) and the Groq LLM API.

Asset Management: Curated and organized the specific images and GIFs used for glass, blood, and fingerprint evidence.

Deployment Management: Manually configured Netlify environment variables and build settings to host the final project.

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- Sneha Sivakumar: Menu page and its routing, Flashcards, Junior Lab AI, Final Test Page, Deploying.
- Maryam Mohamed Yahya: Evidenses page and its routing, Landing page, Setup Virtual labs and quizzes for each evidenses, Readme updates.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ at TinkerHub
