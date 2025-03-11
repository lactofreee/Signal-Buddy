import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: Request) {
  const { text, voice = "nova", model = "tts-1" } = await request.json();

  try {
    const mp3 = await openai.audio.speech.create({
      model,
      voice,
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("OpenAI TTS Error:", error);
    return new Response("TTS Error", { status: 500 });
  }
}
