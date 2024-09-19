'use client'; // Indicates that this file is a client-side React component in Next.js

import React, { useState, useRef } from 'react'; // Import React, useState for state management, and useRef for DOM references
import { countryList } from '../assets/countryList'; // Import the list of countries for the location dropdown
import {
  IconCircleNumber1,
  IconCircleNumber2,
  IconCircleNumber3,
  IconCircleNumber4,
  IconCircleNumber5,
} from '@tabler/icons-react'; // Import icons for visual representation of steps

function ItineraryPage() {

  // Define arrays for popular countries and months for dropdown selections
  const popularCountries = ['Japan', 'Italy', 'France', 'Spain', 'Thailand'];
  const months = ['Any month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // State variables for user input
  const [location, setLocation] = useState(''); // Selected location (country)
  const [days, setDays] = useState<any | null>(7); // Number of days for the trip
  const [budget, setBudget] = useState<any | null>(0); // Budget in dollars
  const [month, setMonth] = useState('Any month'); // Selected month
  const [hotels, setHotels] = useState<any | null>(true); // Flag for including hotels in the itinerary
  const [restaurants, setRestaurants] = useState<any | null>(true); // Flag for including restaurants in the itinerary

  const [itineraryOutput, setItineraryOutput] = useState(''); // Itinerary output from the API
  const [isGenerating, setIsGenerating] = useState(false); // Flag for tracking API call status

  const divRef = useRef<any | null>(null); // Reference for scrolling to the output section

  // Function to scroll to the output section smoothly
  const scrollToDiv = () => { 
    window.scrollTo({ 
      top: divRef.current.offsetTop, 
      behavior: 'smooth' 
    }); 
  };

  // Prompts for generating itinerary
  const basePrompt = "Write me an itinerary for";
  const addHotelsPrompt = "- Hotel (prefer not to change it unless traveling to another city)\n";
  const addRestaurantsPrompt = "- 2 Restaurants, one for lunch and another for dinner, with shortened Google Map links\n";

  // Function to handle itinerary generation
  const handleGenerate = async () => {
    setIsGenerating(true); // Set generating flag to true
    // Construct the prompt based on user inputs
    let prompt = `${basePrompt} ${days} days to ${location} in the coming ${month} within budget ${budget} dollars. Describe the weather that month, and also 5 things to take note about this country's culture. Keep to a maximum travel area to the size of Hokkaido, if possible, to minimize traveling time between cities.\n\nFor each day, list me the following:\n- Attractions suitable for that season\n`;
    prompt += 'and give me a daily summary of the above points into a paragraph or two.\n';
    if (hotels) prompt += addHotelsPrompt; // Add hotel prompt if selected
    if (restaurants) prompt += addRestaurantsPrompt; // Add restaurant prompt if selected
    
    // Fetch itinerary data from the API
    const response = await fetch('./api/generate-answer', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json(); // Parse the JSON response
    const { output } = data; // Extract the output text from the response
    console.log('OpenAI replied...', output?.text); // Log the response for debugging

    setItineraryOutput(`${output?.text}`); // Set the itinerary output
    setIsGenerating(false); // Set generating flag to false
    scrollToDiv(); // Scroll to the output section
  };

  return (
    <div className="root">
      <div className="flex max-[600px]:flex-col w-full">
        <div className="container-left">
          <div className="header">
            <div className="header-title">
              <h1>Travel Itinerary Generator</h1> {/* Main title */}
            </div>
            <div className="header-subtitle">
              <h2>
                Give me some details and I'll 🪄 an itinerary just for you! {/* Subtitle */}
              </h2>
            </div>
          </div>
          <div className="prompt-container">
            <div className="flex items-center">
              <IconCircleNumber1 color="rgb(110 231 183)" /> {/* Step 1 icon */}
              <span className="ml-2">Where do you want to go?</span>
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)} // Update location state
              className="prompt-box"
            >
              <option value="">Select a country</option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className="areas-of-interests">
              <div
                style={{
                  color: '#fff',
                  display: 'inline-block',
                  marginRight: '.8rem',
                }}
              >
                {popularCountries.map((i) => (
                  <button
                    className={`item ${location.includes(i) && 'selected'}`}
                    key={i}
                    onClick={() => {
                      setLocation(i); // Update location state on button click
                    }}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <IconCircleNumber2 color="rgb(110 231 183)" /> {/* Step 2 icon */}
              <span className="ml-2">What is your budget (in $)?</span>
            </div>
            <input
              type="number"
              className="rounded block"
              value={budget}
              onChange={(e) => setBudget(e.target.value)} // Update budget state
              style={{ width: '240px' }}
            />
            <div className="flex w-100 mt-4">
              <div
                className="flex-none mr-6 flex-col items-start"
                style={{ display: 'flex', width: '180px' }}
              >
                <div className="flex items-center mb-2">
                  <IconCircleNumber3 color="rgb(110 231 183)" /> {/* Step 3 icon */}
                  <span className="ml-2">How many days?</span>
                </div>
                <input
                  type="number"
                  className="rounded block"
                  value={days}
                  onChange={(e) => setDays(e.target.value)} // Update days state
                  style={{ width: '180px' }}
                />
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-2">
                  <IconCircleNumber4 color="rgb(110 231 183)" /> {/* Step 4 icon */}
                  <span className="ml-2">Month</span>
                </div>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)} // Update month state
                  className="prompt-box"
                >
                  <option value="">Select a month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <div className="flex items-center mb-2">
                  <IconCircleNumber5 color="rgb(110 231 183)" /> {/* Step 5 icon */}
                  <span className="ml-2">Recommendations?</span>
                </div>
                <div>
                  <label className="inline-flex items-center mr-8">
                    <input
                      type="checkbox"
                      className="rounded checked:bg-blue-500"
                      value={restaurants}
                      checked={restaurants}
                      onChange={(e) =>
                        setRestaurants(e.target.checked) // Update restaurants state
                      }
                    />
                    <span className="ml-2">🍔 Restaurants</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded checked:bg-blue-500"
                      value={hotels}
                      onChange={(e) => setHotels(e.target.checked)} // Update hotels state
                      checked={hotels}
                    />
                    <span className="ml-2">🏨 Hotels</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="prompt-buttons">
              <button
                className="pushable py-2 px-4 rounded"
                onClick={handleGenerate} // Trigger itinerary generation
                disabled={isGenerating} // Disable button while generating
              >
                <span className="shadow"></span>
                <span className="edge"></span>
                <div className="front">
                  {isGenerating ? (
                    <div>
                      <span className="loader mr-2"></span>
                      <span>Applying magic now...</span> {/* Loading message */}
                    </div>
                  ) : (
                    <span className="font-semibold">Generate</span> 
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="container-right" ref={divRef}>
          {itineraryOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Your Itinerary</h3> {/* Itinerary header */}
                </div>
              </div>
              <div className="output-content">
                <p>{itineraryOutput}</p> {/* Itinerary output text */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItineraryPage; // Export the component for use in other parts of the application
