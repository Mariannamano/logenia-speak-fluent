import { Scenario, ScenarioCategory } from "@/components/ScenarioSelector";

export const practiceCategories: ScenarioCategory[] = [
  {
    id: "professional",
    name: "Work & Professional Communication",
    description: "Simulate workplace moments that require clear, concise, confident speaking — when you're likely to ramble or reach for filler words.",
    scenarios: [
      {
        id: "interview-introduction",
        title: "Interview Self-Introduction",
        description: "Practice your elevator pitch for job interviews",
        prompt: "Tell me about yourself and your professional background in 1-2 minutes.",
        category: "Interview"
      },
      {
        id: "project-update",
        title: "Team Progress Update",
        description: "Present a concise project update to stakeholders",
        prompt: "Can you walk us through your progress this week? Give a clear update on what you've worked on, what's pending, and any blockers.",
        category: "Meetings"
      },
      {
        id: "customer-presentation",
        title: "Solution Pitch",
        description: "Present a solution to potential stakeholders",
        prompt: "You're pitching a new workflow tool to your team. Explain the tool, how it works, and why it will save time.",
        category: "Sales"
      },
      {
        id: "brainstorming-contribution",
        title: "Team Brainstorming",
        description: "Contribute a solution to a team discussion",
        prompt: "Your team is stuck, and you offer a possible solution. Share your idea and explain the logic behind it.",
        category: "Collaboration"
      },
      {
        id: "virtual-introduction",
        title: "Virtual Team Introduction",
        description: "Introduce yourself to a cross-functional team",
        prompt: "Introduce yourself in a virtual meeting with a new cross-functional team. Say your name, role, what you'll be working on, and one thing you're excited about.",
        category: "Meetings"
      },
      {
        id: "project-reflection",
        title: "Project Reflection",
        description: "Reflect on past projects with your manager",
        prompt: "Your manager is asking how your last project went and what you would do differently. Reflect on wins and mistakes, and what you'd improve next time.",
        category: "Management"
      },
      {
        id: "call-summary",
        title: "Call Wrap-up",
        description: "Summarize next steps clearly at the end of a call",
        prompt: "You're wrapping up a call and need to summarize next steps clearly. Deliver a crisp summary of what was decided and what happens next.",
        category: "Communication"
      },
      {
        id: "role-explanation",
        title: "Explaining Your Role",
        description: "Explain your job to someone outside your department",
        prompt: "Can you explain your role to someone outside your department? Keep it clear and jargon-free.",
        category: "Career"
      },
      {
        id: "performance-highlight",
        title: "Performance Review Prep",
        description: "Advocate for yourself in a performance review",
        prompt: "You're prepping for your first performance review and asked: 'What are you most proud of this quarter?' Speak like you're advocating for yourself.",
        category: "Career"
      },
      {
        id: "networking-intro",
        title: "Networking Introduction",
        description: "Introduce yourself at a networking event",
        prompt: "Give a brief, engaging introduction about yourself and your work at a professional networking event.",
        category: "Networking"
      }
    ]
  },
  {
    id: "storytelling",
    name: "Self-Expression & Storytelling",
    description: "Practice more personal, narrative-driven communication that helps you connect with others authentically.",
    scenarios: [
      {
        id: "networking-story",
        title: "Your Personal Story",
        description: "Share your background at a networking event",
        prompt: "You're meeting someone at a networking event who asks: 'So what's your story?' Respond as if you're casually introducing who you are, where you're from, and what brought you to where you are now.",
        category: "Networking"
      },
      {
        id: "life-updates",
        title: "Life Updates",
        description: "Catch up with an old friend",
        prompt: "A friend you haven't seen in years asks what's changed in your life recently. Speak for a minute about any big changes — school, work, relationships — and what you've learned.",
        category: "Personal"
      },
      {
        id: "formative-moment",
        title: "Formative Moment",
        description: "Share a meaningful life experience",
        prompt: "You're applying for a fellowship, and the interviewer asks: 'Tell me about a moment that shaped who you are today.' Pick one event and walk through it like you're reflecting out loud.",
        category: "Interview"
      },
      {
        id: "career-choice",
        title: "Career Choice Story",
        description: "Explain why you chose your field",
        prompt: "Someone at a dinner asks why you chose your major or field of work. Share the backstory of how you got into it — childhood interests, mentors, a turning point, etc.",
        category: "Career"
      },
      {
        id: "post-graduation",
        title: "Post-Graduation Journey",
        description: "Reflect on your path since graduation",
        prompt: "You've been invited to give a short talk at your old high school about your journey after graduation. Describe your path, including moments of doubt, success, or change.",
        category: "Public Speaking"
      },
      {
        id: "international-intro",
        title: "Cultural Introduction",
        description: "Introduce yourself in an international context",
        prompt: "You're introducing yourself in a group of international interns. Talk about your name, where you're from, and one unique thing about your background that shapes how you think.",
        category: "Cultural"
      },
      {
        id: "overcoming-challenge",
        title: "Overcoming Challenges",
        description: "Share a challenge you've overcome",
        prompt: "You're telling your mentor about a challenge you overcame that you're proud of. Be honest, vulnerable, and specific — what was hard, and what did you do?",
        category: "Personal Growth"
      },
      {
        id: "reflection-session",
        title: "Personal Reflection",
        description: "Share current thoughts in a reflective setting",
        prompt: "You're in a therapy or coaching session and asked: 'What's been on your mind lately?' Speak freely about something you've been thinking a lot about — personal or professional.",
        category: "Reflection"
      },
      {
        id: "personal-motivation",
        title: "Personal Motivation",
        description: "Express what drives you",
        prompt: "A journalist interviews you for a student spotlight and says: 'What motivates you to get out of bed every day?' Respond thoughtfully with personal meaning.",
        category: "Motivation"
      },
      {
        id: "yearly-highlight",
        title: "Year Highlight",
        description: "Share a meaningful moment from your year",
        prompt: "You're catching up with a cousin and they ask: 'What's been the highlight of your year so far?' Tell the story like you're talking to someone who genuinely cares.",
        category: "Personal"
      }
    ]
  },
  {
    id: "opinions",
    name: "Opinions & Debate",
    description: "Practice expressing your views clearly and respectfully while backing them up with examples or observations.",
    scenarios: [
      {
        id: "remote-work-productivity",
        title: "Remote Work Productivity",
        description: "Share your opinion on remote work productivity",
        prompt: "Do you think remote work makes people more productive? Share your opinion and back it up with an example or observation.",
        category: "Group Discussion"
      },
      {
        id: "social-media-mental-health",
        title: "Social Media & Mental Health",
        description: "Discuss social media's impact on mental health",
        prompt: "A friend from another country asks what you think about social media and mental health. Reflect on your personal experience and what you've seen around you.",
        category: "Personal Reflection"
      },
      {
        id: "coding-importance",
        title: "Coding for Everyone?",
        description: "Debate whether everyone should learn coding",
        prompt: "You're in a panel discussion and asked: 'Should everyone learn to code?' Answer like you're speaking to a mixed audience — clearly and with structure.",
        category: "Panel Discussion"
      },
      {
        id: "grades-importance",
        title: "Do Grades Matter?",
        description: "Respectfully disagree about the importance of grades",
        prompt: "A colleague says grades don't matter — you disagree. Explain your view respectfully and give a story that supports it.",
        category: "Disagreement"
      },
      {
        id: "work-life-balance",
        title: "Work-Life Balance Reality",
        description: "Reflect on whether work-life balance is achievable",
        prompt: "Someone challenges you: 'Is work-life balance even real?' Reflect honestly. Talk about a time you felt you had (or didn't have) it.",
        category: "Honest Reflection"
      },
      {
        id: "startup-vs-bigco",
        title: "Startup vs. Big Company",
        description: "Compare career growth options between startups and big companies",
        prompt: "You're asked: 'Startup or big company — which is better for career growth?' Share your perspective, and talk about your own preferences or experience.",
        category: "Career Advice"
      },
      {
        id: "ai-job-replacement",
        title: "AI Job Replacement",
        description: "Discuss the pace of AI replacing jobs",
        prompt: "You're in a casual debate: 'Is AI replacing too many jobs too fast?' Speak naturally and explore both sides if you can.",
        category: "Casual Debate"
      },
      {
        id: "team-diversity",
        title: "Team Diversity Impact",
        description: "Share thoughts on diversity's effect on team performance",
        prompt: "A teammate asks: 'Do you think team diversity actually improves performance?' Respond thoughtfully, ideally with an example from your own work.",
        category: "Team Dynamics"
      },
      {
        id: "free-college",
        title: "Should College Be Free?",
        description: "Express your view on college affordability",
        prompt: "You're talking with peers and someone asks: 'Should college be free?' Express your view and tie it to your background or values.",
        category: "Social Policy"
      },
      {
        id: "linkedin-posting",
        title: "Professional Social Media",
        description: "Discuss appropriate LinkedIn content",
        prompt: "Someone in your industry asks: 'Should people post about work stuff on LinkedIn or not?' Say what you think and why — from authenticity to attention-seeking.",
        category: "Professional Etiquette"
      }
    ]
  },
  {
    id: "presenting",
    name: "Public Speaking & Presenting",
    description: "Build confidence in formal presentation settings where structure and clarity are essential.",
    scenarios: [
      {
        id: "presentation-intro",
        title: "Presentation Opening",
        description: "Start a team presentation with a strong introduction",
        prompt: "You're opening a team presentation and introducing yourself and the topic. Start strong and clearly explain what your audience can expect.",
        category: "Team Presentation"
      },
      {
        id: "quarterly-results",
        title: "Quarterly Results Report",
        description: "Present performance data to your department",
        prompt: "You're presenting quarterly results to your department. Walk through the numbers, explain trends, and highlight one key takeaway.",
        category: "Data Presentation"
      },
      {
        id: "team-explanation",
        title: "Team Introduction",
        description: "Explain your team's function to interns",
        prompt: "You've been asked to explain what your team does to a visiting group of interns. Make it simple, clear, and interesting — like you're teaching it for the first time.",
        category: "Onboarding"
      },
      {
        id: "product-demo",
        title: "Product Demo",
        description: "Demonstrate a product or tool you use regularly",
        prompt: "You're giving a demo of a product or tool you use often. Describe how it works, who uses it, and what problem it solves.",
        category: "Demo"
      },
      {
        id: "startup-pitch",
        title: "Startup Pitch",
        description: "Pitch a business idea at a competition",
        prompt: "You're pitching a startup idea at a student competition. State the problem, your solution, and why it's needed — like it's your elevator pitch.",
        category: "Pitch"
      },
      {
        id: "meeting-summary",
        title: "Meeting Wrap-up",
        description: "Close a meeting with key decisions summarized",
        prompt: "You're asked to close a meeting by summarizing key decisions. Wrap it up in a concise, confident tone that shows leadership.",
        category: "Leadership"
      },
      {
        id: "internship-presentation",
        title: "Internship Experience",
        description: "Share your internship experience with a student club",
        prompt: "You've been asked to present at a student club about your internship experience. Share highlights, what surprised you, and any lessons learned.",
        category: "Student Presentation"
      },
      {
        id: "training-session",
        title: "New Hire Training",
        description: "Explain a concept during new hire training",
        prompt: "You're leading a training session for new hires. Pick one concept and explain it like you're onboarding someone.",
        category: "Training"
      },
      {
        id: "qa-response",
        title: "Q&A Response",
        description: "Answer an unexpected question after your presentation",
        prompt: "You're answering a follow-up question after your presentation. Stay calm and respond like you didn't expect the question — keep clarity under pressure.",
        category: "Q&A"
      },
      {
        id: "networking-introduction",
        title: "60-Second Introduction",
        description: "Deliver a brief, engaging introduction at a networking event",
        prompt: "You're asked to speak for 1 minute at a networking event: 'Tell us who you are and what excites you right now.' Make it engaging but filler-free — and end with confidence.",
        category: "Networking"
      }
    ]
  },
  {
    id: "cross-cultural",
    name: "Cross-Cultural Communication",
    description: "Learn to adapt your communication style for international business contexts and avoid misunderstandings.",
    scenarios: [
      {
        id: "international-meeting",
        title: "International Team Meeting",
        description: "Practice clear communication in a multinational team",
        prompt: "You're leading a meeting with team members from different countries. Introduce the agenda and set expectations for participation.",
        category: "International Business"
      },
      {
        id: "cultural-norms",
        title: "Explaining Cultural Norms",
        description: "Discuss cultural differences in business communication",
        prompt: "A colleague from another country asks about communication norms in your culture. Explain how directness, feedback, and disagreement are typically handled.",
        category: "Cultural Exchange"
      },
      {
        id: "negotiation-styles",
        title: "Cross-Cultural Negotiation",
        description: "Adapt your negotiation approach for international contexts",
        prompt: "You're preparing for a negotiation with partners from a different culture. Explain your approach and how you'll adapt your communication style.",
        category: "Negotiation"
      },
      {
        id: "etiquette-explanation",
        title: "Business Etiquette Explanation",
        description: "Share business customs with international colleagues",
        prompt: "New team members from abroad have joined your company. Explain some important business etiquette rules they should be aware of.",
        category: "Business Etiquette"
      }
    ]
  },
  {
    id: "casual",
    name: "Casual Conversations",
    description: "Practice everyday interactions to build confidence and fluency in informal settings.",
    scenarios: [
      {
        id: "small-talk",
        title: "Office Small Talk",
        description: "Practice casual conversation with colleagues",
        prompt: "You're chatting with a colleague by the coffee machine. Talk about your weekend or recent vacation without using filler words.",
        category: "Workplace Social"
      },
      {
        id: "networking-event",
        title: "Networking Event Chat",
        description: "Introduce yourself at an industry mixer",
        prompt: "You've just met someone at an industry networking event. Introduce yourself and find common professional interests.",
        category: "Networking"
      },
      {
        id: "lunch-conversation",
        title: "Lunch Break Discussion",
        description: "Chat about current events or shared interests",
        prompt: "You're having lunch with colleagues and the conversation turns to a recent news event or popular show. Share your thoughts clearly.",
        category: "Social"
      },
      {
        id: "catching-up",
        title: "Catching Up with Colleagues",
        description: "Reconnect with someone you haven't seen recently",
        prompt: "You're running into a colleague you haven't seen in months. Catch them up on what you've been working on and ask about their projects.",
        category: "Workplace Social"
      }
    ]
  },
  {
    id: "startup",
    name: "Startup-Specific Scenarios",
    description: "Master the unique communication challenges of startup environments and pitch situations.",
    scenarios: [
      {
        id: "elevator-pitch",
        title: "Elevator Pitch",
        description: "Deliver a concise pitch for your startup idea",
        prompt: "You have 60 seconds in an elevator with a potential investor. Explain your startup idea clearly and convincingly.",
        category: "Pitching"
      },
      {
        id: "investor-meeting",
        title: "Investor Q&A",
        description: "Answer tough questions about your business model",
        prompt: "An investor asks: 'What makes your solution different from existing competitors?' Respond clearly and confidently.",
        category: "Fundraising"
      },
      {
        id: "team-vision",
        title: "Team Vision Communication",
        description: "Share your vision with new team members",
        prompt: "You're onboarding new hires to your startup. Explain the company vision and values in a way that's inspiring and clear.",
        category: "Leadership"
      },
      {
        id: "product-demo",
        title: "Product Demo",
        description: "Present your product clearly and persuasively",
        prompt: "You're giving a demo of your product to potential customers. Walk through the key features and benefits without technical jargon.",
        category: "Sales"
      }
    ]
  }
];
