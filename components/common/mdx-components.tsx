import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl md:text-5xl text-ink-50 mt-16 mb-8 leading-[1.05] tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-3xl md:text-4xl text-ink-50 mt-16 mb-6 leading-tight tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-2xl text-ink-50 mt-12 mb-4 leading-snug">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ink-200 leading-[1.85] my-6 text-[17px]">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent border-b border-accent/40 hover:border-accent transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-accent border-b border-accent/40 hover:border-accent transition-colors"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="my-6 space-y-3 list-none pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3 list-decimal list-inside text-ink-200">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-ink-200 leading-relaxed flex items-start gap-3 text-[17px]">
      <span className="mt-3 h-px w-4 bg-ink-600 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-6 my-8 italic text-ink-100 font-serif text-xl leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-16 border-ink-800" />,
  code: ({ children }) => (
    <code className="font-mono text-sm bg-ink-900 border border-ink-800 px-1.5 py-0.5 text-accent">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-sm bg-ink-900 border border-ink-800 p-6 my-8 overflow-x-auto">
      {children}
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="text-ink-50 font-semibold">{children}</strong>
  ),
};
