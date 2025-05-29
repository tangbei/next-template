import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/dictionaries'
import { Locale } from '@/i18n/config'

interface Props {
  params: {
    id: string
    lang: Locale
  }
}

interface Post {
  id: number
  title: string
  body: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = await params
  const dict = await getDictionary(lang)
  
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post: Post = await res.json()
    
    return {
      title: `${post.title} - ${dict.common.welcome}`,
      description: post.body,
    }
  } catch {
    return {
      title: dict.products.notFound,
      description: dict.products.notFound,
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { id, lang } = await params
  const dict = await getDictionary(lang)

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) {
    notFound()
  }
  
  const post: Post = await res.json()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">{post.body}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">{dict.products.title}</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">{post.id}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">{dict.products.status}:</span>
                <span className="font-medium">{dict.products.available}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 