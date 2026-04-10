import Link from "next/link";
import type { Article } from "@/lib/content/writing";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group block border-t border-ink-800/80 py-10 md:py-12 transition-colors duration-300 hover:border-ink-600"
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 pt-2">
          {formatDate(article.date)}
        </div>

        <div className="col-span-12 md:col-span-7">
          <h3 className="font-serif text-2xl md:text-3xl text-ink-50 leading-tight tracking-tight group-hover:text-accent transition-colors duration-500 mb-3">
            {article.title}
          </h3>
          <p className="text-ink-300 leading-relaxed text-base">
            {article.excerpt}
          </p>
        </div>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
            {article.readingTimeMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
