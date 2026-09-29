import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

export default function ResumePreview({ data, selectedTemplate = 'modern' }) {
  switch (selectedTemplate) {
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'professional':
      return <ProfessionalTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
}
