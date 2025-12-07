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
    const SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    // Validate credentials exist
    if (!SUPABASE_DATABASE_URL || !SUPABASE_ANON_KEY) {
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
            SUPABASE_DATABASE_URL,
            SUPABASE_ANON_KEY
        })
    };
};
