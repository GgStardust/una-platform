import React from 'react';
import { Navigate } from 'react-router-dom';
import { FLAGS } from '@/lib/flags';

interface FormationGuardProps {
  children: React.ReactNode;
  feature?: 'formation' | 'docs';
}

export default function FormationGuard({ children, feature = 'formation' }: FormationGuardProps) {
  const isFormationEnabled = FLAGS.ENABLE_FORMATION;
  const isDocsEnabled = FLAGS.ENABLE_DOCS;

  // Check if the requested feature is enabled
  const isFeatureEnabled = feature === 'formation' ? isFormationEnabled : isDocsEnabled;

  if (!isFeatureEnabled) {
    return (
      <Navigate 
        to="/services" 
        replace 
        state={{ 
          message: "Automated docs are coming soon. Book a session to prepare documents manually.",
          from: window.location.pathname
        }}
      />
    );
  }

  return <>{children}</>;
}
