import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          message: 'I am a demo LLM chat interface. To enable real AI responses, please set the OPENAI_API_KEY environment variable in your Vercel project settings. You can get an API key from https://platform.openai.com/api-keys'
        },
        { status: 200 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 'No response generated'

    return NextResponse.json({ message: assistantMessage })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        message: `Error: ${error.message || 'Failed to process your request'}. If you see an authentication error, please add your OPENAI_API_KEY to your Vercel environment variables.`
      },
      { status: 200 }
    )
  }
}
