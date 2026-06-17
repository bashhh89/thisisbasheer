import { getFeaturedProjects, getAllProjects } from "@/lib/content/projects";
import { getAllArticles } from "@/lib/content/writing";
import { getSetting } from "@/lib/admin/settings";

export async function getHomeData() {
  const [eyebrow, subline, heroProof, operationStats] = await Promise.all([
    getSetting("hero.eyebrow"),
    getSetting("hero.subline"),
    getSetting("proof.hero"),
    getSetting("proof.operation"),
  ]);

  let projects = await getFeaturedProjects(4);
  if (projects.length === 0) {
    projects = (await getAllProjects()).slice(0, 4);
  }

  const articles = (await getAllArticles()).slice(0, 3);

  return {
    eyebrow,
    subline,
    heroProof,
    operationStats,
    projects,
    articles,
  };
}
