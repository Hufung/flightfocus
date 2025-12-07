// Netlify Function to serve Supabase configuration
// This keeps credentials safe by not exposing them in HTML

exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get credentials from Netlify environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    // Validate credentials exist
    if (!supabaseUrl || !supabaseAnonKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Supabase credentials not configured in Netlify environment' 
            })
        };
    }

    // Return credentials (safe because they're already public anon key)
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        },
        body: JSON.stringify({
            supabaseUrl,
            supabaseAnonKey
        })
    };
};
