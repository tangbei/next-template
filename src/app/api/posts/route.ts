import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      next: { revalidate: 3600 } // 缓存1小时
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
} 