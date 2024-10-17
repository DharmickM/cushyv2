import axios from 'axios';

let cachedToken: string | null = null;
let tokenExpiration: number | null = null;

export async function getToken(): Promise<string> {
  if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
    console.log('Using cached token');
    return cachedToken;
  }

  console.log('Fetching new token');
  try {
    // Use the full URL of your API endpoint
    const response = await axios.post('https://au-api.basiq.io/token', 
      'scope=SERVER_ACCESS',
      {
        headers: {
          'Authorization': `Basic ${process.env.BASIQ_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'basiq-version': '3.0'
        }
      }
    );

    cachedToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    console.log('New token fetched and cached');
    return cachedToken;
  } catch (error) {
    console.error('Error fetching Basiq token:', error instanceof Error ? error.message : String(error));
    throw new Error('Failed to obtain Basiq token');
  }
}