import React, { useState } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Plus, Calendar, MapPin, Mic, Edit3, CheckCircle, MessageSquare, Send, Bot, User, Sparkles, Clock } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface CropPlan {
  id: string;
  cropName: string;
  region: string;
  season: string;
  plantingDate: string;
  harvestDate: string;
  notes: string;
  tasks: Task[];
  status: 'planning' | 'planted' | 'growing' | 'harvested';
  chatHistory: ChatMessage[];
  createdAt: Date;
  aiRecommendations: string[];
}

interface Task {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  type: 'planting' | 'watering' | 'fertilizing' | 'harvesting';
}

export const CropPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'plans'>('create');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Create Plan State
  const [newPlan, setNewPlan] = useState({
    cropName: '',
    region: '',
    season: '',
    plantingDate: '',
    notes: ''
  });
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Existing Plans State
  const [cropPlans, setCropPlans] = useState<CropPlan[]>([
    {
      id: '1',
      cropName: 'Tomatoes',
      region: 'North Field',
      season: 'Kharif 2024',
      plantingDate: '2024-06-15',
      harvestDate: '2024-09-15',
      notes: 'Using hybrid variety for better yield',
      status: 'growing',
      createdAt: new Date('2024-06-10'),
      aiRecommendations: [
        'Consider drip irrigation for water efficiency',
        'Apply organic compost 2 weeks before planting',
        'Monitor for early blight during humid weather'
      ],
      chatHistory: [
        {
          id: '1',
          text: 'I want to grow tomatoes in my north field',
          sender: 'user',
          timestamp: new Date('2024-06-10T10:00:00')
        },
        {
          id: '2',
          text: 'Excellent choice! Tomatoes are perfect for the Kharif season. For your north field, I recommend hybrid varieties like Arka Rakshak or Pusa Ruby. They have good disease resistance and yield potential.',
          sender: 'ai',
          timestamp: new Date('2024-06-10T10:01:00')
        },
        {
          id: '3',
          text: 'What about soil preparation?',
          sender: 'user',
          timestamp: new Date('2024-06-10T10:02:00')
        },
        {
          id: '4',
          text: 'For tomatoes, prepare the soil with organic compost (5-10 tons/hectare) and ensure good drainage. The ideal pH is 6.0-7.0. Add NPK fertilizer at the time of transplanting.',
          sender: 'ai',
          timestamp: new Date('2024-06-10T10:03:00')
        }
      ],
      tasks: [
        { id: '1', title: 'Prepare soil', date: '2024-06-10', completed: true, type: 'planting' },
        { id: '2', title: 'Plant seeds', date: '2024-06-15', completed: true, type: 'planting' },
        { id: '3', title: 'First watering', date: '2024-06-20', completed: true, type: 'watering' },
        { id: '4', title: 'Apply fertilizer', date: '2024-07-01', completed: false, type: 'fertilizing' },
      ]
    },
    {
      id: '2',
      cropName: 'Wheat',
      region: 'South Field',
      season: 'Rabi 2024-25',
      plantingDate: '2024-11-15',
      harvestDate: '2025-04-15',
      notes: 'Planning for drought-resistant variety',
      status: 'planning',
      createdAt: new Date('2024-01-10'),
      aiRecommendations: [
        'Choose drought-resistant varieties like HD-2967',
        'Ensure proper seed treatment before sowing',
        'Plan for timely irrigation during critical growth stages'
      ],
      chatHistory: [
        {
          id: '1',
          text: 'I need help planning wheat for the upcoming Rabi season',
          sender: 'user',
          timestamp: new Date('2024-01-10T14:00:00')
        },
        {
          id: '2',
          text: 'Great timing! For Rabi wheat, I recommend varieties like HD-2967 or PBW-343. Given the climate patterns, drought-resistant varieties would be ideal for your region.',
          sender: 'ai',
          timestamp: new Date('2024-01-10T14:01:00')
        }
      ],
      tasks: []
    }
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsAiTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputMessage, newPlan);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiMessage]);
        setIsAiTyping(false);
      }, 1500);
    }
  };

  const generateAIResponse = (message: string, planData: any): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('tomato')) {
      return 'Tomatoes are excellent for your region! I recommend hybrid varieties like Arka Rakshak for disease resistance. The ideal planting time is June-July for Kharif season. Would you like specific guidance on soil preparation or irrigation?';
    } else if (lowerMessage.includes('wheat')) {
      return 'For wheat cultivation, consider drought-resistant varieties like HD-2967 or PBW-343. November is the perfect time for sowing. Ensure proper seed treatment and plan for 4-5 irrigations during the growing period.';
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('preparation')) {
      return 'Soil preparation is crucial! Add 5-10 tons of organic compost per hectare, ensure proper drainage, and maintain pH between 6.0-7.0. Deep plowing 2-3 weeks before planting helps with aeration.';
    } else if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) {
      return 'For efficient water management, I recommend drip irrigation. Water requirements vary by crop stage - more during flowering and fruit development. Monitor soil moisture at 6-inch depth.';
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrition')) {
      return 'Balanced nutrition is key! Use NPK fertilizers based on soil testing. For most crops, apply 50% nitrogen at planting and remaining in splits. Don\'t forget micronutrients like zinc and boron.';
    } else {
      return 'I understand your question. Based on your location and farming conditions, I can provide specific recommendations. Could you tell me more about your crop choice, field conditions, or specific challenges you\'re facing?';
    }
  };

  const handleCreatePlan = () => {
    if (newPlan.cropName && newPlan.region && newPlan.season) {
      const plan: CropPlan = {
        id: Date.now().toString(),
        ...newPlan,
        harvestDate: '',
        status: 'planning',
        tasks: [],
        chatHistory: chatMessages,
        createdAt: new Date(),
        aiRecommendations: [
          'Monitor weather conditions regularly',
          'Ensure proper soil testing before planting',
          'Plan for integrated pest management'
        ]
      };
      setCropPlans([...cropPlans, plan]);
      
      // Reset form and chat
      setNewPlan({ cropName: '', region: '', season: '', plantingDate: '', notes: '' });
      setChatMessages([{
        id: '1',
        text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      // Switch to plans tab
      setActiveTab('plans');
    }
  };

  const handleMicToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const toggleTask = (planId: string, taskId: string) => {
    setCropPlans(plans =>
      plans.map(plan =>
        plan.id === planId
          ? {
              ...plan,
              tasks: plan.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              )
            }
          : plan
      )
    );
  };

  const continueChatWithPlan = (planId: string) => {
    const plan = cropPlans.find(p => p.id === planId);
    if (plan) {
      setChatMessages(plan.chatHistory);
      setNewPlan({
        cropName: plan.cropName,
        region: plan.region,
        season: plan.season,
        plantingDate: plan.plantingDate,
        notes: plan.notes
      });
      setActiveTab('create');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'planted':
        return 'bg-blue-100 text-blue-800';
      case 'growing':
        return 'bg-green-100 text-green-800';
      case 'harvested':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Crop Planner</h2>
          <p className="text-gray-600">Plan your crops with AI assistance and manage your farming schedule</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'create'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Create Plan with AI</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'plans'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>My Plans ({cropPlans.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Create Plan Tab */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plan Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <Plus className="h-5 w-5 mr-2 text-green-600" />
                Create New Crop Plan
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                  <input
                    type="text"
                    value={newPlan.cropName}
                    onChange={(e) => setNewPlan({ ...newPlan, cropName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Tomatoes, Wheat, Rice"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region/Field</label>
                  <input
                    type="text"
                    value={newPlan.region}
                    onChange={(e) => setNewPlan({ ...newPlan, region: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., North Field, Plot A"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                  <select
                    value={newPlan.season}
                    onChange={(e) => setNewPlan({ ...newPlan, season: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Season</option>
                    <option value="Kharif 2024">Kharif 2024</option>
                    <option value="Rabi 2024-25">Rabi 2024-25</option>
                    <option value="Zaid 2025">Zaid 2025</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                  <input
                    type="date"
                    value={newPlan.plantingDate}
                    onChange={(e) => setNewPlan({ ...newPlan, plantingDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={newPlan.notes}
                    onChange={(e) => setNewPlan({ ...newPlan, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add notes about variety, special care, etc."
                  />
                </div>
              </div>

              <button
                onClick={handleCreatePlan}
                disabled={!newPlan.cropName || !newPlan.region || !newPlan.season}
                className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Save Plan with AI Chat</span>
              </button>
            </div>

            {/* AI Chat Interface */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-green-600" />
                  AI Crop Assistant
                </h3>
                <p className="text-sm text-gray-600">Ask me anything about crop planning, soil preparation, or farming techniques</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md flex items-start space-x-2 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' ? 'bg-green-600' : 'bg-blue-600'
                        }`}>
                          {message.sender === 'user' ? 
                            <User className="h-4 w-4 text-white" /> : 
                            <Bot className="h-4 w-4 text-white" />
                          }
                        </div>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={handleMicToggle}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about crops, soil, irrigation, fertilizers..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Plans Tab */}
        {activeTab === 'plans' && (
          <div>
            {selectedPlan ? (
              // Plan Detail View
              <div>
                {(() => {
                  const plan = cropPlans.find(p => p.id === selectedPlan);
                  if (!plan) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setSelectedPlan(null)}
                          className="text-green-600 hover:text-green-700 flex items-center space-x-2"
                        >
                          <span>← Back to Plans</span>
                        </button>
                        <button
                          onClick={() => continueChatWithPlan(plan.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Continue AI Chat</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Plan Details */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{plan.cropName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {plan.region}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {plan.season}
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                            </span>
                          </div>

                          {plan.notes && (
                            <div className="bg-gray-50 p-3 rounded-lg mb-4">
                              <p className="text-sm text-gray-700">{plan.notes}</p>
                            </div>
                          )}

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-800 mb-3">AI Recommendations</h4>
                            <div className="space-y-2">
                              {plan.aiRecommendations.map((rec, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5" />
                                  <p className="text-sm text-gray-700">{rec}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {plan.tasks.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-800 mb-3">Tasks</h4>
                              <div className="space-y-2">
                                {plan.tasks.map((task) => (
                                  <div key={task.id} className="flex items-center space-x-3">
                                    <button
                                      onClick={() => toggleTask(plan.id, task.id)}
                                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        task.completed
                                          ? 'bg-green-500 border-green-500 text-white'
                                          : 'border-gray-300 hover:border-green-500'
                                      }`}
                                    >
                                      {task.completed && <CheckCircle className="h-3 w-3" />}
                                    </button>
                                    <div className="flex-1">
                                      <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {task.title}
                                      </p>
                                      <p className="text-xs text-gray-500">{task.date}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat History */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                              AI Chat History
                            </h3>
                            <p className="text-sm text-gray-600">Your conversation about this crop plan</p>
                          </div>
                          
                          <div className="p-4 h-96 overflow-y-auto">
                            <div className="space-y-4">
                              {plan.chatHistory.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div className={`max-w-xs flex items-start space-x-2 ${
                                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                  }`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                      message.sender === 'user' ? 'bg-green-600' : 'bg-blue-600'
                                    }`}>
                                      {message.sender === 'user' ? 
                                        <User className="h-3 w-3 text-white" /> : 
                                        <Bot className="h-3 w-3 text-white" />
                                      }
                                    </div>
                                    <div
                                      className={`px-3 py-2 rounded-lg ${
                                        message.sender === 'user'
                                          ? 'bg-green-600 text-white'
                                          : 'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      <p className="text-xs">{message.text}</p>
                                      <p className={`text-xs mt-1 opacity-70`}>
                                        {message.timestamp.toLocaleTimeString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              // Plans Grid View
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Crop Plans</h3>
                  <p className="text-gray-600">Manage your existing plans and track progress</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cropPlans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{plan.cropName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {plan.region}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{plan.season}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                          {plan.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{plan.tasks.filter(t => t.completed).length}/{plan.tasks.length} tasks</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ 
                              width: plan.tasks.length > 0 ? `${(plan.tasks.filter(t => t.completed).length / plan.tasks.length) * 100}%` : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{plan.chatHistory.length} AI conversations</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Created {plan.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPlan(plan.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => continueChatWithPlan(plan.id)}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {cropPlans.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No crop plans yet.</p>
                    <p className="text-gray-400 mt-2">Create your first plan with AI assistance!</p>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create First Plan
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};