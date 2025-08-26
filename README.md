Installation & Setup

Clone the Repository

git clone https://github.com/your-username/gym-management-system.git
cd gym-management-system


Install Dependencies

npm install


Setup Firebase

Go to Firebase Console

Create a new project

Enable Authentication (Email/Password)

Setup Firestore Database

Copy your Firebase config keys and paste them in .env file:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


Run the Project

npm run dev


Open: http://localhost:5173
