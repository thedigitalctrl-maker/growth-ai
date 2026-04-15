import { MessageSquare } from "lucide-react";

export function FeedbackButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSd_9q4E-uS72fb1LB_Iey5xUEtHIMBbCkxxM3ZOroFrF7MNXA/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer transition-all duration-200 hover:scale-105"
      style={{ 
        backgroundColor: '#70B5F9', 
        color: '#FFFFFF',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0A66C2';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#70B5F9';
      }}
    >
      <MessageSquare className="w-4 h-4" />
      <span>Give Feedback</span>
    </a>
  );
}