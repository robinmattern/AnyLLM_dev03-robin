//    pTreads = await fetchThreads(workspaceName)
      fetchThreads( "robins-workspace" )
        .then( threads => console.log(threads))
        .catch( error  => console.error(error));


async function fetchThreads(workspaceName) {

    const baseUrl = 'http://92.112.184.206:3001'; // Replace with the actual base URL
    const endpoint = `/api/workspace/${encodeURIComponent(workspaceName)}/threads`;
    const url = new URL( endpoint, baseUrl);
  
    try {
      const response = await fetch( url.href, {
        method: 'GET',
        headers: {
//        'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.threads; // Assuming the API returns an object with a 'threads' property
    } catch (error) {
      console.error('Error fetching threads:', error);
      throw error;
    }
  }