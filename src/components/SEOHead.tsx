import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'service';
  schema?: object;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  schema
}: SEOHeadProps) {
  const fullTitle = `${title} | UNA Formation Done Right`;
  const defaultKeywords = [
    'UNA formation California',
    'Unincorporated Nonprofit Association',
    'alternative nonprofit formation',
    'California UNA formation',
    'sovereign legal structure',
    'collective formation California',
    'UNA formation requirements California',
    'administrative support UNA formation'
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords];

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', allKeywords.join(', '));
    
    // Update or create Open Graph tags
    const ogTags = [
      { property: 'og:type', content: ogType },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonicalUrl || window.location.href },
      { property: 'og:site_name', content: 'UNA Formation Platform' }
    ];
    
    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
    
    // Update or create Twitter tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    });
    
    // Add canonical URL if provided
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }
    
    // Add schema markup if provided
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }
    
    // Add default organization schema if no custom schema provided
    if (!schema) {
      const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "UNA Formation Platform",
        "description": "Professional UNA formation services in California with administrative support and compliance guaranteed.",
        "url": "https://unaplatform.com",
        "logo": "https://unaplatform.com/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "California",
          "addressCountry": "US"
        },
        "serviceType": "UNA Formation",
        "areaServed": "California",
        "priceRange": "$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "UNA Formation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Complete UNA Formation Package",
                "description": "Professional UNA formation with administrative support and compliance guaranteed"
              }
            }
          ]
        }
      };
      
      let defaultSchemaScript = document.querySelector('script[data-default-schema="true"]');
      if (!defaultSchemaScript) {
        defaultSchemaScript = document.createElement('script');
        defaultSchemaScript.setAttribute('type', 'application/ld+json');
        defaultSchemaScript.setAttribute('data-default-schema', 'true');
        document.head.appendChild(defaultSchemaScript);
      }
      defaultSchemaScript.textContent = JSON.stringify(defaultSchema);
    }
    
    // Cleanup function
    return () => {
      // Remove any meta tags we added (optional cleanup)
      // This prevents accumulation of duplicate tags
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  // This component doesn't render anything visible
  return null;
}
