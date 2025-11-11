"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeRewrite from 'rehype-rewrite';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown-light.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; 
import style from './index.module.scss';

const MarkDownRenderer = ({ content }: { content: string }) => {
    return (
      <div className={style['markdown-body']}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw, rehypeRewrite, rehypeHighlight,
            remarkMath, rehypeKatex, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  export default MarkDownRenderer;