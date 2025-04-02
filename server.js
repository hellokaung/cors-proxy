export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("URL parameter is required", { status: 400 });
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      return new Response(response.body, {
        status: response.status,
        headers: { ...corsHeaders },
      });

    } catch (error) {
      return new Response("Error fetching URL", { status: 500 });
    }
  },
};
