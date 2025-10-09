import { ResponsiveContainer, ResponsiveText, ResponsiveCard, ResponsiveButton } from '@/components/ui';
import { ArrowRight, CheckCircle, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';

/**
 * Component Showcase Page
 *
 * This page demonstrates the new responsive component system.
 * Compare this clean code to the old inline responsive utility approach.
 *
 * To view: Add route in App.tsx:
 * <Route path="/showcase" element={<ComponentShowcase />} />
 */
export default function ComponentShowcase() {
  return (
    <>
      <SEOHead
        title="Responsive Component Showcase"
        description="Demonstration of the UNA Platform responsive component system"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
        {/* Hero Section */}
        <ResponsiveContainer size="spacious" maxWidth="xl">
          <div className="text-center py-12">
            <ResponsiveText variant="h1" weight="bold" font="montserrat" className="text-white mb-4">
              Responsive Component System
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 max-w-2xl mx-auto">
              A demonstration of consistent, maintainable, mobile-first components.
              Resize your browser to see responsive behavior.
            </ResponsiveText>
          </div>
        </ResponsiveContainer>

        {/* Typography Examples */}
        <ResponsiveContainer size="default" maxWidth="xl">
          <ResponsiveCard variant="default" className="mb-8">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              Typography Variants
            </ResponsiveText>

            <div className="space-y-4">
              <div>
                <ResponsiveText variant="h1" weight="bold" className="text-white">
                  H1 Heading - Bold
                </ResponsiveText>
                <ResponsiveText variant="caption" className="text-white/60">
                  Mobile: 3xl, Desktop: 4xl-6xl
                </ResponsiveText>
              </div>

              <div>
                <ResponsiveText variant="h2" weight="semibold" className="text-white">
                  H2 Heading - Semibold
                </ResponsiveText>
                <ResponsiveText variant="caption" className="text-white/60">
                  Mobile: 2xl, Desktop: 3xl-4xl
                </ResponsiveText>
              </div>

              <div>
                <ResponsiveText variant="h3" weight="medium" className="text-white">
                  H3 Heading - Medium
                </ResponsiveText>
                <ResponsiveText variant="caption" className="text-white/60">
                  Mobile: xl, Desktop: 2xl
                </ResponsiveText>
              </div>

              <div>
                <ResponsiveText variant="body" font="lora" className="text-white/90">
                  Body text using Lora font. Perfect for readable paragraphs with automatic
                  responsive sizing. This ensures 16px minimum on mobile for iOS compliance.
                </ResponsiveText>
                <ResponsiveText variant="caption" className="text-white/60">
                  Mobile: sm (16px), Desktop: base
                </ResponsiveText>
              </div>

              <div>
                <ResponsiveText variant="caption" className="text-white/70">
                  Caption text for labels, hints, and secondary information.
                </ResponsiveText>
                <ResponsiveText variant="captionSmall" className="text-white/60">
                  Mobile: xs, Desktop: sm
                </ResponsiveText>
              </div>
            </div>
          </ResponsiveCard>
        </ResponsiveContainer>

        {/* Card Variants */}
        <ResponsiveContainer size="default" maxWidth="xl">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Card Variants
          </ResponsiveText>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ResponsiveCard variant="compact">
              <ResponsiveText variant="h4" weight="semibold" className="text-white mb-2">
                Compact Card
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Minimal padding. Best for dense layouts and grids.
                Mobile: p-3, Desktop: p-5
              </ResponsiveText>
            </ResponsiveCard>

            <ResponsiveCard variant="default">
              <ResponsiveText variant="h4" weight="semibold" className="text-white mb-2">
                Default Card
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Standard padding. Most common use case for content cards.
                Mobile: p-4, Desktop: p-6
              </ResponsiveText>
            </ResponsiveCard>

            <ResponsiveCard variant="spacious">
              <ResponsiveText variant="h4" weight="semibold" className="text-white mb-2">
                Spacious Card
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/70">
                Extra padding. Best for featured content and hero sections.
                Mobile: p-6, Desktop: p-8
              </ResponsiveText>
            </ResponsiveCard>
          </div>
        </ResponsiveContainer>

        {/* Button Variants */}
        <ResponsiveContainer size="default" maxWidth="xl">
          <ResponsiveCard variant="default" className="mb-8">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
              Button Variants & Sizes
            </ResponsiveText>

            <div className="space-y-6">
              {/* Primary Buttons */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Primary (Gold Gradient)
                </ResponsiveText>
                <div className="flex flex-wrap gap-3">
                  <ResponsiveButton variant="primary" size="sm">
                    Small Button
                  </ResponsiveButton>
                  <ResponsiveButton variant="primary" size="md">
                    Medium Button
                    <ArrowRight className="h-4 w-4" />
                  </ResponsiveButton>
                  <ResponsiveButton variant="primary" size="lg">
                    Large Button
                  </ResponsiveButton>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Secondary (Teal Gradient)
                </ResponsiveText>
                <div className="flex flex-wrap gap-3">
                  <ResponsiveButton variant="secondary" size="sm">
                    Small
                  </ResponsiveButton>
                  <ResponsiveButton variant="secondary" size="md">
                    Medium
                  </ResponsiveButton>
                  <ResponsiveButton variant="secondary" size="lg">
                    Large
                  </ResponsiveButton>
                </div>
              </div>

              {/* Outline Buttons */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Outline (Transparent with Border)
                </ResponsiveText>
                <div className="flex flex-wrap gap-3">
                  <ResponsiveButton variant="outline" size="sm">
                    Cancel
                  </ResponsiveButton>
                  <ResponsiveButton variant="outline" size="md">
                    Learn More
                  </ResponsiveButton>
                  <ResponsiveButton variant="outline" size="lg">
                    Back
                  </ResponsiveButton>
                </div>
              </div>

              {/* Ghost Buttons */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Ghost (Minimal)
                </ResponsiveText>
                <div className="flex flex-wrap gap-3">
                  <ResponsiveButton variant="ghost" size="sm">
                    Skip
                  </ResponsiveButton>
                  <ResponsiveButton variant="ghost" size="md">
                    Maybe Later
                  </ResponsiveButton>
                </div>
              </div>

              {/* Full Width */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Full Width
                </ResponsiveText>
                <ResponsiveButton variant="primary" size="md" fullWidth>
                  Full Width Button (Great for Mobile Forms)
                  <CheckCircle className="h-4 w-4" />
                </ResponsiveButton>
              </div>

              {/* Disabled State */}
              <div>
                <ResponsiveText variant="h4" weight="semibold" className="text-white mb-3">
                  Disabled State
                </ResponsiveText>
                <ResponsiveButton variant="primary" size="md" disabled>
                  Disabled Button
                </ResponsiveButton>
              </div>
            </div>
          </ResponsiveCard>
        </ResponsiveContainer>

        {/* Container Variants */}
        <ResponsiveContainer size="default" maxWidth="xl">
          <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-6">
            Container Variants
          </ResponsiveText>

          <ResponsiveContainer size="tight" maxWidth="md" className="bg-white/5 mb-4">
            <ResponsiveText variant="body" className="text-white/90">
              <strong>Tight Container:</strong> Minimal padding (px-3 py-2 → px-4 py-3)
            </ResponsiveText>
          </ResponsiveContainer>

          <ResponsiveContainer size="default" maxWidth="md" className="bg-white/5 mb-4">
            <ResponsiveText variant="body" className="text-white/90">
              <strong>Default Container:</strong> Standard padding (px-4 py-3 → px-6 py-4)
            </ResponsiveText>
          </ResponsiveContainer>

          <ResponsiveContainer size="spacious" maxWidth="md" className="bg-white/5 mb-8">
            <ResponsiveText variant="body" className="text-white/90">
              <strong>Spacious Container:</strong> Extra padding (px-6 py-4 → px-8 py-6)
            </ResponsiveText>
          </ResponsiveContainer>
        </ResponsiveContainer>

        {/* Real-World Example */}
        <ResponsiveContainer size="default" maxWidth="lg">
          <ResponsiveCard variant="default" className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#C49A6C] to-[#2F7E7E] rounded-full p-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <ResponsiveText variant="h3" weight="bold" font="montserrat" className="text-white mb-2">
                  Real-World Example
                </ResponsiveText>
                <ResponsiveText variant="body" font="lora" className="text-white/90">
                  This card demonstrates the complete system working together.
                  Clean code, consistent spacing, automatic responsive behavior.
                </ResponsiveText>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                <ResponsiveText variant="body" font="lora" className="text-white/90">
                  <strong className="text-white">Consistent:</strong> All spacing follows design tokens
                </ResponsiveText>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                <ResponsiveText variant="body" font="lora" className="text-white/90">
                  <strong className="text-white">Maintainable:</strong> Change component, update everywhere
                </ResponsiveText>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C49A6C] flex-shrink-0 mt-0.5" />
                <ResponsiveText variant="body" font="lora" className="text-white/90">
                  <strong className="text-white">Type-safe:</strong> TypeScript validates all props
                </ResponsiveText>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <ResponsiveButton variant="primary" size="md">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </ResponsiveButton>
              <ResponsiveButton variant="outline" size="md">
                Learn More
              </ResponsiveButton>
            </div>
          </ResponsiveCard>
        </ResponsiveContainer>

        {/* Mobile Testing Tips */}
        <ResponsiveContainer size="default" maxWidth="xl">
          <ResponsiveCard variant="spacious" className="bg-blue-500/10 border-blue-400/20 mb-8">
            <ResponsiveText variant="h3" weight="bold" font="montserrat" className="text-white mb-4">
              📱 Mobile Testing Tips
            </ResponsiveText>
            <div className="space-y-2">
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                • <strong>Resize your browser</strong> - See breakpoints in action
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                • <strong>Test on real devices</strong> - iPhone SE, iPad, Android
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                • <strong>Check touch targets</strong> - All buttons minimum 44px
              </ResponsiveText>
              <ResponsiveText variant="body" font="lora" className="text-white/90">
                • <strong>Verify text size</strong> - Minimum 16px on mobile (no zoom)
              </ResponsiveText>
            </div>
          </ResponsiveCard>
        </ResponsiveContainer>

        {/* Footer CTA */}
        <ResponsiveContainer size="spacious" maxWidth="lg">
          <div className="text-center py-12">
            <ResponsiveText variant="h2" weight="bold" font="montserrat" className="text-white mb-4">
              Ready to Migrate Your Pages?
            </ResponsiveText>
            <ResponsiveText variant="bodyLarge" font="lora" className="text-white/90 mb-8 max-w-2xl mx-auto">
              Check the documentation in <code className="text-[#C49A6C]">docs/RESPONSIVE_COMPONENTS.md</code> for
              migration guides and best practices.
            </ResponsiveText>
            <ResponsiveButton variant="primary" size="lg">
              View Documentation
              <ArrowRight className="h-5 w-5" />
            </ResponsiveButton>
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
}
