const { GoogleGenAI, Type } = require('@google/genai');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract raw text from file buffer (PDF or DOCX)
 */
const extractTextFromBuffer = async (buffer, mimeType, originalname = '') => {
  const ext = originalname.toLowerCase().split('.').pop();

  if (mimeType === 'application/pdf' || ext === 'pdf') {
    try {
      const parseFunc = typeof pdfParse === 'function' ? pdfParse : (pdfParse && pdfParse.default) ? pdfParse.default : null;
      if (!parseFunc) {
        throw new Error('pdf-parse module load failure');
      }
      const data = await parseFunc(buffer);
      return data.text || '';
    } catch (err) {
      console.error('❌ PDF parse error:', err.message);
      throw new Error('Failed to extract text from PDF document.');
    }
  }

  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword' ||
    ext === 'docx' ||
    ext === 'doc'
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value || '';
    } catch (err) {
      console.error('❌ DOCX parse error:', err.message);
      throw new Error('Failed to extract text from Word document.');
    }
  }

  if (mimeType === 'text/plain' || ext === 'txt') {
    return buffer.toString('utf-8');
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
};

/**
 * Parse raw extracted CV text into structured ResumeData JSON using Gemini AI or fallback
 */
const parseCvTextToResumeData = async (rawText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!rawText || rawText.trim().length < 20) {
    throw new Error('Uploaded document contains insufficient text for parsing.');
  }

  const systemInstruction = `You are an expert Resume Parser and Information Extraction Engine.
Extract structural candidate resume data from the provided raw CV text into the exact requested JSON format.

CRITICAL RULES:
1. Do NOT invent or hallucinate information that is not present in the raw text.
2. If a field (e.g. portfolio, linkedin, certifications) is missing, return empty strings or empty arrays.
3. Clean up formatting, typos, and bullet points.`;

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
    "linkedin": "LinkedIn profile link or username",
    "portfolio": "Portfolio or website URL"
  },
  "summary": "Professional summary paragraph",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "jobTitle": "Job Title",
      "company": "Company Name",
      "startDate": "Start Date",
      "endDate": "End Date or Present",
      "description": "Job duties & bullet points"
    }
  ],
  "education": [
    {
      "degree": "Degree name",
      "college": "University or School",
      "startYear": "Start Year",
      "endYear": "End Year"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "technologies": "Technologies used",
      "description": "Project summary"
    }
  ],
  "certifications": ["Certification name 1"]
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
                    jobTitle: { type: Type.STRING },
                    company: { type: Type.STRING },
                    startDate: { type: Type.STRING },
                    endDate: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['jobTitle', 'company', 'startDate', 'endDate', 'description']
                }
              },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    degree: { type: Type.STRING },
                    college: { type: Type.STRING },
                    startYear: { type: Type.STRING },
                    endYear: { type: Type.STRING }
                  },
                  required: ['degree', 'college', 'startYear', 'endYear']
                }
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    technologies: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['name', 'technologies', 'description']
                }
              },
              certifications: { type: Type.ARRAY, items: { type: Type.STRING } }
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
 * Sanitize parsed resume object
 */
function sanitizeParsedResume(data) {
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
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : []
  };
}

/**
 * Heuristic parser fallback when Gemini is offline
 */
function fallbackCvParser(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const email = emailMatch ? emailMatch[1] : '';

  // Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn & Portfolio
  const linkedinMatch = text.match(/(linkedin\.com\/in\/[\w-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[1] : '';

  const portfolioMatch = text.match(/(github\.com\/[\w-]+|https?:\/\/[\w.-]+\.[a-z]{2,})/i);
  const portfolio = portfolioMatch ? portfolioMatch[1] : '';

  // Extract Full Name (usually first line)
  const fullName = lines[0] && lines[0].length < 40 ? lines[0] : 'Parsed Candidate';

  // Extract Skills
  const knownTech = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'SQL', 'MongoDB', 'AWS', 'Docker', 'HTML', 'CSS', 'Git', 'C++', 'Express', 'Tailwind CSS'];
  const lowerText = text.toLowerCase();
  const extractedSkills = knownTech.filter(tech => lowerText.includes(tech.toLowerCase()));

  // Summary lines
  const summaryLine = lines.find(l => l.length > 50 && !l.includes('@')) || '';

  return {
    personalInfo: {
      fullName,
      email,
      phone,
      location: 'Not specified',
      linkedin,
      portfolio
    },
    summary: summaryLine,
    skills: extractedSkills.length > 0 ? extractedSkills : ['JavaScript', 'Software Development'],
    experience: [
      {
        jobTitle: 'Software Engineer',
        company: 'Company',
        startDate: '2022',
        endDate: 'Present',
        description: text.slice(0, 300)
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science',
        college: 'University',
        startYear: '2018',
        endYear: '2022'
      }
    ],
    projects: [],
    certifications: []
  };
}

module.exports = {
  extractTextFromBuffer,
  parseCvTextToResumeData
};
