import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    // Llama a OpenAI para sugerir una shorturl
    const prompt = `Sugiere una shorturl relevante y descriptiva para el siguiente enlace. No seas creativo, solo resume el propósito o nombre del sitio en máximo 10 caracteres, usando palabras clave del dominio o ruta. Solo responde con la shorturl sugerida, sin explicación ni símbolos especiales. Ejemplo: para 'portfolio-astrojs-two.vercel.app' responde 'portfolio' o 'astrojs'. URL: ${url}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_SECRET_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Eres un generador de shorturls descriptivo y conciso.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 16,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim();
    if (!suggestion) {
      return NextResponse.json({ error: 'No suggestion generated' }, { status: 500 });
    }
    return NextResponse.json({ suggestion });
  } catch (error: unknown) {
    console.error('Error generating shorturl:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
