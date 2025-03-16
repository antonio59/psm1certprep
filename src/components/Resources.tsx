import React from 'react';
import { Book, Link as LinkIcon, FileText, Youtube } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      category: 'Official Documentation',
      items: [
        {
          title: 'Scrum Guide',
          description: 'The official Scrum Guide by Ken Schwaber and Jeff Sutherland',
          link: 'https://scrumguides.org/scrum-guide.html',
          icon: Book,
        },
        {
          title: 'PSM I Assessment',
          description: 'Official information about the PSM I certification',
          link: 'https://www.scrum.org/assessments/professional-scrum-master-i-certification',
          icon: FileText,
        },
      ],
    },
    {
      category: 'Study Materials',
      items: [
        {
          title: 'Scrum.org Learning Path',
          description: 'Structured learning path for PSM I certification',
          link: 'https://www.scrum.org/pathway/scrum-master',
          icon: Book,
        },
        {
          title: 'Scrum Master Learning Path',
          description: 'Comprehensive video course on Scrum Master role',
          link: 'https://www.scrum.org/resources/suggested-reading-professional-scrum-master',
          icon: Youtube,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Resources</h1>
        <p className="text-gray-600">
          Curated resources to help you prepare for the PSM I certification.
        </p>
      </div>

      <div className="space-y-8">
        {resources.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {category.category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          {item.title}
                          <LinkIcon className="h-4 w-4 ml-2 text-gray-400" />
                        </h3>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounde

d-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">
          Study Tips
        </h2>
        <ul className="space-y-3 text-indigo-800">
          <li>• Read the Scrum Guide multiple times - it's the primary source for the exam</li>
          <li>• Practice with mock exams to get comfortable with the question format</li>
          <li>• Focus on understanding the principles behind Scrum, not just memorizing facts</li>
          <li>• Use flashcards for active recall of key concepts</li>
          <li>• Take breaks between study sessions to maintain focus and retention</li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;