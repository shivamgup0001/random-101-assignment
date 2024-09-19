# Travel Itinerary Generator

## Project Description

The Travel Itinerary Generator is a web application that allows users to create personalized travel itineraries based on their preferences, including budget, interests, and trip duration. The application uses Cohere AI to generate detailed and dynamic itineraries tailored to individual users.

## Features

- **Personalized Itineraries**: Generates travel itineraries based on user preferences such as location, budget, days, and month.
- **Dynamic Recommendations**: Provides recommendations for hotels and restaurants based on user input.
- **User-Friendly Interface**: Interactive interface with a form for inputting travel details and viewing the generated itinerary.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Cohere AI
- **API**: Cohere API for generating itineraries

## API Integration

The application uses the Cohere API to generate itineraries. Configure the API by replacing `your_cohere_api_token` with your actual token in the `api/generate-answer.js` file.

**File:** `api/generate-answer.js`

```javascript
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "your_cohere_api_token", // Replace with your actual API token
});


