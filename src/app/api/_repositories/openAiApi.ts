const fetchGptCompletion = async (systemPrompt: string, userPrompt: string) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_KEY}`,
  };

  const body = {
    model: "gpt-4o",
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  };

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  const json = await response.json();
  return json.choices[0].message.content;
};
export { fetchGptCompletion };
