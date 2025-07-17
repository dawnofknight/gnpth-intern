import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Add your test logic here
    const body = await request.json();
    
    return NextResponse.json({ 
      message: 'Test endpoint working', 
      data: body 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Test endpoint error', details: error.message }, 
      { status: 500 }
    );
  }
}
