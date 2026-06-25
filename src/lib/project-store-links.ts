export function isStoreUrlAvailable(url?: string | null): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

type StoreLinkProject = {
  category: string;
  appStoreUrl?: string | null;
  playStoreUrl?: string | null;
};

/** Show store row for mobile apps or when at least one live store URL exists. */
export function shouldShowStoreBadges(project: StoreLinkProject): boolean {
  if (
    isStoreUrlAvailable(project.appStoreUrl) ||
    isStoreUrlAvailable(project.playStoreUrl)
  ) {
    return true;
  }

  return project.category === "Mobile App";
}
