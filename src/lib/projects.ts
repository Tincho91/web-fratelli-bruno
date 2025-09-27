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
export interface UpdateProjectInput {
  description: string;
  showcaseDate: Date;
  mainImageUrl: string;
  mainImageKey: string | null;
  secondaryImageUrl: string | null;
  secondaryImageKey: string | null;
  relatedPostId: string | null;
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  return prisma.projectGalleryItem.update({
    where: { id },
    data,
    select: {
      id: true,
      showcaseDate: true,
      updatedAt: true,
    },
  });
}

export async function deleteProject(id: string) {
  await prisma.projectGalleryItem.delete({ where: { id } });
}

