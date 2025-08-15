import { Megaphone, Eye, Crown, Award, Zap } from 'lucide-react';

export const standOutStrategies = [
  {
    id: 'unique_story',
    title: 'Craft Your 30-Second Story That Hits Different',
    icon: Megaphone,
    description: 'Not just "I study X" - tell them WHY you chose your path and what unique perspective you bring',
    example: '"I switched from finance to tech after building an app that helped my mom\'s small business during lockdown - that\'s when I realized code can create real impact."',
    action: 'Write and practice your unique story'
  },
  {
    id: 'research_deep',
    title: 'Stalk Their LinkedIn (Professionally)',
    icon: Eye,
    description: 'Find the actual people you\'ll talk to. Know their background, recent company wins, and industry challenges',
    example: '"I saw on LinkedIn that Sarah just led the launch of your new mobile feature - I\'d love to hear about the challenges you faced."',
    action: 'Research 3 specific people per target company'
  },
  {
    id: 'value_first',
    title: 'Lead With Value, Not Desperation',
    icon: Crown,
    description: 'Start conversations by offering insights or asking smart questions, not begging for jobs',
    example: '"I noticed your competitor just launched X feature. Have you considered how that impacts your user retention strategy?"',
    action: 'Prepare 2 industry insights per company'
  },
  {
    id: 'portfolio_power',
    title: 'Bring Receipts - Visual Proof of Your Skills',
    icon: Award,
    description: 'Physical portfolio, tablet with work samples, or QR code to your best projects',
    example: 'Show them your app, website, research project, or even a well-designed resume that makes them stop scrolling',
    action: 'Create a 60-second portfolio showcase'
  },
  {
    id: 'follow_up_game',
    title: 'Your Follow-Up Game Is Your Superpower',
    icon: Zap,
    description: 'Reference your specific conversation and add value in your follow-up email',
    example: '"Thanks for the chat about AI in fintech. Here\'s that article I mentioned about ML fraud detection."',
    action: 'Write follow-up templates for different scenarios'
  }
];

export const researchPlaybook = [
  {
    id: 'company_intel',
    title: 'Company Intelligence 101',
    items: [
      'Recent news, funding rounds, product launches (last 3 months)',
      'Company culture from Glassdoor + LinkedIn employee posts',
      'Their biggest competitors and market position',
      'Challenges in their industry right now',
      'Their tech stack (check job descriptions)'
    ]
  },
  {
    id: 'conversation_starters',
    title: 'Conversation Starters That Actually Work',
    items: [
      '"What\'s the most exciting project your team is working on right now?"',
      '"What skills are you finding hardest to hire for?"',
      '"How has [recent industry trend] impacted your business?"',
      '"What do you wish more graduates understood about this industry?"',
      '"What\'s your best advice for someone starting their career here?"'
    ]
  }
];

export const networkingScripts = [
  {
    id: 'opener',
    title: 'The Perfect Opener',
    script: '"Hi! I\'m [Name], studying [Degree] at [University]. I\'ve been following [Company] because [specific reason]. Could I ask you about [specific topic]?"',
    why: 'Personal, specific, and shows you\'ve done your homework'
  },
  {
    id: 'transition',
    title: 'Smooth Transition to Your Story',
    script: '"That\'s fascinating! It actually relates to something I\'ve been working on. [Insert your relevant project/experience]. I\'d love to learn more about how you approach [specific challenge]."',
    why: 'Shows relevance and keeps the conversation flowing'
  },
  {
    id: 'closer',
    title: 'The Professional Close',
    script: '"This has been incredibly insightful. Would it be okay if I connected with you on LinkedIn and perhaps followed up with a question or two? I really appreciate your time."',
    why: 'Respectful, specific, and opens the door for future contact'
  }
];

export const followUpTemplates = [
  {
    id: 'general',
    title: 'General Follow-Up',
    subject: 'Following up on our conversation at [Career Fair]',
    template: `Hi [Name],

It was great meeting you at the [Career Fair Name] yesterday. I really enjoyed our conversation about [specific topic you discussed].

[Add something valuable: article link, insight, or answer to their question]

I'd love to stay connected and learn more about opportunities at [Company] when the time is right. 

Best regards,
[Your Name]
[Your LinkedIn] | [Your Email]`
  },
  {
    id: 'project_mention',
    title: 'When You Mentioned a Project',
    subject: 'The [project/app] I mentioned at [Career Fair]',
    template: `Hi [Name],

Thanks for taking the time to chat with me about [topic] at the career fair!

As promised, here's the link to [project/portfolio piece] I mentioned: [link]

I'd love to hear your thoughts if you get a chance to check it out.

Looking forward to staying connected!

[Your Name]`
  }
];

export const timeManagementTips = [
  {
    id: 'priority_map',
    title: 'Create Your Priority Map',
    description: 'List companies as A-tier (dream jobs), B-tier (solid options), C-tier (backup plans)',
    tip: 'Spend 70% of your time with A-tier, 25% with B-tier, 5% with C-tier'
  },
  {
    id: 'early_bird',
    title: 'The Early Bird Strategy',
    description: 'Arrive 30 minutes early to connect with recruiters before crowds',
    tip: 'Recruiters are fresh, energetic, and have more time for meaningful conversations'
  },
  {
    id: 'lunch_break',
    title: 'Master the Lunch Break',
    description: 'Many students leave during lunch - this is your golden hour',
    tip: 'Grab coffee with recruiters or have deeper conversations without the rush'
  },
  {
    id: 'quality_over_quantity',
    title: 'Quality Over Quantity Always',
    description: '5 meaningful 10-minute conversations > 20 rushed 2-minute pitches',
    tip: 'Better to make a real impression with fewer companies than to be forgotten by many'
  }
];

export const personalBrandBuilder = [
  {
    id: 'unique_value',
    title: 'Your Unique Value Proposition',
    questions: [
      'What combination of skills/experiences do you have that others don\'t?',
      'What problem are you passionate about solving?',
      'What\'s your interesting backstory or perspective?',
      'What would colleagues say is your superpower?'
    ]
  },
  {
    id: 'elevator_pitch',
    title: 'The Formula for an Unforgettable Pitch',
    formula: '[Who you are] + [What you do/study] + [Your unique angle] + [What you\'re looking for] + [Question to engage them]',
    example: '"I\'m Alex, a final-year computer science student who builds accessibility tech after my sister\'s accident opened my eyes to digital barriers. I\'m looking for product roles where I can make tech more inclusive. What accessibility challenges has your team encountered?"'
  }
];

export const successSecrets = [
  {
    id: 'secret_1',
    title: '🎯 The 3-Touch Rule',
    content: 'Connect on LinkedIn within 24 hours, send a follow-up email with value within 48 hours, and circle back with a question or update within 2 weeks.'
  },
  {
    id: 'secret_2',
    title: '💎 The Reverse Question',
    content: 'Instead of asking "Are you hiring?", ask "What skills would make someone an ideal candidate for your team?" Shows strategic thinking.'
  },
  {
    id: 'secret_3',
    title: '🚀 The Portfolio QR Code',
    content: 'Create a QR code linking to your best work. Put it on your resume. Makes you memorable and shows tech-savvy thinking.'
  },
  {
    id: 'secret_4',
    title: '⚡ The Industry Insight',
    content: 'Start conversations with "I read about [industry trend]. How is that impacting your team?" Shows you think beyond the role.'
  }
];