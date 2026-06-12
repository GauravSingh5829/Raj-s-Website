export default async function handler(req, res) {
  // 1. Extract visitor's IP address natively
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown_ip';
  const safeIp = ip.replace(/[^a-zA-Z0-9]/g, '_'); 
  
  try {
    // 2. Fetch the IP's historical record from the pseudo-database
    const checkIp = await fetch(`https://api.counterapi.dev/v1/rajsinghportfolio/ip_${safeIp}`);
    
    let shouldIncrement = false;
    
    if (!checkIp.ok) {
        // IP doesn't exist -> Brand new visitor!
        shouldIncrement = true;
    } else {
        const ipData = await checkIp.json();
        
        // 3. 12-Hour Timeout Logic
        // The database gives us exact timestamps for when this IP last visited.
        const lastVisitTimestamp = new Date(ipData.updated_at).getTime();
        const now = Date.now();
        const twelveHoursInMs = 12 * 60 * 60 * 1000;
        
        if (now - lastVisitTimestamp > twelveHoursInMs) {
            // It has been more than 12 hours since their last visit -> Count them again!
            shouldIncrement = true;
        }
    }
    
    // Default action: Simply GET the current global count (do not increment)
    let globalUrl = 'https://api.counterapi.dev/v1/rajsinghportfolio/vibes';
    
    if (shouldIncrement) {
        // Update the IP's "updated_at" timestamp in the database
        await fetch(`https://api.counterapi.dev/v1/rajsinghportfolio/ip_${safeIp}/up`);
        // Increment the global page views count
        globalUrl = 'https://api.counterapi.dev/v1/rajsinghportfolio/vibes/up';
    }
    
    // 4. Fetch the final global count and send it to the frontend
    const response = await fetch(globalUrl);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    // Safe fallback if the database goes down
    res.status(500).json({ count: 42 });
  }
}
