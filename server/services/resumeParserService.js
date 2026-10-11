const { GoogleGenAI, Type } = require('@google/genai');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract raw text from file buffer (PDF, DOCX, or TXT)
 */
const extractTextFromBuffer = async (buffer, mimeType, originalname = '') => {
  const ext = originalname.toLowerCase().split('.').pop();
  console.log(`[Text Extraction] Processing: ext="${ext}", mimeType="${mimeType}", bufferSize=${buffer?.length}`);

  if (mimeType === 'application/pdf' || ext === 'pdf') {
    let rawText = '';
    try {
      // Compatibility with pdf-parse v2.x (class PDFParse)
      const PDFParseClass = pdfParse?.PDFParse || pdfParse?.default?.PDFParse;
      if (typeof PDFParseClass === 'function') {
        console.log('[Text Extraction] Using pdf-parse v2 PDFParse class');
        const parser = new PDFParseClass({ data: buffer });
        const res = await parser.getText();
        if (res && typeof res.text === 'string') {
          rawText = res.text.replace(/-- \d+ of \d+ --/g, '');
        } else if (res && Array.isArray(res.pages)) {
          rawText = res.pages.map(p => p.text).join('\n');
        }
      } else if (typeof pdfParse === 'function') {
        // Compatibility with pdf-parse v1.x (function)
        console.log('[Text Extraction] Using pdf-parse v1 function');
        const data = await pdfParse(buffer);
        rawText = data?.text || '';
      } else if (typeof pdfParse?.default === 'function') {
        console.log('[Text Extraction] Using pdf-parse v1 default function');
        const data = await pdfParse.default(buffer);
        rawText = data?.text || '';
      } else {
        throw new Error(`pdf-parse module exported unexpected shape: ${typeof pdfParse}`);
      }
    } catch (err) {
      console.error('❌ PDF parse execution error:', err.message);
      if (err.stack) console.error(err.stack);
      if (err.message && err.message.includes('No readable text')) {
        throw err;
      }
      throw new Error(`Failed to extract text from PDF document: ${err.message || 'Corrupt or unreadable PDF'}`);
    }

    const cleanedText = rawText ? rawText.trim() : '';
    console.log(`[Text Extraction] Extracted ${cleanedText.length} characters of text from PDF`);
    if (!cleanedText || cleanedText.length < 10) {
      throw new Error('No readable text found in the PDF. The document may be scanned or image-based. Please upload a text-based PDF or DOCX file.');
    }

    return cleanedText;
  }

  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword' ||
    ext === 'docx' ||
    ext === 'doc'
  ) {
    let rawText = '';
    try {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value || '';
    } catch (err) {
      console.error('❌ DOCX parse error:', err.message);
      throw new Error('Failed to extract text from Word document.');
    }

    const cleanedText = rawText ? rawText.trim() : '';
    if (!cleanedText || cleanedText.length < 10) {
      throw new Error('No readable text found in the Word document. Please ensure it contains readable text.');
    }

    return cleanedText;
  }

  if (mimeType === 'text/plain' || ext === 'txt') {
    const rawText = buffer.toString('utf-8').trim();
    if (!rawText || rawText.length < 10) {
      throw new Error('Uploaded text file is empty or contains insufficient text.');
    }
    return rawText;
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
};

/**
 * Parse raw extracted CV text into structured ResumeData JSON using Gemini AI or fallback
 */
const parseCvTextToResumeData = async (rawText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!rawText || rawText.trim().length < 10) {
    throw new Error('Uploaded document contains insufficient text for parsing.');
  }

  const systemInstruction = `You are an expert Resume Parser and Information Extraction Engine.
Extract candidate resume details from the provided raw CV text into the exact requested JSON format.

CRITICAL RULES:
1. Do NOT invent or hallucinate information that is not present in the raw text.
2. If a field or section (e.g. portfolio, linkedin, certifications, projects, location) is missing in the CV, return empty strings ("") or empty arrays ([]).
3. Do NOT invent fake or placeholder values (such as "John Doe", "Software Engineer @ Company", "Bachelor of Science"). If information is missing, leave it as empty string or empty array.
4. Clean up formatting, typos, and bullet points.`;

  const prompt = `Raw CV Document Text:
"""
${rawText}
"""

Extract and return a JSON object matching this schema:
{
  "personalInfo": {
    "fullName": "Candidate full name",
    "email": "Candidate email address",
    "phone": "Candidate phone number",
    "location": "Candidate city, state or country",
    "linkedin": "LinkedIn profile link or handle",
    "portfolio": "Portfolio or website URL"
  },
  "summary": "Professional summary paragraph",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "startDate": "Start Date",
      "endDate": "End Date or Present",
      "description": "Key achievements and responsibilities"
    }
  ],
  "education": [
    {
      "degree": "Degree or Qualification",
      "institution": "University, College, or School",
      "startYear": "Start Year",
      "endYear": "End Year"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "techStack": "Technologies used",
      "description": "Project details"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Issue Date"
    }
  ]
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
              personalInfo: {
                type: Type.OBJECT,
                properties: {
                  fullName: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  location: { type: Type.STRING },
                  linkedin: { type: Type.STRING },
                  portfolio: { type: Type.STRING }
                },
                required: ['fullName', 'email', 'phone', 'location', 'linkedin', 'portfolio']
              },
              summary: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    company: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['title', 'company', 'startDate', 'endDate', 'description']
                }
              },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    degree: { type: Type.STRING },
                    institution: { type: Type.STRING },
                    startYear: { type: Type.STRING },
                    endYear: { type: Type.STRING }
                  },
                  required: ['degree', 'institution', 'startYear', 'endYear']
                }
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    techStack: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['name', 'techStack', 'description']
                }
              },
              certifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    issuer: { type: Type.STRING },
                    date: { type: Type.STRING }
                  },
                  required: ['name', 'issuer', 'date']
                }
              }
            },
            required: ['personalInfo', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications']
          }
        }
      });

      const parsed = JSON.parse(response.text);
      return sanitizeParsedResume(parsed);
    } catch (err) {
      console.warn('⚠️ Gemini CV parser call failed. Falling back to heuristic text parser:', err.message);
    }
  }

  return fallbackCvParser(rawText);
};

/**
 * Sanitize and normalize parsed resume object
 */
function sanitizeParsedResume(data) {
  const baseTimestamp = Date.now();

  const sanitizeExperience = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => ({
      id: item.id || (baseTimestamp + index),
      title: item.title || item.jobTitle || '',
      company: item.company || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      description: item.description || ''
    }));
  };

  const sanitizeEducation = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => ({
      id: item.id || (baseTimestamp + 100 + index),
      degree: item.degree || '',
      institution: item.institution || item.college || '',
      startYear: item.startYear || '',
      endYear: item.endYear || ''
    }));
  };

  const sanitizeProjects = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => ({
      id: item.id || (baseTimestamp + 200 + index),
      name: item.name || '',
      techStack: item.techStack || item.technologies || '',
      description: item.description || ''
    }));
  };

  const sanitizeCertifications = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => {
      if (typeof item === 'string') {
        return {
          id: baseTimestamp + 300 + index,
          name: item,
          issuer: '',
          date: ''
        };
      }
      return {
        id: item.id || (baseTimestamp + 300 + index),
        name: item.name || '',
        issuer: item.issuer || '',
        date: item.date || ''
      };
    });
  };

  return {
    personalInfo: {
      fullName: data.personalInfo?.fullName || '',
      email: data.personalInfo?.email || '',
      phone: data.personalInfo?.phone || '',
      location: data.personalInfo?.location || '',
      linkedin: data.personalInfo?.linkedin || '',
      portfolio: data.personalInfo?.portfolio || ''
    },
    summary: data.summary || '',
    skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : [],
    experience: sanitizeExperience(data.experience),
    education: sanitizeEducation(data.education),
    projects: sanitizeProjects(data.projects),
    certifications: sanitizeCertifications(data.certifications)
  };
}

/**
 * Strict heuristic parser fallback when Gemini is offline (never invents fake data)
 */
function fallbackCvParser(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const email = emailMatch ? emailMatch[1] : '';

  // Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn
  const linkedinMatch = text.match(/((?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[1] : '';

  // Extract Portfolio (GitHub or personal site, excluding linkedin and emails)
  let portfolio = '';
  const githubMatch = text.match(/((?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+)/i);
  if (githubMatch) {
    portfolio = githubMatch[1];
  } else {
    const urlMatches = text.match(/https?:\/\/[^\s<>"'\(\)]+/gi) || [];
    const siteUrl = urlMatches.find(u => !u.toLowerCase().includes('linkedin.com') && !u.toLowerCase().includes('github.com'));
    if (siteUrl) portfolio = siteUrl;
  }

  // Extract Location (e.g. San Francisco, CA or London, UK)
  let location = '';
  const locMatch = text.match(/([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))/);
  if (locMatch && !locMatch[1].toLowerCase().includes('university') && !locMatch[1].toLowerCase().includes('college')) {
    location = locMatch[1].trim();
  }

  // Extract Full Name (first line if short, non-technical, not containing URLs or contact keywords)
  let fullName = '';
  if (lines.length > 0 && lines[0].length < 40 && !lines[0].includes('@') && !lines[0].includes('http') && !lines[0].toLowerCase().includes('resume') && !lines[0].toLowerCase().includes('curriculum')) {
    fullName = lines[0];
  }

  // Extract Skills
  const knownTech = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Python', 'Java', 'C++', 'C#',
    'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS', 'Tailwind CSS',
    'Git', 'REST API', 'GraphQL', 'Redux', 'Vue.js', 'Angular'
  ];
  const lowerText = text.toLowerCase();
  const extractedSkills = knownTech.filter(tech => lowerText.includes(tech.toLowerCase()));

  // Summary (first line > 40 chars not containing email, URL, phone, or section header)
  const summaryLine = lines.find(l => 
    l.length > 40 && 
    !l.includes('@') && 
    !l.includes('http') && 
    !l.match(/\+?\d{10}/) &&
    !l.toLowerCase().startsWith('skills:') &&
    !l.toLowerCase().startsWith('work experience:') &&
    !l.toLowerCase().startsWith('education:')
  ) || '';

  // Extract sections if explicitly present
  const experience = [];
  const expLine = lines.find(l => l.toLowerCase().includes('work experience:') || l.toLowerCase().includes('experience:'));
  if (expLine) {
    experience.push({
      id: Date.now(),
      title: expLine.replace(/work experience:\s*/i, '').replace(/experience:\s*/i, '').trim(),
      company: '',
      startDate: '',
      endDate: '',
      description: expLine
    });
  }

  const education = [];
  const eduLine = lines.find(l => l.toLowerCase().includes('education:'));
  if (eduLine) {
    education.push({
      id: Date.now() + 1,
      degree: eduLine.replace(/education:\s*/i, '').trim(),
      institution: '',
      startYear: '',
      endYear: ''
    });
  }

  const projects = [];
  const projLine = lines.find(l => l.toLowerCase().includes('projects:'));
  if (projLine) {
    projects.push({
      id: Date.now() + 2,
      name: projLine.replace(/projects:\s*/i, '').trim(),
      techStack: '',
      description: projLine
    });
  }

  const certifications = [];
  const certLine = lines.find(l => l.toLowerCase().includes('certifications:') || l.toLowerCase().includes('certification:'));
  if (certLine) {
    certifications.push({
      id: Date.now() + 3,
      name: certLine.replace(/certifications:\s*/i, '').replace(/certification:\s*/i, '').trim(),
      issuer: '',
      date: ''
    });
  }

  return sanitizeParsedResume({
    personalInfo: {
      fullName,
      email,
      phone,
      location,
      linkedin,
      portfolio
    },
    summary: summaryLine,
    skills: extractedSkills,
    experience,
    education,
    projects,
    certifications
  });
}

module.exports = {
  extractTextFromBuffer,
  parseCvTextToResumeData
};

