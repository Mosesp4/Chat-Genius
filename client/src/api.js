// Rate Limiting Variables
const requestsPerMinute = 10;
let lastRequestTime = null;

export const fetchResponse = async (chat) => {
  try {
    // Rate Limiting
    if (lastRequestTime) {
      const elapsed = Date.now() - lastRequestTime;
      const minTimeBetweenRequests = 60000 / requestsPerMinute; // Convert minutes to milliseconds
      if (elapsed < minTimeBetweenRequests) {
        const remainingTime = minTimeBetweenRequests - elapsed;
        console.log(
          `Rate limit exceeded. Please wait for ${Math.ceil(
            remainingTime / 1000
          )} seconds before making another request.`
        );
        return; // Exit the function without making the request
      }
    }
    lastRequestTime = Date.now();

    const response = await fetch('http://localhost:3080', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        message: chat.map((message) => message.message).join(' \n '),
      }),
    });

    console.log(response);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
