"use client";

import Image from "next/image";

interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  // Contentful Images API - automatic WebP conversion and optimization
  const url = new URL(src);
  const params = new URLSearchParams(url.search);

  // Set width (default to 1920 if not provided)
  params.set("w", (width || 1920).toString());

  // Set quality (default 75%)
  params.set("q", (quality || 75).toString());

  // Convert to WebP format (modern, smaller file size)
  params.set("fm", "webp");

  // Progressive JPEG loading
  params.set("fl", "progressive");

  return `${url.origin}${url.pathname}?${params.toString()}`;
};

export default function ContentfulImage(props: ContentfulImageProps) {
  return (
    <Image
      alt={props.alt}
      loader={contentfulLoader}
      loading="lazy"
      placeholder="blur"
      blurDataURL={`${props.src}?w=10&q=10&fm=webp`}
      {...props}
    />
  );
}
