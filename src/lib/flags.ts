export interface FeatureFlags {
  EXPLORE_MODE: 'lite' | 'full';
  ENABLE_FORMATION: boolean;
  ENABLE_DOCS: boolean;
  ENABLE_PAYMENTS_UI: boolean;
  REQUIRE_ADMIN_AUTH: boolean;
  ENABLE_AFFILIATES: boolean;
  ENABLE_ANALYTICS: boolean;
  ENABLE_BLOG_ADMIN: boolean;
  ADMIN_ALLOWED_EMAILS: string[];
}

export const FLAGS = {
  EXPLORE_MODE: (import.meta.env.VITE_EXPLORE_MODE ?? 'lite') as 'lite' | 'full',
  ENABLE_FORMATION: import.meta.env.VITE_ENABLE_FORMATION === 'true',  // default false
  ENABLE_DOCS: import.meta.env.VITE_ENABLE_DOCS === 'true',            // default false
  ENABLE_PAYMENTS_UI: import.meta.env.VITE_ENABLE_PAYMENTS_UI === 'true', // default false
  REQUIRE_ADMIN_AUTH: import.meta.env.VITE_REQUIRE_ADMIN_AUTH !== 'false', // default true
  ENABLE_AFFILIATES: import.meta.env.VITE_ENABLE_AFFILIATES !== 'false',   // default true
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',     // default true
  ENABLE_BLOG_ADMIN: import.meta.env.VITE_ENABLE_BLOG_ADMIN === 'true',    // default false
  ADMIN_ALLOWED_EMAILS: (import.meta.env.VITE_ADMIN_ALLOWED_EMAILS ?? '')
    .split(',').map((s: string) => s.trim()).filter(Boolean),
};

export function getFeatureFlags(): FeatureFlags {
  return FLAGS;
}

export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[flag] === true || (flag === 'EXPLORE_MODE' && flags[flag] === 'lite');
}

export function getExploreMode(): 'lite' | 'full' {
  return getFeatureFlags().EXPLORE_MODE;
}
