import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dularhatsecondaryschool.edu.bd";
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/about/history",
    "/about/mission",
    "/administration",
    "/administration/headmaster",
    "/administration/committee",
    "/teachers",
    "/staff",
    "/academics",
    "/academics/routine",
    "/academics/examination",
    "/admission",
    "/notices",
    "/results",
    "/gallery",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : route === "/notices" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/notices" ? 0.9 : 0.7,
  }));
}
