interface AIContent {
  coverLetter: string;
  coldMail: string;
  referralMsg: string;
}

interface AIContentTabsProps {
  aiContent: AIContent;
}

const AI_TABS = [
  { id: "cover-letter", label: "Cover Letter" },
]
