// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@1.30.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// console.log("Hello from Functions!")

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed!", {status: 405})
  }

  try {
    const {id, email_addresses, first_name, image_url} = (await req.json()).data
    const email = email_addresses[0].email_address

    const {data, error} = await supabase.from("users").insert(
      {id, email, first_name, avatar_url:image_url}
    )

    if (error) {
      console.error("Error inserting user:", error)
      return new Response(JSON.stringify(error), {status: 500})
    }

    return new Response(JSON.stringify(data), {headers: {
      'Content-Type': 'application/json'
    },status: 201})
  } catch (error) {
    console.error("Error handling request:", error)
    return new Response(JSON.stringify(error), {status: 500})
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-user' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
