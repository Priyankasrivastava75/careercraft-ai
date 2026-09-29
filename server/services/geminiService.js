const { GoogleGenAI, Type } = require('@google/genai');

/**
 * Service to analyze job descriptions using Gemini AI
 */
const analyzeJobDescription = async (jobDescription, companyName = '', jobRole = '') => {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `You are an expert ATS (Applicant Tracking System) Engine and Technical Recruiter.
Analyze the provided Job Description carefully. Extract exact requirements into the requested structured JSON format.

CRITICAL RULES:
1. Do NOT invent or hallucinate requirements that are not supported by the supplied Job Description.
2. If a section (like Certifications or Education) is not mentioned in the text, return "Not specified".
3. Extract clean, concise keywords and technical skills for ATS keyword matching.`;

  const prompt = `Company: ${companyName || 'Not specified'}
Target Role: ${jobRole || 'Not specified'}

Job Description Text:
"""
${jobDescription}
"""

Extract and return a valid JSON object matching this schema:
{
  "jobTitle": "Extracted job title or role name",
  "companyName": "Extracted company name",
  "experienceLevel": "Required years or level of experience (e.g. 3-5 years, Senior)",
  "educationRequirements": ["List of degree/education requirements"],
  "technicalSkills": ["List of hard technical skills/tools"],
  "softSkills": ["List of soft skills/interpersonal traits"],
  "certifications": ["List of certifications or licenses"],
  "importantKeywords": ["List of top ATS keywords for resume optimization"],
  "mainResponsibilities": ["List of primary job duties & responsibilities"]
}`;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              jobTitle: { type: Type.STRING },
              companyName: { type: Type.STRING },
              experienceLevel: { type: Type.STRING },
              educationRequirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              technicalSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
              importantKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              mainResponsibilities: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: [
              'jobTitle',
              'companyName',
              'experienceLevel',
              'educationRequirements',
              'technicalSkills',
              'softSkills',
              'certifications',
              'importantKeywords',
              'mainResponsibilities'
            ]
          }
        }
      });

      const jsonText = response.text;
      const parsedData = JSON.parse(jsonText);
      return sanitizeAnalysisResult(parsedData, companyName, jobRole);
    } catch (err) {
      console.warn('⚠️ Gemini API call failed or rate limited. Falling back to structured analytical parser:', err.message);
    }
  }

  return fallbackAnalyticalParser(jobDescription, companyName, jobRole);
};

/**
 * Service to calculate an ATS Score (0-100) and category breakdown
 */
const calculateAtsScore = async (resumeData, jobDescription) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `You are an elite Applicant Tracking System (ATS) scoring engine.
Evaluate the candidate's resume against the target Job Description on a scale of 0 to 100.
Be realistic, objective, and transparent. Explain clearly why each category score was awarded.

CRITICAL SCORING CATEGORIES (0-100 each):
1. jobDescriptionMatch: Overall contextual alignment with role scope.
2. requiredSkills: Match percentage of hard/soft skills found in candidate's skills list & text.
3. keywords: Density & frequency of target ATS keywords from the JD present in the resume.
4. resumeStructure: Structural clarity, presence of contact info, summary, experience, education.
5. readability: Readability, clear formatting, bullet points, action verbs.
6. experienceRelevance: Overlap of past roles, job titles, and duties with required experience.
7. educationRelevance: Match with required degree, certifications, or field of study.

CRITICAL RULES:
- Never hallucinate skills or qualifications missing from the resume.
- Provide 3-5 transparent Strengths and 3-5 Areas for Improvement.`;

  const prompt = `Candidate Resume Data (JSON):
"""
${JSON.stringify(resumeData, null, 2)}
"""

Target Job Description:
"""
${jobDescription}
"""

Evaluate the resume and return a valid JSON object matching this exact schema:
{
  "overallScore": 85,
  "categories": {
    "jobDescriptionMatch": { "score": 80, "explanation": "Brief explanation" },
    "requiredSkills": { "score": 90, "explanation": "Brief explanation" },
    "keywords": { "score": 75, "explanation": "Brief explanation" },
    "resumeStructure": { "score": 95, "explanation": "Brief explanation" },
    "readability": { "score": 90, "explanation": "Brief explanation" },
    "experienceRelevance": { "score": 85, "explanation": "Brief explanation" },
    "educationRelevance": { "score": 80, "explanation": "Brief explanation" }
  },
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "areasForImprovement": ["Area 1", "Area 2", "Area 3"]
}`;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.NUMBER },
              categories: {
                type: Type.OBJECT,
                properties: {
                  jobDescriptionMatch: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  requiredSkills: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  keywords: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  resumeStructure: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  readability: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  experienceRelevance: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  },
                  educationRelevance: {
                    type: Type.OBJECT,
                    properties: { score: { type: Type.NUMBER }, explanation: { type: Type.STRING } },
                    required: ['score', 'explanation']
                  }
                },
                required: [
                  'jobDescriptionMatch',
                  'requiredSkills',
                  'keywords',
                  'resumeStructure',
                  'readability',
                  'experienceRelevance',
                  'educationRelevance'
                ]
              },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['overallScore', 'categories', 'strengths', 'areasForImprovement']
          }
        }
      });

      const parsedData = JSON.parse(response.text);
      return sanitizeScoreResult(parsedData);
    } catch (err) {
      console.warn('⚠️ Gemini ATS score API call failed. Falling back to rule-based ATS evaluator:', err.message);
    }
  }

  return fallbackAtsEvaluator(resumeData, jobDescription);
};

/**
 * Service to generate AI Resume Improvement Suggestions
 */
const generateResumeSuggestions = async (resumeData, jobDescription) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `You are a Career & ATS Optimization Advisor.
Analyze the candidate's current resume against the target Job Description and generate actionable improvement suggestions.

CRITICAL RULES:
1. NEVER invent qualifications, experience, years, degrees, or certifications that the candidate does not have.
2. Focus on:
   - Missing relevant keywords that can be added to skills or summary.
   - Clarifying existing skills and technical tools.
   - Strengthening weak/vague bullet points with action verbs.
   - Enhancing summary or project descriptions using context from candidate's background.
3. Every suggestion MUST include a clear preview of currentValue vs suggestedValue.
4. Set field to one of: 'summary', 'skills', 'description', 'technologies'.
5. Set targetSection to one of: 'summary', 'skills', 'experience', 'projects'.`;

  const prompt = `Candidate Resume Data:
"""
${JSON.stringify(resumeData, null, 2)}
"""

Target Job Description:
"""
${jobDescription}
"""

Return a valid JSON array of suggestion objects matching this schema:
[
  {
    "id": "sug_1",
    "category": "keywords",
    "title": "Add Missing Key Skill 'TypeScript'",
    "targetSection": "skills",
    "targetIndex": null,
    "field": "skills",
    "currentValue": "JavaScript, React",
    "suggestedValue": "JavaScript, React, TypeScript",
    "reason": "TypeScript is mentioned 4 times in the job description and is critical for ATS keyword matching."
  }
]`;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                category: { type: Type.STRING },
                title: { type: Type.STRING },
                targetSection: { type: Type.STRING },
                targetIndex: { type: Type.NUMBER },
                field: { type: Type.STRING },
                currentValue: { type: Type.STRING },
                suggestedValue: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ['id', 'category', 'title', 'targetSection', 'field', 'currentValue', 'suggestedValue', 'reason']
            }
          }
        }
      });

      const parsedData = JSON.parse(response.text);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (err) {
      console.warn('⚠️ Gemini Suggestions API call failed. Falling back to rule-based suggestion generator:', err.message);
    }
  }

  return fallbackSuggestionGenerator(resumeData, jobDescription);
};

/**
 * Sanitize and bound ATS score values
 */
function sanitizeScoreResult(data) {
  const clamp = (num) => Math.max(0, Math.min(100, Math.round(num || 0)));

  return {
    overallScore: clamp(data.overallScore),
    categories: {
      jobDescriptionMatch: {
        score: clamp(data.categories?.jobDescriptionMatch?.score),
        explanation: data.categories?.jobDescriptionMatch?.explanation || 'Overall alignment with key duties.'
      },
      requiredSkills: {
        score: clamp(data.categories?.requiredSkills?.score),
        explanation: data.categories?.requiredSkills?.explanation || 'Presence of core required skills.'
      },
      keywords: {
        score: clamp(data.categories?.keywords?.score),
        explanation: data.categories?.keywords?.explanation || 'ATS keyword frequency and density.'
      },
      resumeStructure: {
        score: clamp(data.categories?.resumeStructure?.score),
        explanation: data.categories?.resumeStructure?.explanation || 'Section organization and completeness.'
      },
      readability: {
        score: clamp(data.categories?.readability?.score),
        explanation: data.categories?.readability?.explanation || 'Bullet structure and typography clarity.'
      },
      experienceRelevance: {
        score: clamp(data.categories?.experienceRelevance?.score),
        explanation: data.categories?.experienceRelevance?.explanation || 'Relevance of past roles & duties.'
      },
      educationRelevance: {
        score: clamp(data.categories?.educationRelevance?.score),
        explanation: data.categories?.educationRelevance?.explanation || 'Match with educational background requirements.'
      }
    },
    strengths: Array.isArray(data.strengths) && data.strengths.length > 0 ? data.strengths : ['Clear resume organization.'],
    areasForImprovement: Array.isArray(data.areasForImprovement) && data.areasForImprovement.length > 0 ? data.areasForImprovement : ['Incorporate more job-specific keywords.']
  };
}

/**
 * Rule-based ATS score evaluator for fallback
 */
function fallbackAtsEvaluator(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase();

  // Extract skills from resume
  const resumeSkills = Array.isArray(resumeData.skills)
    ? resumeData.skills.map(s => (typeof s === 'string' ? s : s.name || '')).filter(Boolean)
    : [];

  const resumeText = JSON.stringify(resumeData).toLowerCase();

  // Check common tech terms
  const commonTech = ['react', 'node.js', 'javascript', 'typescript', 'python', 'java', 'sql', 'mongodb', 'aws', 'docker', 'rest api', 'git', 'redux', 'css', 'html'];
  const jdTech = commonTech.filter(t => jdLower.includes(t));

  const matchedSkills = jdTech.filter(t => resumeText.includes(t));
  const skillRatio = jdTech.length > 0 ? (matchedSkills.length / jdTech.length) : 0.8;

  const requiredSkillsScore = Math.round(50 + skillRatio * 45);
  const keywordsScore = Math.round(45 + skillRatio * 50);

  // Structural checks
  const hasSummary = Boolean(resumeData.summary && resumeData.summary.length > 20);
  const hasExp = Array.isArray(resumeData.experience) && resumeData.experience.length > 0;
  const hasEdu = Array.isArray(resumeData.education) && resumeData.education.length > 0;
  const hasContact = Boolean(resumeData.personalInfo?.email && resumeData.personalInfo?.fullName);

  let structureScore = 40;
  if (hasContact) structureScore += 15;
  if (hasSummary) structureScore += 15;
  if (hasExp) structureScore += 15;
  if (hasEdu) structureScore += 15;

  const readabilityScore = hasExp && resumeData.experience.some(e => e.description && e.description.includes('•')) ? 88 : 78;
  const experienceRelevanceScore = hasExp ? Math.round(60 + skillRatio * 35) : 40;
  const educationRelevanceScore = hasEdu ? 85 : 50;
  const jobDescriptionMatchScore = Math.round((requiredSkillsScore + keywordsScore + experienceRelevanceScore) / 3);

  const overallScore = Math.round(
    (jobDescriptionMatchScore * 0.25) +
    (requiredSkillsScore * 0.20) +
    (keywordsScore * 0.15) +
    (experienceRelevanceScore * 0.15) +
    (structureScore * 0.10) +
    (readabilityScore * 0.10) +
    (educationRelevanceScore * 0.05)
  );

  const strengths = [];
  if (hasContact && hasSummary) strengths.push('Well-structured layout with clear contact information and summary.');
  if (matchedSkills.length > 0) strengths.push(`Includes key target technical skills: ${matchedSkills.slice(0, 3).map(s => s.toUpperCase()).join(', ')}.`);
  if (hasExp) strengths.push('Demonstrates relevant work experience entries.');
  if (strengths.length === 0) strengths.push('Clean foundational layout structure.');

  const areasForImprovement = [];
  const missingTech = jdTech.filter(t => !matchedSkills.includes(t));
  if (missingTech.length > 0) {
    areasForImprovement.push(`Incorporate missing target keywords like ${missingTech.slice(0, 3).join(', ')} into your experience bullets.`);
  }
  if (!hasSummary) {
    areasForImprovement.push('Add a concise Professional Summary tailored to the target role.');
  }
  if (!resumeText.includes('achieved') && !resumeText.includes('improved') && !resumeText.includes('increased')) {
    areasForImprovement.push('Use more quantitative impact metrics (e.g., increased revenue by 25%, reduced load time by 40%).');
  }
  if (areasForImprovement.length === 0) {
    areasForImprovement.push('Tailor project bullet points more closely to job description terminology.');
  }

  return {
    overallScore,
    categories: {
      jobDescriptionMatch: {
        score: jobDescriptionMatchScore,
        explanation: `Resume content matches approximately ${jobDescriptionMatchScore}% of the role domain requirements.`
      },
      requiredSkills: {
        score: requiredSkillsScore,
        explanation: `Found ${matchedSkills.length} of ${jdTech.length || 'key'} required skills referenced in the job description.`
      },
      keywords: {
        score: keywordsScore,
        explanation: 'ATS keyword density evaluates match with primary job posting terminology.'
      },
      resumeStructure: {
        score: structureScore,
        explanation: 'Evaluates presence of standard sections: Contact, Summary, Experience, Education, and Skills.'
      },
      readability: {
        score: readabilityScore,
        explanation: 'Evaluates bullet point structure, visual formatting, and scannability for recruiters.'
      },
      experienceRelevance: {
        score: experienceRelevanceScore,
        explanation: 'Evaluates duty alignment between your past experience and target responsibilities.'
      },
      educationRelevance: {
        score: educationRelevanceScore,
        explanation: 'Degree and educational background match against job posting requirements.'
      }
    },
    strengths,
    areasForImprovement
  };
}

/**
 * Rule-based fallback generator for AI Suggestions
 */
function fallbackSuggestionGenerator(resumeData, jobDescription) {
  const suggestions = [];
  const jdLower = jobDescription.toLowerCase();
  const resumeText = JSON.stringify(resumeData).toLowerCase();

  // 1. Missing Keywords / Skills
  const commonTech = ['React', 'Node.js', 'TypeScript', 'JavaScript', 'SQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'REST API', 'Git', 'Agile', 'CI/CD', 'Redux', 'Tailwind CSS'];
  const missingTech = commonTech.filter(tech => jdLower.includes(tech.toLowerCase()) && !resumeText.includes(tech.toLowerCase()));

  const currentSkillsList = Array.isArray(resumeData.skills)
    ? resumeData.skills.map(s => (typeof s === 'string' ? s : s.name || '')).filter(Boolean)
    : [];

  if (missingTech.length > 0) {
    const newSkills = [...currentSkillsList, ...missingTech.slice(0, 3)];
    suggestions.push({
      id: 'sug_skills_keywords',
      category: 'keywords',
      title: `Add missing ATS keywords (${missingTech.slice(0, 3).join(', ')})`,
      targetSection: 'skills',
      targetIndex: null,
      field: 'skills',
      currentValue: currentSkillsList.join(', '),
      suggestedValue: newSkills.join(', '),
      reason: `The job posting highlights ${missingTech.slice(0, 3).join(', ')}. Adding them to your Skills section directly improves ATS keyword matching.`
    });
  }

  // 2. Professional Summary Enhancement
  const currentSummary = resumeData.summary || '';
  if (!currentSummary || currentSummary.length < 40) {
    const roleMatch = jobDescription.match(/(\w+\s+\w+\s+(?:Developer|Engineer|Manager|Designer|Analyst))/i);
    const targetRole = roleMatch ? roleMatch[1] : 'Results-driven Professional';
    const suggestedSummary = `${targetRole} with hands-on experience building scalable applications, driving software excellence, and delivering user-centric solutions aligned with modern industry standards.`;

    suggestions.push({
      id: 'sug_summary_enhance',
      category: 'summary',
      title: 'Strengthen Professional Summary with target role focus',
      targetSection: 'summary',
      targetIndex: null,
      field: 'summary',
      currentValue: currentSummary || '(Empty Summary)',
      suggestedValue: suggestedSummary,
      reason: 'A targeted professional summary instantly informs recruiters and ATS algorithms of your alignment with the role.'
    });
  } else if (!currentSummary.toLowerCase().includes('scalable') && !currentSummary.toLowerCase().includes('optimized')) {
    const enhancedSummary = `${currentSummary.trim()} Passionate about building scalable, high-performance applications and collaborating across cross-functional teams.`;
    suggestions.push({
      id: 'sug_summary_impact',
      category: 'summary',
      title: 'Add Action-Oriented Impact to Summary',
      targetSection: 'summary',
      targetIndex: null,
      field: 'summary',
      currentValue: currentSummary,
      suggestedValue: enhancedSummary,
      reason: 'Adding action-oriented keywords elevates your summary for leadership and recruiter screening.'
    });
  }

  // 3. Experience Bullet Wording
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    const firstExp = resumeData.experience[0];
    const currentDesc = firstExp.description || '';

    if (currentDesc && !currentDesc.toLowerCase().includes('engineered') && !currentDesc.toLowerCase().includes('architected')) {
      let suggestedDesc = currentDesc;
      if (suggestedDesc.startsWith('Worked on')) {
        suggestedDesc = suggestedDesc.replace(/^Worked on/i, 'Spearheaded development of');
      } else if (suggestedDesc.startsWith('Responsible for')) {
        suggestedDesc = suggestedDesc.replace(/^Responsible for/i, 'Architected and delivered');
      } else if (!suggestedDesc.includes('•')) {
        suggestedDesc = `• Architected and developed core software modules using modern frameworks, resulting in enhanced system performance.\n• ${suggestedDesc}`;
      } else {
        suggestedDesc = suggestedDesc.replace('• ', '• Spearheaded ');
      }

      suggestions.push({
        id: 'sug_exp_0_action',
        category: 'experience',
        title: `Use stronger action verbs for ${firstExp.jobTitle || 'recent role'}`,
        targetSection: 'experience',
        targetIndex: 0,
        field: 'description',
        currentValue: currentDesc,
        suggestedValue: suggestedDesc,
        reason: 'Replacing passive language ("worked on", "responsible for") with action verbs ("spearheaded", "architected") increases recruiter engagement score.'
      });
    }
  }

  // 4. Project Descriptions
  if (Array.isArray(resumeData.projects) && resumeData.projects.length > 0) {
    const firstProj = resumeData.projects[0];
    const currentTech = firstProj.technologies || '';
    if (missingTech.length > 0 && (!currentTech || currentTech.length < 5)) {
      suggestions.push({
        id: 'sug_proj_0_tech',
        category: 'projects',
        title: `Specify technologies used in ${firstProj.name || 'Project'}`,
        targetSection: 'projects',
        targetIndex: 0,
        field: 'technologies',
        currentValue: currentTech || '(Not specified)',
        suggestedValue: missingTech.slice(0, 2).join(', '),
        reason: 'Listing specific technical stacks in project entries improves skill verification by technical hiring managers.'
      });
    }
  }

  return suggestions;
}

function sanitizeAnalysisResult(data, companyName, jobRole) {
  return {
    jobTitle: data.jobTitle || jobRole || 'Job Position',
    companyName: data.companyName || companyName || 'Company',
    experienceLevel: data.experienceLevel || 'Not specified',
    educationRequirements: Array.isArray(data.educationRequirements) && data.educationRequirements.length > 0 ? data.educationRequirements : ['Not specified'],
    technicalSkills: Array.isArray(data.technicalSkills) && data.technicalSkills.length > 0 ? data.technicalSkills : ['Not specified'],
    softSkills: Array.isArray(data.softSkills) && data.softSkills.length > 0 ? data.softSkills : ['Not specified'],
    certifications: Array.isArray(data.certifications) && data.certifications.length > 0 ? data.certifications : ['Not specified'],
    importantKeywords: Array.isArray(data.importantKeywords) && data.importantKeywords.length > 0 ? data.importantKeywords : ['Not specified'],
    mainResponsibilities: Array.isArray(data.mainResponsibilities) && data.mainResponsibilities.length > 0 ? data.mainResponsibilities : ['Not specified']
  };
}

function fallbackAnalyticalParser(text, companyName, jobRole) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const knownTech = ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Git', 'Tailwind CSS', 'Agile', 'CI/CD'];
  const lowerText = text.toLowerCase();
  const foundTech = knownTech.filter(tech => lowerText.includes(tech.toLowerCase()));

  const knownSoft = ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Collaboration', 'Time Management', 'Analytical Thinking'];
  const foundSoft = knownSoft.filter(soft => lowerText.includes(soft.toLowerCase()));

  const expMatch = text.match(/(\d+\+?\s*(?:-\s*\d+)?\s*years?(?:\s+of)?\s+experience)/i);
  const experienceLevel = expMatch ? expMatch[1] : 'Not specified';

  const eduMatch = text.match(/(Bachelor'?s?|Master'?s?|B\.?S\.?|M\.?S\.?|Ph\.?D\.?|Degree\s+in\s+[\w\s]+)/i);
  const educationRequirements = eduMatch ? [eduMatch[0]] : ['Not specified'];

  const responsibilities = lines.filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || /^\d+\./.test(l)).map(l => l.replace(/^[-•*\d.]+\s*/, '')).slice(0, 5);

  return {
    jobTitle: jobRole || (lines[0] && lines[0].length < 50 ? lines[0] : 'Job Position'),
    companyName: companyName || 'Not specified',
    experienceLevel,
    educationRequirements,
    technicalSkills: foundTech.length > 0 ? foundTech : ['Not specified'],
    softSkills: foundSoft.length > 0 ? foundSoft : ['Not specified'],
    certifications: ['Not specified'],
    importantKeywords: [...foundTech, ...foundSoft].slice(0, 8),
    mainResponsibilities: responsibilities.length > 0 ? responsibilities : ['Not specified']
  };
}

module.exports = {
  analyzeJobDescription,
  calculateAtsScore,
  generateResumeSuggestions
};
