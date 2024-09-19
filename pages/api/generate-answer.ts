// Import the Cohere client from the "cohere-ai" package
const { CohereClient } = require("cohere-ai");

// Initialize the Cohere client with an API token
const cohere = new CohereClient({
  token: "srhxvPQOiaNZPn3Clo2OlkBnLc0wIDkmNl8W5lNa", // Replace with a secure token
});

// Export the handler function for an API route (used in frameworks like Next.js)
export default async function handler(req: any, res: any) {
  
  // Extract the prompt from the request body
  const prompt = req.body.prompt;

  // Check if the prompt is empty or missing, return a 400 error if true
  if (!prompt || prompt === '') {
    return res.status(400).json({ error: 'Please send your prompt' });
  }

  try {
    // Make an API call to Cohere to get a response from the chat model
    const response = await cohere.chat({
      message: `${prompt}`, // Pass the prompt to the Cohere chat endpoint
    });

    // Respond with the output from Cohere
    res.status(200).json({ output: response });

  } catch (error) {
    // Handle any errors that might occur during the API call
    res.status(500).json({ error: 'Something went wrong' });
  }
}
