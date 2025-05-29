import React from "react";

const About = () => {
  return <div>About</div>;
};

export default About;

// export async function getStaticProps() {
//   // 调用外部 API 获取博文列表
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await res.json()

//   // 通过返回 { props: { posts } } 对象，Blog 组件
//   // 在构建时将接收到 `posts` 参数
//   return {
//     props: {
//       posts,
//     },
//   }
// }
