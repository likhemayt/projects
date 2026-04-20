/**
 * WordPress GraphQL Client
 *
 * Connects to a headless WordPress instance via WPGraphQL.
 * Provides typed functions for fetching posts, pages, media, and submitting forms.
 *
 * Setup on WordPress (Hostinger):
 *   1. Install & activate the "WPGraphQL" plugin (https://www.wpgraphql.com/)
 *   2. Install & activate "Contact Form 7" or "WPForms" for form handling
 *   3. Optionally install "WPGraphQL for ACF" if using Advanced Custom Fields
 *   4. Set NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL in .env.local
 */

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || "https://topgph.com/graphql";

// ─── Generic Fetch ───────────────────────────────────────────

async function fetchGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Unknown GraphQL error");
  }

  return json.data as T;
}

// ─── Queries ─────────────────────────────────────────────────

export async function getPosts(first = 10) {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ posts: { nodes: WPPost[] } }>(query, {
    first,
  });
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ post: WPPost | null }>(query, { slug });
  return data.post;
}

export async function getPages() {
  const query = `
    query GetPages {
      pages(where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ pages: { nodes: WPPage[] } }>(query);
  return data.pages.nodes;
}

export async function getMediaItems(first = 20) {
  const query = `
    query GetMedia($first: Int!) {
      mediaItems(first: $first) {
        nodes {
          id
          sourceUrl
          altText
          title
          mediaDetails {
            width
            height
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ mediaItems: { nodes: WPMediaItem[] } }>(
    query,
    { first }
  );
  return data.mediaItems.nodes;
}

// ─── REST API Fallback for Form Submission ───────────────────
// Contact Form 7 REST API endpoint (no GraphQL mutation needed)

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://topgph.com";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // This uses the Contact Form 7 REST API.
  // Replace FORM_ID with your actual CF7 form ID after setup.
  const FORM_ID = "contact-form"; // placeholder

  const body = new FormData();
  body.append("your-name", formData.name);
  body.append("your-email", formData.email);
  body.append("your-subject", formData.subject);
  body.append("your-message", formData.message);

  const res = await fetch(
    `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`,
    {
      method: "POST",
      body,
    }
  );

  if (!res.ok) {
    throw new Error("Form submission failed");
  }

  return res.json();
}

export async function submitServiceInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  // Same pattern as contact form — uses CF7 REST API
  const FORM_ID = "service-inquiry"; // placeholder

  const body = new FormData();
  body.append("your-name", formData.name);
  body.append("your-email", formData.email);
  body.append("your-phone", formData.phone);
  body.append("your-service", formData.service);
  body.append("your-message", formData.message);

  const res = await fetch(
    `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`,
    {
      method: "POST",
      body,
    }
  );

  if (!res.ok) {
    throw new Error("Inquiry submission failed");
  }

  return res.json();
}

// ─── Types ───────────────────────────────────────────────────

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content?: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  categories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  seo?: {
    title: string;
    metaDesc: string;
    opengraphImage?: {
      sourceUrl: string;
    };
  };
}

export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface WPMediaItem {
  id: string;
  sourceUrl: string;
  altText: string;
  title: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}
