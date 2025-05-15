
import { Scenario } from "@/components/ScenarioSelector";

export const professionalScenarios: Scenario[] = [
  {
    id: "interview-introduction",
    title: "Interview Self-Introduction",
    description: "Practice your elevator pitch for job interviews",
    prompt: "Tell me about yourself and your professional background in 1-2 minutes.",
    category: "Interview"
  },
  {
    id: "project-update",
    title: "Project Status Update",
    description: "Present a concise project update to stakeholders",
    prompt: "Share an update on your project's progress, challenges, and next steps in under 2 minutes.",
    category: "Meetings"
  },
  {
    id: "customer-presentation",
    title: "Customer Presentation",
    description: "Present a solution to a potential customer",
    prompt: "Explain how your product/service solves the customer's problem in a compelling way.",
    category: "Sales"
  },
  {
    id: "conflict-resolution",
    title: "Conflict Resolution",
    description: "Address a disagreement with a colleague",
    prompt: "Discuss how you would address a situation where you disagree with a colleague's approach to a project.",
    category: "Workplace"
  },
  {
    id: "feedback-delivery",
    title: "Giving Constructive Feedback",
    description: "Practice giving effective feedback",
    prompt: "Deliver constructive feedback to a team member about their recent performance.",
    category: "Management"
  },
  {
    id: "networking-intro",
    title: "Networking Introduction",
    description: "Introduce yourself at a networking event",
    prompt: "Give a brief, engaging introduction about yourself and your work at a professional networking event.",
    category: "Networking"
  }
];
