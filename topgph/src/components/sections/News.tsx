import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { WPPost } from "@/lib/wordpress";

interface NewsProps {
  posts: WPPost[];
}

export function News({ posts }: NewsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="news" className="py-24 bg-background relative overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 heading-divider-center">
            News &amp; <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            Stay updated with our latest projects, company news, and industry insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 flex flex-col h-full shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-surface">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center">
                    <span className="text-gray-600 font-display font-bold text-xl">TOP-G Tech</span>
                  </div>
                )}
                {post.categories && post.categories.nodes.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {post.categories.nodes[0].name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <div 
                  className="text-gray-400 text-sm mb-6 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                
                <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors w-fit">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
