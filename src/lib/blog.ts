import { prisma } from "./prisma";
import { BlogStatus } from "@prisma/client";

export async function getPublishedPosts(limit = 12) {
  return prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImageUrl: true,
      category: true,
      publishedAt: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function getPostBySlug(slug: string, includeDraft = false) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      ...(includeDraft ? {} : { status: BlogStatus.PUBLISHED }),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function getAllPosts() {
  return prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      status: true,
      category: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          interactionEvents: true,
        },
      },
    },
  });
}

