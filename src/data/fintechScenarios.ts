
import { Scenario } from "@/components/ScenarioSelector";

export interface ScenarioCategory {
  id: string;
  name: string;
  description: string;
  scenarios: Scenario[];
}

export const fintechCategories: ScenarioCategory[] = [
  {
    id: "investor-fundraising",
    name: "Investor Relations & Fundraising",
    description: "Master the art of pitching, investor updates, and fundraising conversations across different cultural contexts and regulatory environments.",
    scenarios: [
      {
        id: "seed-pitch-deck",
        title: "Seed Round Pitch",
        description: "Present your fintech startup to international investors",
        prompt: "You're pitching your fintech startup to a diverse group of seed investors. Explain your product, market opportunity, and traction in 3 minutes. Be clear about your financial model and regulatory approach.",
        category: "Fundraising"
      },
      {
        id: "investor-update-quarterly",
        title: "Quarterly Investor Update",
        description: "Deliver monthly progress updates to your investor board",
        prompt: "Present your Q3 results to your investor board, including KPIs, challenges, and next quarter's focus. Address both growth metrics and regulatory compliance updates.",
        category: "Investor Relations"
      },
      {
        id: "due-diligence-presentation",
        title: "Due Diligence Deep Dive",
        description: "Explain technical and regulatory details during due diligence",
        prompt: "An institutional investor is conducting due diligence on your Series A. Walk them through your technology stack, security measures, and compliance framework across multiple jurisdictions.",
        category: "Due Diligence"
      },
      {
        id: "valuation-justification",
        title: "Valuation Discussion",
        description: "Defend your company valuation with data and comparables",
        prompt: "An investor questions your $50M valuation. Justify your pricing using comparable companies, growth metrics, and market opportunity. Address their concerns professionally.",
        category: "Negotiation"
      },
      {
        id: "bridge-round-explanation",
        title: "Bridge Financing Pitch",
        description: "Explain need for bridge funding to existing investors",
        prompt: "You need bridge financing before your Series B. Explain to current investors why you need additional capital, how you'll use it, and your path to the next round.",
        category: "Fundraising"
      }
    ]
  },
  {
    id: "customer-onboarding",
    name: "Customer Onboarding & Support",
    description: "Practice explaining complex fintech products to diverse customers while navigating cultural differences in financial communication.",
    scenarios: [
      {
        id: "kyc-aml-explanation",
        title: "KYC/AML Requirements",
        description: "Explain identity verification to international customers",
        prompt: "A customer from Nigeria is frustrated about extensive KYC requirements for your digital banking app. Explain why these checks are necessary and guide them through the process sensitively.",
        category: "Compliance"
      },
      {
        id: "institutional-client-onboarding",
        title: "Enterprise Client Onboarding",
        description: "Walk institutional clients through your platform setup",
        prompt: "You're onboarding a German family office to your wealth management platform. Explain the setup process, security features, and reporting capabilities they'll have access to.",
        category: "Enterprise Sales"
      },
      {
        id: "cross-border-payments",
        title: "International Transfer Setup",
        description: "Guide customers through cross-border payment flows",
        prompt: "A small business owner wants to send regular payments to suppliers in Southeast Asia. Explain your cross-border payment solution, fees, timelines, and regulatory considerations.",
        category: "Product Education"
      },
      {
        id: "crypto-custody-explanation",
        title: "Digital Asset Custody",
        description: "Explain cryptocurrency custody services to traditional investors",
        prompt: "A traditional investment firm is interested in your crypto custody solution. Explain how institutional-grade custody works, security measures, and regulatory compliance for digital assets.",
        category: "Product Education"
      },
      {
        id: "api-integration-support",
        title: "API Integration Training",
        description: "Train technical teams on API implementation",
        prompt: "You're training a fintech partner's development team on integrating your payment API. Explain authentication, error handling, and webhook setup for their e-commerce platform.",
        category: "Technical Support"
      }
    ]
  },
  {
    id: "compliance-regulatory",
    name: "Compliance & Regulatory Alignment",
    description: "Navigate complex regulatory discussions across different jurisdictions while maintaining clear communication with diverse stakeholders.",
    scenarios: [
      {
        id: "regulator-meeting",
        title: "Regulatory Authority Presentation",
        description: "Present your business model to financial regulators",
        prompt: "You're meeting with the central bank to discuss your digital lending license application. Explain your risk management framework, customer protection measures, and operational controls.",
        category: "Regulatory Affairs"
      },
      {
        id: "audit-response",
        title: "External Audit Response",
        description: "Address auditor questions about compliance procedures",
        prompt: "External auditors are questioning your AML transaction monitoring procedures. Explain your detection algorithms, false positive management, and escalation protocols.",
        category: "Audit"
      },
      {
        id: "policy-change-communication",
        title: "Regulatory Update Communication",
        description: "Explain new compliance requirements to internal teams",
        prompt: "New PCI DSS requirements affect your payment processing. Explain to your engineering and operations teams what changes are needed and the implementation timeline.",
        category: "Internal Communication"
      },
      {
        id: "cross-border-compliance",
        title: "Multi-Jurisdiction Compliance",
        description: "Explain compliance strategy across multiple countries",
        prompt: "Your fintech operates in 5 countries with different regulations. Present to your board how you maintain compliance across jurisdictions while scaling operations efficiently.",
        category: "Strategy"
      },
      {
        id: "incident-response-briefing",
        title: "Regulatory Incident Reporting",
        description: "Brief regulators on a security or compliance incident",
        prompt: "You've discovered a data breach affecting customer information. Brief the regulator on what happened, your response actions, and steps to prevent future incidents.",
        category: "Crisis Communication"
      }
    ]
  },
  {
    id: "product-feature-explanation",
    name: "Product & Feature Explanation",
    description: "Clearly communicate complex fintech products and features to diverse audiences with varying levels of financial literacy.",
    scenarios: [
      {
        id: "ai-credit-scoring",
        title: "AI Credit Assessment Demo",
        description: "Explain machine learning credit models to traditional lenders",
        prompt: "Demo your AI-powered credit scoring to a traditional bank's lending committee. Explain how the algorithm works, its advantages over traditional scoring, and risk management features.",
        category: "Product Demo"
      },
      {
        id: "blockchain-settlement",
        title: "Blockchain Settlement Explanation",
        description: "Explain blockchain technology for trade finance",
        prompt: "Present your blockchain-based trade finance platform to supply chain executives. Explain how smart contracts automate settlements and reduce counterparty risk.",
        category: "Technical Explanation"
      },
      {
        id: "robo-advisor-features",
        title: "Automated Investment Platform",
        description: "Explain robo-advisory services to wealth management clients",
        prompt: "Walk high-net-worth clients through your robo-advisor platform. Explain portfolio construction, rebalancing algorithms, and tax optimization features in accessible terms.",
        category: "Wealth Management"
      },
      {
        id: "embedded-finance-pitch",
        title: "Embedded Finance Solution",
        description: "Pitch embedded financial services to e-commerce platforms",
        prompt: "Pitch your embedded lending solution to an e-commerce marketplace. Explain how merchants can offer instant financing to customers and the revenue-sharing model.",
        category: "B2B Sales"
      },
      {
        id: "fraud-detection-demo",
        title: "Fraud Prevention Technology",
        description: "Demonstrate real-time fraud detection capabilities",
        prompt: "Demo your real-time fraud detection system to a payment processor. Show how machine learning identifies suspicious patterns and the user experience for legitimate transactions.",
        category: "Security"
      }
    ]
  },
  {
    id: "internal-collaboration",
    name: "Internal Team Collaboration",
    description: "Foster effective communication within diverse fintech teams across different cultural backgrounds and technical expertise levels.",
    scenarios: [
      {
        id: "cross-functional-sprint-planning",
        title: "Sprint Planning with Global Team",
        description: "Lead sprint planning with engineers across time zones",
        prompt: "Lead sprint planning for your feature release with engineers in India, designers in UK, and product managers in US. Align on priorities and address technical concerns.",
        category: "Project Management"
      },
      {
        id: "technical-debt-discussion",
        title: "Technical Debt Prioritization",
        description: "Discuss technical improvements with engineering leadership",
        prompt: "Your engineering team wants to refactor the payment processing system. Present the business case to leadership, including risk assessment and resource requirements.",
        category: "Technical Strategy"
      },
      {
        id: "go-to-market-alignment",
        title: "GTM Strategy Alignment",
        description: "Align product, sales, and marketing on launch strategy",
        prompt: "Present your new SME lending product's go-to-market strategy to sales, marketing, and customer success teams. Address pricing, positioning, and support requirements.",
        category: "Go-to-Market"
      },
      {
        id: "incident-post-mortem",
        title: "Technical Incident Review",
        description: "Lead post-mortem discussion after system downtime",
        prompt: "Lead a post-mortem after a 2-hour payment processing outage. Discuss root cause, immediate fixes implemented, and long-term prevention measures with the engineering team.",
        category: "Incident Management"
      },
      {
        id: "performance-review-discussion",
        title: "Cross-Cultural Performance Review",
        description: "Conduct performance reviews with international team members",
        prompt: "Conduct a performance review with a team member from Japan. Provide constructive feedback on their work while being culturally sensitive to communication preferences.",
        category: "People Management"
      }
    ]
  },
  {
    id: "cross-cultural-leadership",
    name: "Cross-Cultural Feedback & Leadership",
    description: "Develop leadership skills that work across cultures, focusing on giving feedback and managing diverse teams in fintech environments.",
    scenarios: [
      {
        id: "difficult-feedback-delivery",
        title: "Delivering Difficult Feedback",
        description: "Address performance issues with cultural sensitivity",
        prompt: "A team member from a high-context culture has been missing deadlines. Provide constructive feedback about their performance while being culturally appropriate and maintaining their dignity.",
        category: "Performance Management"
      },
      {
        id: "cultural-conflict-resolution",
        title: "Cultural Misunderstanding Resolution",
        description: "Resolve conflicts arising from cultural differences",
        prompt: "There's tension between your direct German engineering lead and indirect Indian business analyst over project communication styles. Mediate this cultural conflict professionally.",
        category: "Conflict Resolution"
      },
      {
        id: "virtual-team-motivation",
        title: "Remote Team Motivation",
        description: "Motivate distributed teams across different cultures",
        prompt: "Your distributed fintech team has been demotivated after a product launch delay. Rally the team across different time zones and cultural backgrounds to refocus on the revised timeline.",
        category: "Team Leadership"
      },
      {
        id: "promotion-announcement",
        title: "Promotion and Recognition",
        description: "Announce promotions and recognize achievements culturally appropriately",
        prompt: "Announce a team member's promotion to the global team while being mindful of different cultural attitudes toward individual recognition and hierarchy.",
        category: "Recognition"
      },
      {
        id: "change-management-communication",
        title: "Organizational Change Communication",
        description: "Communicate major changes to international teams",
        prompt: "Your fintech is restructuring to focus on B2B markets. Communicate this strategic shift to teams in different countries, addressing concerns about job security and role changes.",
        category: "Change Management"
      }
    ]
  },
  {
    id: "negotiation-conflict",
    name: "Negotiation & Conflict Resolution",
    description: "Master negotiation tactics and conflict resolution strategies that work across different cultural contexts in fintech partnerships and deals.",
    scenarios: [
      {
        id: "partnership-negotiation",
        title: "Strategic Partnership Terms",
        description: "Negotiate fintech partnership agreements internationally",
        prompt: "Negotiate API partnership terms with a major bank in Singapore. Discuss revenue sharing, SLA requirements, and technical integration timelines while respecting their hierarchical decision-making process.",
        category: "Partnership"
      },
      {
        id: "vendor-contract-dispute",
        title: "Vendor Contract Dispute",
        description: "Resolve disagreements with international technology vendors",
        prompt: "Your cloud infrastructure vendor in Europe is not meeting SLA requirements, affecting your payment processing. Negotiate resolution while maintaining the long-term relationship.",
        category: "Vendor Management"
      },
      {
        id: "acquisition-discussion",
        title: "Acquisition Negotiations",
        description: "Navigate early-stage acquisition conversations",
        prompt: "A larger fintech company is interested in acquiring your startup. Navigate initial discussions about valuation, team retention, and cultural fit during the exploratory phase.",
        category: "M&A"
      },
      {
        id: "regulatory-negotiation",
        title: "Regulatory Requirement Negotiation",
        description: "Negotiate implementation timelines with regulators",
        prompt: "Regulators want faster implementation of new AML requirements than your technical timeline allows. Negotiate a realistic implementation schedule while demonstrating commitment to compliance.",
        category: "Regulatory Relations"
      },
      {
        id: "client-contract-renewal",
        title: "Enterprise Contract Renewal",
        description: "Renegotiate terms with major enterprise clients",
        prompt: "Your largest enterprise client wants to renegotiate pricing and terms for contract renewal. Balance maintaining the relationship with protecting your company's margins and growth.",
        category: "Account Management"
      }
    ]
  },
  {
    id: "meetings-presentations",
    name: "Meetings & Presentations Across Cultures",
    description: "Deliver effective presentations and lead productive meetings with international stakeholders in various fintech contexts.",
    scenarios: [
      {
        id: "board-meeting-presentation",
        title: "Board Meeting Financial Review",
        description: "Present quarterly results to an international board",
        prompt: "Present Q4 financial results to your board with members from US, UK, and Asia. Cover revenue growth, burn rate, and path to profitability with cultural sensitivity to different business communication styles.",
        category: "Board Relations"
      },
      {
        id: "conference-keynote",
        title: "Industry Conference Keynote",
        description: "Deliver keynote on fintech innovation to global audience",
        prompt: "Give a 15-minute keynote on 'The Future of Cross-Border Payments' at an international fintech conference. Address a diverse audience including regulators, entrepreneurs, and traditional bankers.",
        category: "Public Speaking"
      },
      {
        id: "customer-advisory-board",
        title: "Customer Advisory Board Meeting",
        description: "Facilitate discussion with international customers",
        prompt: "Lead a virtual customer advisory board meeting with enterprise clients from different continents. Gather feedback on your roadmap while managing different communication styles and expectations.",
        category: "Customer Relations"
      },
      {
        id: "all-hands-announcement",
        title: "Company All-Hands Announcement",
        description: "Announce major news to international workforce",
        prompt: "Announce a major Series B funding round to your global team of 200+ employees across 15 countries. Address growth plans, hiring, and cultural initiatives while maintaining team unity.",
        category: "Internal Communication"
      },
      {
        id: "regulator-workshop",
        title: "Regulatory Workshop Facilitation",
        description: "Lead educational sessions with regulatory stakeholders",
        prompt: "Facilitate a workshop explaining fintech innovation to traditional banking regulators from emerging markets. Help them understand new technologies while addressing their regulatory concerns.",
        category: "Regulatory Education"
      }
    ]
  }
];
