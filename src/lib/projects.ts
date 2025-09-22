import { prisma } from "./prisma";

export async function getPublishedProjects(limit = 24) {
  return prisma.projectGalleryItem.findMany({
    orderBy: [{ showcaseDate: "desc" }, { createdAt: "desc" }],
    take: limit,
    select: {
      id: true,
      description: true,
      mainImageUrl: true,
      secondaryImageUrl: true,
      showcaseDate: true,
      relatedPost: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });
}

export async function getAllProjects() {
  return prisma.projectGalleryItem.findMany({
    orderBy: [{ showcaseDate: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      description: true,
      showcaseDate: true,
      mainImageUrl: true,
      secondaryImageUrl: true,
      relatedPost: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
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

export async function getProjectById(id: string) {
  return prisma.projectGalleryItem.findUnique({
    where: { id },
    select: {
      id: true,
      description: true,
      showcaseDate: true,
      mainImageUrl: true,
      mainImageKey: true,
      secondaryImageUrl: true,
      secondaryImageKey: true,
      relatedPostId: true,
    },
  });
}
