export interface FeatureFlags {
  EXPLORE_MODE: 'lite' | 'full';
  ENABLE_FORMATION: boolean;
  ENABLE_DOCS: boolean;
  ENABLE_PAYMENTS_UI: boolean;
  REQUIRE_ADMIN_AUTH: boolean;
  ENABLE_AFFILIATES: boolean;
  ENABLE_ANALYTICS: boolean;
  ENABLE_BLOG_ADMIN: boolean;
}

export const DEFAULT_FLAGS: FeatureFlags = {
  EXPLORE_MODE: 'lite',
  ENABLE_FORMATION: false,
  ENABLE_DOCS: false,
  ENABLE_PAYMENTS_UI: false,
  REQUIRE_ADMIN_AUTH: true,
  ENABLE_AFFILIATES: true,
  ENABLE_ANALYTICS: false,
  ENABLE_BLOG_ADMIN: false,
};

export function getFeatureFlags(): FeatureFlags {
  return {
    EXPLORE_MODE: (import.meta.env.VITE_EXPLORE_MODE as 'lite' | 'full') || DEFAULT_FLAGS.EXPLORE_MODE,
    ENABLE_FORMATION: import.meta.env.VITE_ENABLE_FORMATION === 'true',
    ENABLE_DOCS: import.meta.env.VITE_ENABLE_DOCS === 'true',
    ENABLE_PAYMENTS_UI: import.meta.env.VITE_ENABLE_PAYMENTS_UI === 'true',
    REQUIRE_ADMIN_AUTH: import.meta.env.VITE_REQUIRE_ADMIN_AUTH !== 'false',
    ENABLE_AFFILIATES: import.meta.env.VITE_ENABLE_AFFILIATES !== 'false',
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    ENABLE_BLOG_ADMIN: import.meta.env.VITE_ENABLE_BLOG_ADMIN === 'true',
  };
}

export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[flag] === true || (flag === 'EXPLORE_MODE' && flags[flag] === 'lite');
}

export function getExploreMode(): 'lite' | 'full' {
  return getFeatureFlags().EXPLORE_MODE;
}
