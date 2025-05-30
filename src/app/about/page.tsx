import React from "react";
import style from "./page.module.scss";

// 定义数据类型
interface Post {
  id: number;
  title: string;
  body: string;
}

// 获取服务端数据
async function getData(): Promise<Post> {
   // 使用完整的 URL
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
   const res = await fetch(`${baseUrl}/api/posts`, {
     // 确保在服务端获取数据
     cache: 'no-store'
   });
   
   if (!res.ok) {
     throw new Error('Failed to fetch data');
   }

  return res.json();
}

export async function generateMetadata() {
  return {
    title: 'aatang-nextjsaa',
    description: 'tang-nextjs',
  }
}

// 定义组件 props 类型
interface AboutProps {
  post: Post;
}

// 使用 props 接收数据
const About = ({ post }: AboutProps) => {
  return (
    <div className={style.about}>
      <h1>About Page</h1>
      <div className="mt-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="mt-2 text-gray-600">{post.body}</p>
      </div>
    </div>
  );
};

// 页面组件
export default async function Page() {
  // 获取数据
  const post = await getData();
  
  // 通过 props 传递数据
  return <About post={post} />;
}
