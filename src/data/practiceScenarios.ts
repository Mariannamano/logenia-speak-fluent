
import { Scenario } from "@/components/ScenarioSelector";

export interface ScenarioCategory {
  id: string;
  name: string;
  description: string;
  scenarios: Scenario[];
}

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
  }
];
