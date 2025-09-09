import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section - Interest (Holland Codes)
  {
    id: 'psy_01',
    section: 'psychometric',
    subsection: 'interest',
    type: 'likert',
    question: 'You enjoy working with physical equipment and machinery more than abstract concepts.',
    weight: 1,
    category: 'realistic'
  },
  {
    id: 'psy_02',
    section: 'psychometric',
    subsection: 'interest',
    type: 'likert',
    question: 'You find satisfaction in troubleshooting and fixing complex technical problems.',
    weight: 1,
    category: 'investigative'
  },
  {
    id: 'psy_03',
    section: 'psychometric',
    subsection: 'interest',
    type: 'likert',
    question: 'You prefer structured, logical approaches to solving problems.',
    weight: 1,
    category: 'conventional'
  },
  {
    id: 'psy_04',
    section: 'psychometric',
    subsection: 'interest',
    type: 'likert',
    question: 'You are curious about how different industrial systems work together.',
    weight: 1,
    category: 'investigative'
  },

  // Psychometric Section - Personality Fit
  {
    id: 'psy_05',
    section: 'psychometric',
    subsection: 'personality',
    type: 'scenario',
    question: 'A sensor on the production line starts giving inconsistent readings. How would you approach this?',
    options: [
      'Immediately replace the sensor with a new one',
      'Systematically check calibration, wiring, and environmental factors',
      'Ask a colleague to handle it while you focus on other tasks',
      'Document the issue and wait for maintenance to fix it'
    ],
    weight: 2,
    category: 'conscientiousness'
  },
  {
    id: 'psy_06',
    section: 'psychometric',
    subsection: 'personality',
    type: 'likert',
    question: 'You feel comfortable working in industrial environments with noise and machinery.',
    weight: 1,
    category: 'stress_tolerance'
  },

  // Technical Section - Prerequisite Knowledge
  {
    id: 'tech_01',
    section: 'technical',
    subsection: 'prerequisites',
    type: 'multiple-choice',
    question: 'What does SCADA stand for?',
    options: [
      'System Control and Data Acquisition',
      'Supervisory Control and Data Acquisition', 
      'Sensor Control and Data Analysis',
      'System Configuration and Device Access'
    ],
    weight: 1,
    category: 'domain_knowledge'
  },
  {
    id: 'tech_02',
    section: 'technical',
    subsection: 'prerequisites',
    type: 'multiple-choice',
    question: 'Which protocol is commonly used for industrial communication?',
    options: [
      'HTTP',
      'FTP',
      'Modbus',
      'SMTP'
    ],
    weight: 1,
    category: 'protocols'
  },
  {
    id: 'tech_03',
    section: 'technical',
    subsection: 'prerequisites',
    type: 'multiple-choice',
    question: 'What is the primary purpose of a PLC?',
    options: [
      'Process data analytics',
      'Control industrial processes automatically',
      'Manage network security',
      'Store historical data'
    ],
    weight: 1,
    category: 'automation'
  },
  {
    id: 'tech_04',
    section: 'technical',
    subsection: 'networking',
    type: 'multiple-choice',
    question: 'Which of these is a key difference between OPC-UA and MQTT?',
    options: [
      'OPC-UA is faster than MQTT',
      'MQTT is only for web applications',
      'OPC-UA provides rich semantic modeling, MQTT is lightweight messaging',
      'They serve identical purposes'
    ],
    weight: 2,
    category: 'protocols'
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_01',
    section: 'wiscar',
    subsection: 'will',
    type: 'likert',
    question: 'When facing a complex technical challenge, you persist until you find a solution.',
    weight: 2,
    category: 'grit'
  },
  {
    id: 'wiscar_02',
    section: 'wiscar',
    subsection: 'interest',
    type: 'likert',
    question: 'You genuinely enjoy learning about industrial automation and IoT technologies.',
    weight: 2,
    category: 'intrinsic_motivation'
  },
  {
    id: 'wiscar_03',
    section: 'wiscar',
    subsection: 'skill',
    type: 'likert',
    question: 'You have experience with programming languages like Python, C, or ladder logic.',
    weight: 1,
    category: 'programming'
  },
  {
    id: 'wiscar_04',
    section: 'wiscar',
    subsection: 'cognitive',
    type: 'scenario',
    question: 'You need to integrate data from 5 different machines into a central dashboard. What\'s your first step?',
    options: [
      'Start coding the dashboard interface immediately',
      'Map out data sources, formats, and communication protocols',
      'Buy new software to handle the integration',
      'Ask each machine vendor for their standard solution'
    ],
    weight: 2,
    category: 'systems_thinking'
  },
  {
    id: 'wiscar_05',
    section: 'wiscar',
    subsection: 'ability',
    type: 'likert',
    question: 'You enjoy learning new technologies and adapting to changing industry standards.',
    weight: 1,
    category: 'growth_mindset'
  },
  {
    id: 'wiscar_06',
    section: 'wiscar',
    subsection: 'real_world',
    type: 'likert',
    question: 'Working in a role that bridges IT and operational technology excites you.',
    weight: 2,
    category: 'job_fit'
  }
];

export const getQuestionsBySection = (section: string) => {
  return assessmentQuestions.filter(q => q.section === section);
};

export const getTotalQuestionCount = () => assessmentQuestions.length;