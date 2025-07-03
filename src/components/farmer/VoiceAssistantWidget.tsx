import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, MicOff, Volume2, MessageSquare } from 'lucide-react';

export const VoiceAssistantWidget: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const commonQuestions = [
    'What should I grow this season?',
    'How to treat tomato blight?',
    'What is today\'s onion price?',
    'When should I water my crops?',
    'How to apply for crop insurance?',
    'What fertilizer for wheat?'
  ];

  const handleMicToggle = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition API
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    // Here you would process the selected question
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">AI Assistant</h3>
        <Volume2 className="h-5 w-5 text-green-600" />
      </div>
      
      <div className="text-center mb-6">
        <button
          onClick={handleMicToggle}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
            isListening
              ? 'bg-red-500 text-white shadow-lg animate-pulse'
              : 'bg-green-500 text-white shadow-md hover:bg-green-600'
          }`}
        >
          {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </button>
        <p className="text-sm text-gray-600 mt-2">
          {isListening ? 'Listening...' : 'Tap to speak'}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</p>
        <div className="grid grid-cols-1 gap-2">
          {commonQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSelect(question)}
              className={`text-left p-3 rounded-lg text-sm border transition-all hover:shadow-sm ${
                selectedQuestion === question
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              {question}
            </button>
          ))}
        </div>
      </div>

      <Link
        to="/farmer/voice-assistant"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
      >
        Open Full Assistant
      </Link>

      {selectedQuestion && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
          <p className="text-sm font-medium text-gray-800 mb-2">You asked:</p>
          <p className="text-sm text-gray-600 mb-3">"{selectedQuestion}"</p>
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
            <p className="text-sm text-gray-700">AI response will appear here...</p>
          </div>
        </div>
      )}
    </div>
  );
};