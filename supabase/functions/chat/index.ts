import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// 1. Setup CORS so your React app can talk to this function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Get the message from your React app
    const { messages } = await req.json();

    // 3. Prepare the Azure OpenAI Config
    const apiKey = Deno.env.get('AZURE_OPENAI_KEY');
    const endpoint = Deno.env.get('AZURE_OPENAI_ENDPOINT'); 
    const deployment = Deno.env.get('AZURE_OPENAI_DEPLOYMENT'); // e.g., "gpt-35-turbo"
    
    // API Version is required for Azure (check your Azure console for the specific date)
    const apiVersion = "2023-05-15"; 

    // 4. Call Azure OpenAI
    const response = await fetch(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey!,
        },
        body: JSON.stringify({
          messages: messages, // Pass the chat history
          stream: true,       // CRITICAL: Tells Azure to stream the response
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure Error:", errorText);
      throw new Error(`Azure API Error: ${response.statusText}`);
    }

    // 5. Stream the response back to your React App
    // We pass the Azure stream directly to the frontend
    const stream = response.body;

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
