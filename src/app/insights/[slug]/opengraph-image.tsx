import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { posts } from "../posts";

export const alt = "Foreland Marine Insights";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// One image per route, not one per post. Returning the whole posts array here
// made every article advertise the first post's id and alt text, so all 33
// articles shared an og:image URL and an og:image:alt describing a different
// article than the one being shared.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return [
    {
      id: slug,
      alt: post?.title ?? alt,
      contentType: OG_CONTENT_TYPE,
      size: OG_SIZE,
    },
  ];
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const date = post
    ? new Date(post.date).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : "";

  return renderOgCard({
    eyebrow: post?.category ?? "Insights",
    title: post?.title ?? "Foreland Marine Insights",
    subtitle: post?.description,
    url: "forelandmarine.com/insights",
    footnote: date ? `Jack MacNally, ${date}` : "Jack MacNally",
  });
}
