# NewsApp - Vibrant & Playful Edition

## Overview
NewsApp is a React-based web application that fetches the latest news articles using the NewsAPI and presents them in a vibrant, magazine-style layout. Users can search for news, navigate through pages, and enjoy a dynamic and playful UI.

## Features
- User authentication (Login/Logout using localStorage)
- Search functionality to find news articles by keyword
- Paginated news results
- Responsive design with a playful and colorful aesthetic
- Error handling for API requests

## Technologies Used
- React (create-react-app)
- Axios for API calls
- Tailwind CSS & custom styles
- LocalStorage for authentication
- Git for version control

## API Used
We use the [NewsAPI](https://newsapi.org/) to fetch real-time news articles. You will need to generate an API key from their website.

## Installation
### Prerequisites
- Node.js & npm installed
- Git installed

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/adinadli/news-open-api.git
   cd newsapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the project root and add your API key:
   ```sh
   REACT_APP_NEWSAPI_KEY=your_api_key_here
   ```
4. Start the development server:
   ```sh
   npm start
   ```



