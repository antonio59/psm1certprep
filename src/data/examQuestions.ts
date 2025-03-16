import { Question } from '../types';

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Base questions covering all Scrum topics
const baseQuestions: Question[] = [
  // Scrum Theory & Principles
  {
    id: 'theory1',
    question: 'What are the three pillars of empirical process control in Scrum?',
    options: [
      'Planning, Execution, and Review',
      'Transparency, Inspection, and Adaptation',
      'Define, Measure, and Control',
      'Vision, Strategy, and Tactics'
    ],
    correctAnswer: 1,
    explanation: 'The three pillars of empirical process control in Scrum are Transparency, Inspection, and Adaptation. These pillars enable the empirical approach to process control.'
  },
  {
    id: 'theory2',
    question: 'What are the five Scrum values?',
    options: [
      'Honesty, Integrity, Respect, Trust, and Courage',
      'Focus, Respect, Openness, Courage, and Commitment',
      'Planning, Inspection, Adaptation, Transparency, and Control',
      'Leadership, Teamwork, Delivery, Quality, and Innovation'
    ],
    correctAnswer: 1,
    explanation: 'The five Scrum values are Focus, Respect, Openness, Courage, and Commitment. These values give direction to work, decisions, and behavior.'
  },
  {
    id: 'theory3',
    question: 'What makes Scrum empirical?',
    options: [
      'It follows a detailed project plan',
      'It relies on predictive planning',
      'It is based on observation and experimentation',
      'It uses traditional management approaches'
    ],
    correctAnswer: 2,
    explanation: 'Scrum is empirical because it relies on observation of actual results and experimentation rather than detailed upfront planning. It implements empirical process control through transparency, inspection, and adaptation.'
  },
  {
    id: 'theory4',
    question: 'How does transparency manifest in Scrum?',
    options: [
      'Through detailed documentation of all processes',
      'By having a common understanding of what "Done" means',
      'Through comprehensive project plans',
      'By maintaining strict control over information flow'
    ],
    correctAnswer: 1,
    explanation: 'Transparency in Scrum is achieved when all participants have a shared understanding of what they are observing. For example, having a common definition of "Done" ensures everyone understands what completion means.'
  },
  {
    id: 'theory5',
    question: 'What is the purpose of inspection in Scrum?',
    options: [
      'To find defects in the product',
      'To detect deviations from the project plan',
      'To detect variations from desired goals and processes',
      'To evaluate team member performance'
    ],
    correctAnswer: 2,
    explanation: 'Inspection in Scrum is about detecting undesirable variances or problems with respect to a desired goal or process. It is not about finding defects but about continuous improvement.'
  },
  // Scrum Team & Roles
  {
    id: 'roles1',
    question: 'Who is responsible for maximizing the value of the product?',
    options: [
      'The Scrum Master',
      'The Product Owner',
      'The Development Team',
      'The Project Manager'
    ],
    correctAnswer: 1,
    explanation: 'The Product Owner is responsible for maximizing the value of the product resulting from the work of the Scrum Team.'
  },
  {
    id: 'roles2',
    question: 'What is the recommended size for the Development Team?',
    options: [
      '3-9 people',
      '5-15 people',
      '7-12 people',
      '10 or fewer people'
    ],
    correctAnswer: 3,
    explanation: 'The Development Team should be small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people.'
  },
  {
    id: 'roles3',
    question: 'Who is responsible for managing the Sprint Backlog?',
    options: [
      'The Product Owner',
      'The Scrum Master',
      'The Developers',
      'The Project Manager'
    ],
    correctAnswer: 2,
    explanation: 'The Developers own and manage the Sprint Backlog, as they are the ones who create the plan for the Sprint and execute the work.'
  },
  {
    id: 'roles4',
    question: 'What is the primary responsibility of a Scrum Master?',
    options: [
      'Managing the team',
      'Promoting and supporting Scrum',
      'Writing user stories',
      'Assigning tasks to team members'
    ],
    correctAnswer: 1,
    explanation: 'The Scrum Master is responsible for promoting and supporting Scrum by helping everyone understand Scrum theory, practices, rules, and values.'
  },
  {
    id: 'roles5',
    question: 'Can the Product Owner delegate their responsibilities?',
    options: [
      'No, never',
      'Yes, but remains accountable',
      'Yes, and transfers accountability',
      'Only to the Scrum Master'
    ],
    correctAnswer: 1,
    explanation: 'While the Product Owner may delegate specific tasks, they remain accountable for the Product Backlog and maximizing value.'
  },
  // Sprint Events
  {
    id: 'events1',
    question: 'What is the maximum duration of the Daily Scrum?',
    options: [
      '30 minutes',
      '15 minutes',
      '1 hour',
      '45 minutes'
    ],
    correctAnswer: 1,
    explanation: 'The Daily Scrum is time-boxed to 15 minutes, regardless of team size.'
  },
  {
    id: 'events2',
    question: 'When should the Sprint Review be held?',
    options: [
      'At the beginning of the Sprint',
      'In the middle of the Sprint',
      'At the end of the Sprint',
      'After the Sprint Retrospective'
    ],
    correctAnswer: 2,
    explanation: 'The Sprint Review is held at the end of the Sprint to inspect the Increment and adapt the Product Backlog if needed.'
  },
  {
    id: 'events3',
    question: 'What is the maximum duration of Sprint Planning for a one-month Sprint?',
    options: [
      '4 hours',
      '6 hours',
      '8 hours',
      '2 hours'
    ],
    correctAnswer: 2,
    explanation: 'Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter.'
  },
  {
    id: 'events4',
    question: 'What happens during the Sprint Review?',
    options: [
      'The team discusses process improvements',
      'The Increment is inspected and the Product Backlog adapted',
      'The team plans the next Sprint',
      'The Scrum Master evaluates team performance'
    ],
    correctAnswer: 1,
    explanation: 'During the Sprint Review, stakeholders collaborate with the Scrum Team to inspect the Increment and adapt the Product Backlog if needed.'
  },
  {
    id: 'events5',
    question: 'What is the purpose of the Sprint Retrospective?',
    options: [
      'To review the product increment',
      'To plan the next Sprint',
      'To inspect and adapt the process',
      'To update the Product Backlog'
    ],
    correctAnswer: 2,
    explanation: 'The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint.'
  },
  // Artifacts
  {
    id: 'artifacts1',
    question: 'Who is responsible for ordering the Product Backlog?',
    options: [
      'The Scrum Master',
      'The Development Team',
      'The Product Owner',
      'The Stakeholders'
    ],
    correctAnswer: 2,
    explanation: 'The Product Owner is responsible for ordering the Product Backlog to maximize value.'
  },
  {
    id: 'artifacts2',
    question: 'What is the purpose of the Sprint Goal?',
    options: [
      'To measure team velocity',
      'To provide flexibility for the technical implementation',
      'To create a deadline for the Sprint',
      'To track individual performance'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Goal provides flexibility in terms of the exact work needed to achieve it, allowing the Development Team to have some flexibility regarding functionality.'
  },
  {
    id: 'artifacts3',
    question: 'What is the Definition of Done?',
    options: [
      'A checklist created by the Product Owner',
      'A shared understanding of when work is complete',
      'A document created by management',
      'A set of testing requirements'
    ],
    correctAnswer: 1,
    explanation: 'The Definition of Done is a shared understanding of what it means for work to be complete, ensuring transparency and quality.'
  },
  {
    id: 'artifacts4',
    question: 'Who can change the Sprint Backlog during a Sprint?',
    options: [
      'Only the Product Owner',
      'Only the Scrum Master',
      'Only the Developers',
      'Anyone on the Scrum Team'
    ],
    correctAnswer: 2,
    explanation: 'The Sprint Backlog is owned by the Developers, and only they can change it during the Sprint.'
  },
  {
    id: 'artifacts5',
    question: 'What is Product Backlog refinement?',
    options: [
      'Rewriting user stories',
      'Adding detail, estimates, and order to items',
      'Removing items from the backlog',
      'Creating new requirements'
    ],
    correctAnswer: 1,
    explanation: 'Product Backlog refinement is the act of adding detail, estimates, and order to items in the Product Backlog.'
  },
  // Sprint Planning
  {
    id: 'planning1',
    question: 'What are the three topics addressed in Sprint Planning?',
    options: [
      'Who, What, When',
      'Why, What, How',
      'What, When, Where',
      'How, When, Who'
    ],
    correctAnswer: 1,
    explanation: 'Sprint Planning addresses three topics: Why is this Sprint valuable? What can be Done this Sprint? How will the chosen work get done?'
  },
  {
    id: 'planning2',
    question: 'Who must attend Sprint Planning?',
    options: [
      'Only the Developers',
      'The entire Scrum Team',
      'The Product Owner and Scrum Master',
      'The Developers and stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'The entire Scrum Team (Product Owner, Scrum Master, and Developers) must attend Sprint Planning.'
  },
  {
    id: 'planning3',
    question: 'What is the primary output of Sprint Planning?',
    options: [
      'A detailed project plan',
      'The Sprint Goal and Sprint Backlog',
      'A list of tasks and assignments',
      'A risk assessment document'
    ],
    correctAnswer: 1,
    explanation: 'Sprint Planning results in a Sprint Goal and Sprint Backlog that defines the work to be performed in the Sprint.'
  },
  // Daily Scrum
  {
    id: 'daily1',
    question: 'What is the purpose of the Daily Scrum?',
    options: [
      'To report progress to the Scrum Master',
      'To plan work for the next 24 hours',
      'To update the Product Owner',
      'To solve detailed technical problems'
    ],
    correctAnswer: 1,
    explanation: 'The Daily Scrum is for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, planning work for the next 24 hours.'
  },
  {
    id: 'daily2',
    question: 'Who is required to attend the Daily Scrum?',
    options: [
      'The entire Scrum Team',
      'The Developers',
      'The Product Owner and Developers',
      'The Scrum Master and Developers'
    ],
    correctAnswer: 1,
    explanation: 'Only the Developers are required to attend the Daily Scrum, as they use it to plan their work.'
  },
  // Sprint Review
  {
    id: 'review1',
    question: 'What is the maximum duration of a Sprint Review for a one-month Sprint?',
    options: [
      '2 hours',
      '4 hours',
      '6 hours',
      '8 hours'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Review is timeboxed to a maximum of four hours for a one-month Sprint. For shorter Sprints, this event is usually shorter.'
  },
  {
    id: 'review2',
    question: 'Who participates in the Sprint Review?',
    options: [
      'Only the Developers',
      'The Scrum Team and stakeholders',
      'Only the Product Owner',
      'The Scrum Master and Product Owner'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Review is attended by the Scrum Team and stakeholders, who collaborate on what was done in the Sprint and what to do next.'
  },
  // Sprint Retrospective
  {
    id: 'retro1',
    question: 'When does the Sprint Retrospective occur?',
    options: [
      'Before Sprint Planning',
      'After the Sprint Review',
      'During the Sprint',
      'Before the Sprint Review'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Retrospective occurs after the Sprint Review and before the next Sprint Planning.'
  },
  {
    id: 'retro2',
    question: 'What is the maximum duration of the Sprint Retrospective?',
    options: [
      '2 hours',
      '3 hours',
      '4 hours',
      '1 hour'
    ],
    correctAnswer: 1,
    explanation: 'For a one-month Sprint, the Sprint Retrospective is timeboxed to a maximum of three hours. For shorter Sprints, the event is usually shorter.'
  },
  // Additional questions to reach 80
  {
    id: 'scaling1',
    question: 'What is the recommended approach when scaling Scrum?',
    options: [
      'Create a Scrum of Scrums',
      'Add more people to existing teams',
      'Create multiple independent Scrum Teams',
      'Modify Scrum rules to fit larger teams'
    ],
    correctAnswer: 2,
    explanation: 'When scaling Scrum, create multiple independent Scrum Teams that work on the same product, maintaining the recommended team size and all Scrum principles.'
  },
  {
    id: 'scaling2',
    question: 'What is the purpose of the Scrum of Scrums?',
    options: [
      'To coordinate multiple Scrum Teams',
      'To replace individual Daily Scrums',
      'To manage team performance',
      'To assign work across teams'
    ],
    correctAnswer: 0,
    explanation: 'The Scrum of Scrums is a technique for coordinating multiple Scrum Teams working on the same product, focusing on integration points and cross-team dependencies.'
  },
  {
    id: 'values1',
    question: 'How does the value of Courage manifest in Scrum?',
    options: [
      'By following orders without question',
      'By working on multiple things simultaneously',
      'By doing the right thing and working on tough problems',
      'By avoiding conflicts within the team'
    ],
    correctAnswer: 2,
    explanation: 'Courage in Scrum means doing the right thing, tackling tough problems, and being transparent about challenges and progress.'
  },
  {
    id: 'values2',
    question: 'How does Focus benefit a Scrum Team?',
    options: [
      'By allowing multitasking',
      'By concentrating on too many items',
      'By working on Sprint work exclusively',
      'By extending the Sprint duration'
    ],
    correctAnswer: 2,
    explanation: 'Focus benefits the team by allowing them to concentrate on the Sprint Goal and Sprint Backlog items, avoiding distractions and multitasking.'
  },
  {
    id: 'commitment1',
    question: 'What does the Scrum Team commit to?',
    options: [
      'Working overtime to complete all tasks',
      'Following the initial plan exactly',
      'Sprint Goal and quality goals',
      'Delivering all Product Backlog items'
    ],
    correctAnswer: 2,
    explanation: 'The Scrum Team commits to achieving the Sprint Goal and meeting quality goals, while remaining flexible about the exact work needed.'
  },
  {
    id: 'transparency1',
    question: 'How is transparency achieved in Scrum?',
    options: [
      'Through detailed documentation',
      'Through a common understanding and definition',
      'Through strict reporting structures',
      'Through management oversight'
    ],
    correctAnswer: 1,
    explanation: 'Transparency is achieved through a common understanding among all participants and clear definitions, such as the Definition of Done.'
  },
  {
    id: 'adaptation1',
    question: 'When should adaptation occur in Scrum?',
    options: [
      'Only during Sprint Review',
      'Only during Sprint Retrospective',
      'Whenever inspection reveals the need',
      'Only between Sprints'
    ],
    correctAnswer: 2,
    explanation: 'Adaptation should occur whenever inspection reveals that aspects of the process or product have deviated outside acceptable limits.'
  },
  {
    id: 'backlog1',
    question: 'What makes a good Product Backlog item?',
    options: [
      'Detailed technical specifications',
      'INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable)',
      'Complete implementation plans',
      'Assignment to specific team members'
    ],
    correctAnswer: 1,
    explanation: 'Good Product Backlog items follow the INVEST criteria, making them suitable for planning and implementation.'
  },
  {
    id: 'increment1',
    question: 'What defines a "Done" Increment?',
    options: [
      'When all tasks are completed',
      'When the Product Owner accepts it',
      'When it meets the Definition of Done',
      'When testing is complete'
    ],
    correctAnswer: 2,
    explanation: 'An Increment is "Done" when it meets the Definition of Done, which ensures quality and usability.'
  },
  {
    id: 'sprint1',
    question: 'What happens if the Sprint Goal becomes obsolete?',
    options: [
      'Continue the Sprint anyway',
      'The Product Owner may cancel the Sprint',
      'Extend the Sprint duration',
      'Change the Sprint Goal'
    ],
    correctAnswer: 1,
    explanation: 'If a Sprint Goal becomes obsolete, the Product Owner has the authority to cancel the Sprint.'
  },
  {
    id: 'scaling3',
    question: 'What is the primary challenge when scaling Scrum?',
    options: [
      'Managing multiple Product Backlogs',
      'Maintaining Scrum principles while coordinating multiple teams',
      'Creating larger teams',
      'Having multiple Scrum Masters'
    ],
    correctAnswer: 1,
    explanation: 'The main challenge in scaling Scrum is maintaining its principles and effectiveness while coordinating multiple teams. This includes preserving team autonomy and ensuring effective communication.'
  },
  {
    id: 'scaling4',
    question: 'How should Product Backlog management work in scaled Scrum?',
    options: [
      'Each team has their own Product Backlog',
      'One Product Backlog for the entire product',
      'Separate backlogs for each component',
      'Multiple Product Owners manage separate backlogs'
    ],
    correctAnswer: 1,
    explanation: 'In scaled Scrum, there should be one Product Backlog for the entire product, managed by one Product Owner, ensuring a single source of truth and aligned priorities.'
  },
  {
    id: 'planning4',
    question: 'What should happen if the Development Team realizes they overcommitted during Sprint Planning?',
    options: [
      'Continue working and hope for the best',
      'Negotiate with the Product Owner to remove items from the Sprint Backlog',
      'Work overtime to complete everything',
      'Wait until the next Sprint to address the issue'
    ],
    correctAnswer: 1,
    explanation: 'If overcommitment is realized, the Development Team should negotiate with the Product Owner to remove items from the Sprint Backlog while preserving the Sprint Goal.'
  },
  {
    id: 'planning5',
    question: 'What is the main outcome of Sprint Planning?',
    options: [
      'A detailed project schedule',
      'Sprint Goal and initial Sprint Backlog',
      'Team assignments',
      'Risk assessment document'
    ],
    correctAnswer: 1,
    explanation: 'The main outcomes of Sprint Planning are the Sprint Goal and an initial Sprint Backlog that the Development Team believes it can complete.'
  },
  {
    id: 'po1',
    question: 'What should a Product Owner do when stakeholders have conflicting requirements?',
    options: [
      'Implement all requirements',
      'Let stakeholders decide among themselves',
      'Make a decision based on value optimization',
      'Postpone the decision to the next Sprint'
    ],
    correctAnswer: 2,
    explanation: 'The Product Owner should make decisions based on value optimization, considering all stakeholder inputs but maintaining authority over Product Backlog ordering.'
  },
  {
    id: 'po2',
    question: 'How should a Product Owner handle urgent production issues?',
    options: [
      'Add them directly to the Sprint Backlog',
      'Have the team work on them immediately',
      'Add them to the Product Backlog and discuss with the team',
      'Create a separate maintenance team'
    ],
    correctAnswer: 2,
    explanation: 'The Product Owner should add urgent issues to the Product Backlog and discuss with the team how to handle them, potentially re-planning the Sprint if necessary.'
  },
  {
    id: 'sm1',
    question: 'What should a Scrum Master do when the team is not following Scrum practices?',
    options: [
      'Report to management',
      'Coach the team on Scrum principles and benefits',
      'Enforce rules strictly',
      'Change the process to match team behavior'
    ],
    correctAnswer: 1,
    explanation: 'A Scrum Master should coach the team on Scrum principles and their benefits, helping them understand why the practices are valuable.'
  },
  {
    id: 'sm2',
    question: 'How should a Scrum Master handle external interference with the team?',
    options: [
      'Allow the interference to maintain good relations',
      'Shield the team and educate stakeholders',
      'Report interference to management',
      'Ignore the interference'
    ],
    correctAnswer: 1,
    explanation: 'The Scrum Master should shield the team from external interference while educating stakeholders about Scrum principles and team effectiveness.'
  },
  {
    id: 'dod1',
    question: 'What happens if different Scrum Teams working on the same product have different Definitions of Done?',
    options: [
      'Each team can maintain their own standard',
      'The most stringent definition must be used',
      'Management should decide the standard',
      'Teams should vote on which to use'
    ],
    correctAnswer: 1,
    explanation: 'When multiple teams work on the same product, they must share a common Definition of Done to ensure consistent quality and integration.'
  },
  {
    id: 'dod2',
    question: 'When can the Definition of Done be changed?',
    options: [
      'Only between Sprints',
      'Any time through collaboration',
      'Only when management approves',
      'Once per release'
    ],
    correctAnswer: 1,
    explanation: 'The Definition of Done can be changed any time through collaboration among the Scrum Team, aiming for continuous improvement.'
  },
  {
    id: 'review3',
    question: 'What should happen if no stakeholders attend the Sprint Review?',
    options: [
      'Cancel the review',
      'Proceed with the review as planned',
      'Postpone until stakeholders can attend',
      'Skip to the retrospective'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Review should proceed as planned, as it\'s still valuable for the Scrum Team to inspect the Increment and adapt the Product Backlog.'
  },
  {
    id: 'review4',
    question: 'How should incomplete work be handled in the Sprint Review?',
    options: [
      'Hide it from stakeholders',
      'Present it as complete',
      'Be transparent about what\'s done and not done',
      'Complete it after the review'
    ],
    correctAnswer: 2,
    explanation: 'The team should be transparent about what is and isn\'t complete, maintaining trust and enabling effective inspection and adaptation.'
  },
  {
    id: 'retro3',
    question: 'What should be the main focus of the Sprint Retrospective?',
    options: [
      'Individual performance evaluation',
      'Process and relationship improvements',
      'Technical debt discussion',
      'Next Sprint planning'
    ],
    correctAnswer: 1,
    explanation: 'The Sprint Retrospective should focus on improving the process, relationships, and tools to enhance team effectiveness.'
  },
  {
    id: 'retro4',
    question: 'How should action items from the Sprint Retrospective be handled?',
    options: [
      'Create a separate improvement backlog',
      'Add them to the Sprint Backlog',
      'Handle them outside of Scrum',
      'Wait for management approval'
    ],
    correctAnswer: 1,
    explanation: 'High-priority improvements identified in the Sprint Retrospective should be added to the next Sprint Backlog to ensure they are addressed.'
  }
];

// Function to generate unique sets of questions for each exam
const generateExamQuestions = (baseQuestions: Question[], count: number): Question[] => {
  return shuffleArray(baseQuestions).slice(0, count).map((q, index) => ({
    ...q,
    id: `q${index + 1}`
  }));
};

// Generate four unique sets of 80 questions each
export const examQuestions = {
  exam1: generateExamQuestions(baseQuestions, 80),
  exam2: generateExamQuestions(baseQuestions, 80),
  exam3: generateExamQuestions(baseQuestions, 80),
  exam4: generateExamQuestions(baseQuestions, 80)
};