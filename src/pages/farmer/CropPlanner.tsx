// import React, { useState } from 'react';
// import { FarmerHeader } from '../../components/farmer/FarmerHeader';
// import { Plus, Calendar, MapPin, Mic, Edit3, CheckCircle, MessageSquare, Send, Bot, User, Sparkles, Clock } from 'lucide-react';

// interface ChatMessage {
//   id: string;
//   text: string;
//   sender: 'user' | 'ai';
//   timestamp: Date;
// }

// interface CropPlan {
//   id: string;
//   cropName: string;
//   region: string;
//   season: string;
//   plantingDate: string;
//   harvestDate: string;
//   notes: string;
//   tasks: Task[];
//   status: 'planning' | 'planted' | 'growing' | 'harvested';
//   chatHistory: ChatMessage[];
//   createdAt: Date;
//   aiRecommendations: string[];
// }

// interface Task {
//   id: string;
//   title: string;
//   date: string;
//   completed: boolean;
//   type: 'planting' | 'watering' | 'fertilizing' | 'harvesting';
// }

// export const CropPlanner: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'create' | 'plans'>('create');
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
//   // Create Plan State
//   const [newPlan, setNewPlan] = useState({
//     cropName: '',
//     region: '',
//     season: '',
//     plantingDate: '',
//     notes: ''
//   });
  
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
//     {
//       id: '1',
//       text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ]);
  
//   const [inputMessage, setInputMessage] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isAiTyping, setIsAiTyping] = useState(false);

//   // Existing Plans State
//   const [cropPlans, setCropPlans] = useState<CropPlan[]>([
//     {
//       id: '1',
//       cropName: 'Tomatoes',
//       region: 'North Field',
//       season: 'Kharif 2024',
//       plantingDate: '2024-06-15',
//       harvestDate: '2024-09-15',
//       notes: 'Using hybrid variety for better yield',
//       status: 'growing',
//       createdAt: new Date('2024-06-10'),
//       aiRecommendations: [
//         'Consider drip irrigation for water efficiency',
//         'Apply organic compost 2 weeks before planting',
//         'Monitor for early blight during humid weather'
//       ],
//       chatHistory: [
//         {
//           id: '1',
//           text: 'I want to grow tomatoes in my north field',
//           sender: 'user',
//           timestamp: new Date('2024-06-10T10:00:00')
//         },
//         {
//           id: '2',
//           text: 'Excellent choice! Tomatoes are perfect for the Kharif season. For your north field, I recommend hybrid varieties like Arka Rakshak or Pusa Ruby. They have good disease resistance and yield potential.',
//           sender: 'ai',
//           timestamp: new Date('2024-06-10T10:01:00')
//         },
//         {
//           id: '3',
//           text: 'What about soil preparation?',
//           sender: 'user',
//           timestamp: new Date('2024-06-10T10:02:00')
//         },
//         {
//           id: '4',
//           text: 'For tomatoes, prepare the soil with organic compost (5-10 tons/hectare) and ensure good drainage. The ideal pH is 6.0-7.0. Add NPK fertilizer at the time of transplanting.',
//           sender: 'ai',
//           timestamp: new Date('2024-06-10T10:03:00')
//         }
//       ],
//       tasks: [
//         { id: '1', title: 'Prepare soil', date: '2024-06-10', completed: true, type: 'planting' },
//         { id: '2', title: 'Plant seeds', date: '2024-06-15', completed: true, type: 'planting' },
//         { id: '3', title: 'First watering', date: '2024-06-20', completed: true, type: 'watering' },
//         { id: '4', title: 'Apply fertilizer', date: '2024-07-01', completed: false, type: 'fertilizing' },
//       ]
//     },
//     {
//       id: '2',
//       cropName: 'Wheat',
//       region: 'South Field',
//       season: 'Rabi 2024-25',
//       plantingDate: '2024-11-15',
//       harvestDate: '2025-04-15',
//       notes: 'Planning for drought-resistant variety',
//       status: 'planning',
//       createdAt: new Date('2024-01-10'),
//       aiRecommendations: [
//         'Choose drought-resistant varieties like HD-2967',
//         'Ensure proper seed treatment before sowing',
//         'Plan for timely irrigation during critical growth stages'
//       ],
//       chatHistory: [
//         {
//           id: '1',
//           text: 'I need help planning wheat for the upcoming Rabi season',
//           sender: 'user',
//           timestamp: new Date('2024-01-10T14:00:00')
//         },
//         {
//           id: '2',
//           text: 'Great timing! For Rabi wheat, I recommend varieties like HD-2967 or PBW-343. Given the climate patterns, drought-resistant varieties would be ideal for your region.',
//           sender: 'ai',
//           timestamp: new Date('2024-01-10T14:01:00')
//         }
//       ],
//       tasks: []
//     }
//   ]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const userMessage: ChatMessage = {
//         id: Date.now().toString(),
//         text: inputMessage,
//         sender: 'user',
//         timestamp: new Date()
//       };

//       setChatMessages(prev => [...prev, userMessage]);
//       setInputMessage('');
//       setIsAiTyping(true);

//       // Simulate AI response
//       setTimeout(() => {
//         const aiResponse = generateAIResponse(inputMessage, newPlan);
//         const aiMessage: ChatMessage = {
//           id: (Date.now() + 1).toString(),
//           text: aiResponse,
//           sender: 'ai',
//           timestamp: new Date()
//         };
//         setChatMessages(prev => [...prev, aiMessage]);
//         setIsAiTyping(false);
//       }, 1500);
//     }
//   };

//   const generateAIResponse = (message: string, planData: any): string => {
//     const lowerMessage = message.toLowerCase();
    
//     if (lowerMessage.includes('tomato')) {
//       return 'Tomatoes are excellent for your region! I recommend hybrid varieties like Arka Rakshak for disease resistance. The ideal planting time is June-July for Kharif season. Would you like specific guidance on soil preparation or irrigation?';
//     } else if (lowerMessage.includes('wheat')) {
//       return 'For wheat cultivation, consider drought-resistant varieties like HD-2967 or PBW-343. November is the perfect time for sowing. Ensure proper seed treatment and plan for 4-5 irrigations during the growing period.';
//     } else if (lowerMessage.includes('soil') || lowerMessage.includes('preparation')) {
//       return 'Soil preparation is crucial! Add 5-10 tons of organic compost per hectare, ensure proper drainage, and maintain pH between 6.0-7.0. Deep plowing 2-3 weeks before planting helps with aeration.';
//     } else if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) {
//       return 'For efficient water management, I recommend drip irrigation. Water requirements vary by crop stage - more during flowering and fruit development. Monitor soil moisture at 6-inch depth.';
//     } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrition')) {
//       return 'Balanced nutrition is key! Use NPK fertilizers based on soil testing. For most crops, apply 50% nitrogen at planting and remaining in splits. Don\'t forget micronutrients like zinc and boron.';
//     } else {
//       return 'I understand your question. Based on your location and farming conditions, I can provide specific recommendations. Could you tell me more about your crop choice, field conditions, or specific challenges you\'re facing?';
//     }
//   };

//   const handleCreatePlan = () => {
//     if (newPlan.cropName && newPlan.region && newPlan.season) {
//       const plan: CropPlan = {
//         id: Date.now().toString(),
//         ...newPlan,
//         harvestDate: '',
//         status: 'planning',
//         tasks: [],
//         chatHistory: chatMessages,
//         createdAt: new Date(),
//         aiRecommendations: [
//           'Monitor weather conditions regularly',
//           'Ensure proper soil testing before planting',
//           'Plan for integrated pest management'
//         ]
//       };
//       setCropPlans([...cropPlans, plan]);
      
//       // Reset form and chat
//       setNewPlan({ cropName: '', region: '', season: '', plantingDate: '', notes: '' });
//       setChatMessages([{
//         id: '1',
//         text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
//         sender: 'ai',
//         timestamp: new Date()
//       }]);
      
//       // Switch to plans tab
//       setActiveTab('plans');
//     }
//   };

//   const handleMicToggle = () => {
//     setIsListening(!isListening);
//     // Voice recognition would be implemented here
//   };

//   const toggleTask = (planId: string, taskId: string) => {
//     setCropPlans(plans =>
//       plans.map(plan =>
//         plan.id === planId
//           ? {
//               ...plan,
//               tasks: plan.tasks.map(task =>
//                 task.id === taskId ? { ...task, completed: !task.completed } : task
//               )
//             }
//           : plan
//       )
//     );
//   };

//   const continueChatWithPlan = (planId: string) => {
//     const plan = cropPlans.find(p => p.id === planId);
//     if (plan) {
//       setChatMessages(plan.chatHistory);
//       setNewPlan({
//         cropName: plan.cropName,
//         region: plan.region,
//         season: plan.season,
//         plantingDate: plan.plantingDate,
//         notes: plan.notes
//       });
//       setActiveTab('create');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'planning':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'planted':
//         return 'bg-blue-100 text-blue-800';
//       case 'growing':
//         return 'bg-green-100 text-green-800';
//       case 'harvested':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <FarmerHeader />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Crop Planner</h2>
//           <p className="text-gray-600">Plan your crops with AI assistance and manage your farming schedule</p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('create')}
//               className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
//                 activeTab === 'create'
//                   ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <Sparkles className="h-5 w-5" />
//                 <span>Create Plan with AI</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveTab('plans')}
//               className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
//                 activeTab === 'plans'
//                   ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <Calendar className="h-5 w-5" />
//                 <span>My Plans ({cropPlans.length})</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Create Plan Tab */}
//         {activeTab === 'create' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Plan Form */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
//                 <Plus className="h-5 w-5 mr-2 text-green-600" />
//                 Create New Crop Plan
//               </h3>
            

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
//                   <input
//                     type="text"
//                     value={newPlan.cropName}
//                     onChange={(e) => setNewPlan({ ...newPlan, cropName: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="e.g., Tomatoes, Wheat, Rice"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Region/Field</label>
//                   <input
//                     type="text"
//                     value={newPlan.region}
//                     onChange={(e) => setNewPlan({ ...newPlan, region: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="e.g., North Field, Plot A"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
//                   <select
//                     value={newPlan.season}
//                     onChange={(e) => setNewPlan({ ...newPlan, season: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   >
//                     <option value="">Select Season</option>
//                     <option value="Kharif 2024">Kharif 2024</option>
//                     <option value="Rabi 2024-25">Rabi 2024-25</option>
//                     <option value="Zaid 2025">Zaid 2025</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
//                   <input
//                     type="date"
//                     value={newPlan.plantingDate}
//                     onChange={(e) => setNewPlan({ ...newPlan, plantingDate: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
//                   <textarea
//                     value={newPlan.notes}
//                     onChange={(e) => setNewPlan({ ...newPlan, notes: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     rows={3}
//                     placeholder="Add notes about variety, special care, etc."
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={handleCreatePlan}
//                 disabled={!newPlan.cropName || !newPlan.region || !newPlan.season}
//                 className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 <CheckCircle className="h-5 w-5" />
//                 <span>Save Plan with AI Chat</span>
//               </button>
//             </div>

//             {/* AI Chat Interface */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
//               <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
//                 <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                   <Bot className="h-5 w-5 mr-2 text-green-600" />
//                   AI Crop Assistant
//                 </h3>
//                 <p className="text-sm text-gray-600">Ask me anything about crop planning, soil preparation, or farming techniques</p>
//               </div>
              
//               <div className="flex-1 p-4 overflow-y-auto">
//                 <div className="space-y-4">
//                   {chatMessages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div className={`max-w-xs lg:max-w-md flex items-start space-x-2 ${
//                         message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//                       }`}>
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           message.sender === 'user' ? 'bg-green-600' : 'bg-blue-600'
//                         }`}>
//                           {message.sender === 'user' ? 
//                             <User className="h-4 w-4 text-white" /> : 
//                             <Bot className="h-4 w-4 text-white" />
//                           }
//                         </div>
//                         <div
//                           className={`px-4 py-2 rounded-lg ${
//                             message.sender === 'user'
//                               ? 'bg-green-600 text-white'
//                               : 'bg-gray-100 text-gray-800'
//                           }`}
//                         >
//                           <p className="text-sm">{message.text}</p>
//                           <p className={`text-xs mt-1 ${
//                             message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
//                           }`}>
//                             {message.timestamp.toLocaleTimeString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {isAiTyping && (
//                     <div className="flex justify-start">
//                       <div className="flex items-start space-x-2">
//                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
//                           <Bot className="h-4 w-4 text-white" />
//                         </div>
//                         <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="p-4 border-t border-gray-200">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={handleMicToggle}
//                     className={`p-2 rounded-lg transition-colors ${
//                       isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     <Mic className="h-5 w-5" />
//                   </button>
//                   <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     placeholder="Ask about crops, soil, irrigation, fertilizers..."
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!inputMessage.trim()}
//                     className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
//                   >
//                     <Send className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* My Plans Tab */}
//         {activeTab === 'plans' && (
//           <div>
//             {selectedPlan ? (
//               // Plan Detail View
//               <div>
//                 {(() => {
//                   const plan = cropPlans.find(p => p.id === selectedPlan);
//                   if (!plan) return null;
                  
//                   return (
//                     <div>
//                       <div className="flex items-center justify-between mb-6">
//                         <button
//                           onClick={() => setSelectedPlan(null)}
//                           className="text-green-600 hover:text-green-700 flex items-center space-x-2"
//                         >
//                           <span>← Back to Plans</span>
//                         </button>
//                         <button
//                           onClick={() => continueChatWithPlan(plan.id)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//                         >
//                           <MessageSquare className="h-4 w-4" />
//                           <span>Continue AI Chat</span>
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Plan Details */}
//                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                           <div className="flex justify-between items-start mb-4">
//                             <div>
//                               <h3 className="text-xl font-semibold text-gray-800">{plan.cropName}</h3>
//                               <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                                 <div className="flex items-center">
//                                   <MapPin className="h-4 w-4 mr-1" />
//                                   {plan.region}
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Calendar className="h-4 w-4 mr-1" />
//                                   {plan.season}
//                                 </div>
//                               </div>
//                             </div>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
//                               {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
//                             </span>
//                           </div>

//                           {plan.notes && (
//                             <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                               <p className="text-sm text-gray-700">{plan.notes}</p>
//                             </div>
//                           )}

//                           <div className="mb-4">
//                             <h4 className="font-medium text-gray-800 mb-3">AI Recommendations</h4>
//                             <div className="space-y-2">
//                               {plan.aiRecommendations.map((rec, index) => (
//                                 <div key={index} className="flex items-start space-x-2">
//                                   <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5" />
//                                   <p className="text-sm text-gray-700">{rec}</p>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           {plan.tasks.length > 0 && (
//                             <div className="mb-4">
//                               <h4 className="font-medium text-gray-800 mb-3">Tasks</h4>
//                               <div className="space-y-2">
//                                 {plan.tasks.map((task) => (
//                                   <div key={task.id} className="flex items-center space-x-3">
//                                     <button
//                                       onClick={() => toggleTask(plan.id, task.id)}
//                                       className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                                         task.completed
//                                           ? 'bg-green-500 border-green-500 text-white'
//                                           : 'border-gray-300 hover:border-green-500'
//                                       }`}
//                                     >
//                                       {task.completed && <CheckCircle className="h-3 w-3" />}
//                                     </button>
//                                     <div className="flex-1">
//                                       <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
//                                         {task.title}
//                                       </p>
//                                       <p className="text-xs text-gray-500">{task.date}</p>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Chat History */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                           <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
//                             <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                               <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
//                               AI Chat History
//                             </h3>
//                             <p className="text-sm text-gray-600">Your conversation about this crop plan</p>
//                           </div>
                          
//                           <div className="p-4 h-96 overflow-y-auto">
//                             <div className="space-y-4">
//                               {plan.chatHistory.map((message) => (
//                                 <div
//                                   key={message.id}
//                                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                                 >
//                                   <div className={`max-w-xs flex items-start space-x-2 ${
//                                     message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//                                   }`}>
//                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                                       message.sender === 'user' ? 'bg-green-600' : 'bg-blue-600'
//                                     }`}>
//                                       {message.sender === 'user' ? 
//                                         <User className="h-3 w-3 text-white" /> : 
//                                         <Bot className="h-3 w-3 text-white" />
//                                       }
//                                     </div>
//                                     <div
//                                       className={`px-3 py-2 rounded-lg ${
//                                         message.sender === 'user'
//                                           ? 'bg-green-600 text-white'
//                                           : 'bg-gray-100 text-gray-800'
//                                       }`}
//                                     >
//                                       <p className="text-xs">{message.text}</p>
//                                       <p className={`text-xs mt-1 opacity-70`}>
//                                         {message.timestamp.toLocaleTimeString()}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })()}
//               </div>
//             ) : (
//               // Plans Grid View
//               <div>
//                 <div className="mb-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Crop Plans</h3>
//                   <p className="text-gray-600">Manage your existing plans and track progress</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {cropPlans.map((plan) => (
//                     <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800">{plan.cropName}</h3>
//                           <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                             <div className="flex items-center">
//                               <MapPin className="h-4 w-4 mr-1" />
//                               {plan.region}
//                             </div>
//                           </div>
//                           <p className="text-xs text-gray-500 mt-1">{plan.season}</p>
//                         </div>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
//                           {plan.status}
//                         </span>
//                       </div>

//                       <div className="mb-4">
//                         <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                           <span>Progress</span>
//                           <span>{plan.tasks.filter(t => t.completed).length}/{plan.tasks.length} tasks</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-green-600 h-2 rounded-full" 
//                             style={{ 
//                               width: plan.tasks.length > 0 ? `${(plan.tasks.filter(t => t.completed).length / plan.tasks.length) * 100}%` : '0%' 
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div className="mb-4">
//                         <div className="flex items-center text-sm text-gray-600 mb-2">
//                           <MessageSquare className="h-4 w-4 mr-1" />
//                           <span>{plan.chatHistory.length} AI conversations</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Clock className="h-4 w-4 mr-1" />
//                           <span>Created {plan.createdAt.toLocaleDateString()}</span>
//                         </div>
//                       </div>

//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => setSelectedPlan(plan.id)}
//                           className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                         >
//                           View Details
//                         </button>
//                         <button
//                           onClick={() => continueChatWithPlan(plan.id)}
//                           className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
//                         >
//                           <MessageSquare className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {cropPlans.length === 0 && (
//                   <div className="text-center py-12">
//                     <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 text-lg">No crop plans yet.</p>
//                     <p className="text-gray-400 mt-2">Create your first plan with AI assistance!</p>
//                     <button
//                       onClick={() => setActiveTab('create')}
//                       className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//                     >
//                       Create First Plan
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Plus, Calendar, MapPin, Mic, Edit3, CheckCircle, MessageSquare, Send, Bot, User, Sparkles, Clock, Droplets, Thermometer, Wind, Sun, Cloud, CloudRain, Sprout, TrendingUp, AlertTriangle, DollarSign, Target, ChevronRight, ChevronLeft, Eye, Zap, Leaf, Bug, Scissors, Package, Upload, Camera } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  completed: boolean;
  cropId?: string;
  dueDate: string;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  cropId: string;
}

interface CropPlan {
  id: string;
  cropName: string;
  variety: string;
  fieldName: string;
  plantingDate: string;
  expectedHarvestDate: string;
  currentStage: 'planning' | 'sowing' | 'growing' | 'flowering' | 'harvesting' | 'completed';
  progress: number;
  estimatedProfit: number;
  totalExpenses: number;
  area: number;
  chatHistory: ChatMessage[];
  tasks: Task[];
  expenses: Expense[];
  image: string;
  healthStatus: 'excellent' | 'good' | 'warning' | 'critical';
  nextAction: string;
  createdAt: Date;
  aiRecommendations: string[];
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  soilMoisture: number;
  soilTemp: number;
}

interface RecommendedCrop {
  id: string;
  name: string;
  variety: string;
  timeToHarvest: number;
  estimatedEarnings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  seasonality: string;
  image: string;
  requiredInputs: string[];
}

export const CropPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'plans'>('plans');
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isListening, setIsListening] = useState(false);
  
  // Create Plan State
  const [newPlan, setNewPlan] = useState({
    cropName: '',
    variety: '',
    fieldName: '',
    area: 0,
    plantingDate: '',
    soilType: '',
    irrigationType: '',
    notes: ''
  });
  
  const [createPlanChatMessages, setCreatePlanChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const weather: WeatherData = {
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    soilMoisture: 75,
    soilTemp: 24
  };

  const todaysTasks: Task[] = [
    {
      id: '1',
      title: 'Water Tomato Field',
      description: 'Soil moisture is at 60%. Water early morning.',
      urgency: 'high',
      icon: <Droplets className="h-5 w-5" />,
      completed: false,
      cropId: '1',
      dueDate: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Check for Pests',
      description: 'Inspect wheat crop for fall armyworm',
      urgency: 'medium',
      icon: <Bug className="h-5 w-5" />,
      completed: false,
      cropId: '2',
      dueDate: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Apply Fertilizer',
      description: 'Second dose of NPK for rice crop',
      urgency: 'low',
      icon: <Leaf className="h-5 w-5" />,
      completed: true,
      cropId: '3',
      dueDate: new Date().toISOString()
    }
  ];

  const [cropPlans, setCropPlans] = useState<CropPlan[]>([
    {
      id: '1',
      cropName: 'Tomatoes',
      variety: 'Arka Rakshak',
      fieldName: 'North Field',
      plantingDate: '2024-06-15',
      expectedHarvestDate: '2024-09-15',
      currentStage: 'flowering',
      progress: 65,
      estimatedProfit: 45000,
      totalExpenses: 18000,
      area: 0.5,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      healthStatus: 'good',
      nextAction: 'Water and check for blight',
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
        {
          id: '1',
          title: 'Prepare soil',
          description: 'Add compost and prepare beds',
          urgency: 'high',
          icon: <Package className="h-4 w-4" />,
          completed: true,
          dueDate: '2024-06-10'
        },
        {
          id: '2',
          title: 'Plant seeds',
          description: 'Transplant seedlings',
          urgency: 'high',
          icon: <Sprout className="h-4 w-4" />,
          completed: true,
          dueDate: '2024-06-15'
        },
        {
          id: '3',
          title: 'First watering',
          description: 'Deep watering after transplant',
          urgency: 'medium',
          icon: <Droplets className="h-4 w-4" />,
          completed: true,
          dueDate: '2024-06-20'
        },
        {
          id: '4',
          title: 'Apply fertilizer',
          description: 'First dose of NPK',
          urgency: 'medium',
          icon: <Leaf className="h-4 w-4" />,
          completed: false,
          dueDate: '2024-07-01'
        }
      ],
      expenses: [
        {
          id: '1',
          date: '2024-06-15',
          category: 'Seeds',
          amount: 2500,
          description: 'Arka Rakshak tomato seeds',
          cropId: '1'
        },
        {
          id: '2',
          date: '2024-06-20',
          category: 'Fertilizer',
          amount: 3500,
          description: 'NPK fertilizer',
          cropId: '1'
        }
      ]
    },
    {
      id: '2',
      cropName: 'Wheat',
      variety: 'HD-2967',
      fieldName: 'South Field',
      plantingDate: '2024-11-15',
      expectedHarvestDate: '2025-04-15',
      currentStage: 'growing',
      progress: 35,
      estimatedProfit: 32000,
      totalExpenses: 12000,
      area: 1.0,
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
      healthStatus: 'excellent',
      nextAction: 'Apply second irrigation',
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
      tasks: [],
      expenses: []
    }
  ]);

  const recommendedCrops: RecommendedCrop[] = [
    {
      id: '1',
      name: 'Spinach',
      variety: 'Pusa Jyoti',
      timeToHarvest: 45,
      estimatedEarnings: 25000,
      difficulty: 'easy',
      seasonality: 'Winter',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      requiredInputs: ['Seeds', 'Organic compost', 'Water']
    },
    {
      id: '2',
      name: 'Carrots',
      variety: 'Nantes',
      timeToHarvest: 75,
      estimatedEarnings: 35000,
      difficulty: 'medium',
      seasonality: 'Winter',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      requiredInputs: ['Seeds', 'NPK fertilizer', 'Irrigation']
    },
    {
      id: '3',
      name: 'Cauliflower',
      variety: 'Snowball',
      timeToHarvest: 90,
      estimatedEarnings: 42000,
      difficulty: 'medium',
      seasonality: 'Winter',
      image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg',
      requiredInputs: ['Seeds', 'Organic manure', 'Pest control']
    }
  ];

  const handleCreatePlan = () => {
    if (newPlan.cropName && newPlan.fieldName && newPlan.area > 0) {
      const plan: CropPlan = {
        id: Date.now().toString(),
        cropName: newPlan.cropName,
        variety: newPlan.variety,
        fieldName: newPlan.fieldName,
        plantingDate: newPlan.plantingDate,
        expectedHarvestDate: '',
        currentStage: 'planning',
        progress: 0,
        estimatedProfit: 0,
        totalExpenses: 0,
        area: newPlan.area,
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
        healthStatus: 'good',
        nextAction: 'Complete soil preparation',
        createdAt: new Date(),
        aiRecommendations: [
          'Monitor weather conditions regularly',
          'Ensure proper soil testing before planting',
          'Plan for integrated pest management'
        ],
        chatHistory: createPlanChatMessages,
        tasks: [],
        expenses: []
      };
      setCropPlans([...cropPlans, plan]);
      
      // Reset form and chat
      setNewPlan({
        cropName: '',
        variety: '',
        fieldName: '',
        area: 0,
        plantingDate: '',
        soilType: '',
        irrigationType: '',
        notes: ''
      });
      setCreatePlanChatMessages([{
        id: '1',
        text: 'Hello! I\'m your AI crop planning assistant. I can help you create the perfect crop plan based on your location, season, and farming goals. What crop are you planning to grow?',
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      // Switch to plans tab
      setActiveTab('plans');
    }
  };

  const handleStartPlanWithAI = async () => {
  const context = `
The farmer has entered the following crop planning data:

- Crop Name: ${newPlan.cropName}
- Variety: ${newPlan.variety}
- Country: ${newPlan.fieldName}
- Area: ${newPlan.area} acres
- Planting Date: ${newPlan.plantingDate}
- Soil Type: ${newPlan.soilType}
- Irrigation Type: ${newPlan.irrigationType}
- Notes: ${newPlan.notes}

Using this, suggest a detailed crop plan with advice on:
1. Planting techniques
2. Fertilizer and irrigation schedules
3. Pest control
4. Estimated yield
5. Estimated Expenses and Profit
6. Any common risks and how to prevent them
`;

  setIsAiTyping(true);

  const res = await fetch("http://localhost:5000/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: "Please help generate a crop plan based on the above info.",
      context: context
    }),
  });

  const data = await res.json();

  setCreatePlanChatMessages((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      sender: "ai",
      text: data.response,
      timestamp: new Date(),
    },
  ]);
  setIsAiTyping(false);
};




  const handleSendCreatePlanMessage = async () => {
  if (!chatInput.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    sender: "user",
    text: chatInput,
    timestamp: new Date(),
  };

  setCreatePlanChatMessages((prev) => [...prev, userMessage]);
  setChatInput('');
  setIsAiTyping(true);

  try {
    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: chatInput,
        context: "" // ⛔️ if you always send empty context, assistant might not respond well
      }),
    });

    const data = await res.json();

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      text: data.response,
      timestamp: new Date(),
    };

    setCreatePlanChatMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error("Chat error:", err);
  } finally {
    setIsAiTyping(false);
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

  const continueChatWithPlan = (planId: string) => {
    const plan = cropPlans.find(p => p.id === planId);
    if (plan) {
      setSelectedCrop(planId);
      setShowAIChat(true);
    }
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'sowing': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'flowering': return 'bg-purple-100 text-purple-800';
      case 'harvesting': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleTask = (taskId: string) => {
    // Task toggle logic would go here
  };

  const handleMicToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const totalProfit = cropPlans.reduce((sum, crop) => sum + crop.estimatedProfit, 0);
  const totalExpenses = cropPlans.reduce((sum, crop) => sum + crop.totalExpenses, 0);
  const netProfit = totalProfit - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                  <input
                    type="text"
                    value={newPlan.variety}
                    onChange={(e) => setNewPlan({ ...newPlan, variety: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Arka Rakshak, HD-2967"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
                  <input
                    type="text"
                    value={newPlan.fieldName}
                    onChange={(e) => setNewPlan({ ...newPlan, fieldName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., North Field, Plot A"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area (acres)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newPlan.area}
                      onChange={(e) => setNewPlan({ ...newPlan, area: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.5"
                    />
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
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    value={newPlan.soilType}
                    onChange={(e) => setNewPlan({ ...newPlan, soilType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Soil Type</option>
                    <option value="clay">Clay</option>
                    <option value="loam">Loam</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                    <option value="black">Black Cotton</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Type</label>
                  <select
                    value={newPlan.irrigationType}
                    onChange={(e) => setNewPlan({ ...newPlan, irrigationType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Irrigation</option>
                    <option value="drip">Drip Irrigation</option>
                    <option value="sprinkler">Sprinkler</option>
                    <option value="flood">Flood Irrigation</option>
                    <option value="furrow">Furrow Irrigation</option>
                  </select>
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

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleStartPlanWithAI}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Bot className="h-5 w-5" />
                  <span>Start Plan with AI</span>
                </button>
                <button
                  onClick={handleCreatePlan}
                  disabled={!newPlan.cropName || !newPlan.fieldName || !newPlan.area}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Save Plan</span>
                </button>
              </div>
            </div>

            {/* AI Chat Interface */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[800px] w-[600px]">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-green-600" />
                  AI Crop Assistant
                </h3>
                <p className="text-sm text-gray-600">Ask me anything about crop planning, soil preparation, or farming techniques</p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {createPlanChatMessages.map((message) => (
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
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
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
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCreatePlanMessage()}
                    placeholder="Ask about crops, soil, irrigation, fertilizers..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendCreatePlanMessage}
                    disabled={!chatInput.trim()}
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
            {selectedCrop ? (
              // Plan Detail View
              <div>
                {(() => {
                  const plan = cropPlans.find(p => p.id === selectedCrop);
                  if (!plan) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => setSelectedCrop(null)}
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
                                  {plan.fieldName}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {plan.area} acres
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(plan.currentStage)}`}>
                              {plan.currentStage.charAt(0).toUpperCase() + plan.currentStage.slice(1)}
                            </span>
                          </div>

                          <div className="mb-4">
                            <img
                              src={plan.image}
                              alt={plan.cropName}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>

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
                                      onClick={() => toggleTask(task.id)}
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
                                      <p className="text-xs text-gray-500">{task.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {plan.expenses.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-800 mb-3">Expenses</h4>
                              <div className="space-y-2">
                                {plan.expenses.map((expense) => (
                                  <div key={expense.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{expense.category}</p>
                                      <p className="text-xs text-gray-600">{expense.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-bold text-red-600">₹{expense.amount}</p>
                                      <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
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
              // Plans Dashboard View
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left Column - Tasks & Crops */}
                <div className="xl:col-span-3 space-y-8">
                  {/* Today's Tasks */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Zap className="h-6 w-6 mr-2 text-orange-500" />
                        Today's Tasks
                      </h2>
                      <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                        {todaysTasks.filter(t => !t.completed).length} pending
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {todaysTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                            task.completed 
                              ? 'bg-gray-50 border-gray-200 opacity-60' 
                              : `border-2 ${getUrgencyColor(task.urgency)}`
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg ${
                              task.urgency === 'high' ? 'bg-red-100 text-red-600' :
                              task.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {task.icon}
                            </div>
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {task.completed && <CheckCircle className="h-4 w-4" />}
                            </button>
                          </div>
                          <h3 className={`font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                          </h3>
                          <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* My Crop Plans */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Sprout className="h-6 w-6 mr-2 text-green-600" />
                        My Crop Plans
                      </h2>
                      <button 
                        onClick={() => setActiveTab('create')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>New Plan</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cropPlans.map((crop) => (
                        <div
                          key={crop.id}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => setSelectedCrop(crop.id)}
                        >
                          <div className="relative mb-4">
                            <img
                              src={crop.image}
                              alt={crop.cropName}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(crop.currentStage)}`}>
                                {crop.currentStage}
                              </span>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getHealthStatusColor(crop.healthStatus)}`}>
                                <Target className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{crop.cropName}</h3>
                            <p className="text-sm text-gray-600">{crop.variety} • {crop.fieldName}</p>
                            <p className="text-sm text-gray-500">{crop.area} acres</p>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{crop.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full transition-all" 
                                style={{ width: `${crop.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Financial Summary */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-xs text-green-600 font-medium">Est. Profit</p>
                              <p className="text-sm font-bold text-green-800">₹{crop.estimatedProfit.toLocaleString()}</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <p className="text-xs text-red-600 font-medium">Expenses</p>
                              <p className="text-sm font-bold text-red-800">₹{crop.totalExpenses.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          {/* Next Action */}
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <p className="text-xs text-blue-600 font-medium mb-1">Next Action</p>
                            <p className="text-sm text-blue-800">{crop.nextAction}</p>
                          </div>
                          
                          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Crops to Plant Now */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                        Best Crops to Plant Now
                      </h2>
                      <p className="text-sm text-gray-600">AI Recommendations for Winter Season</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {recommendedCrops.map((crop) => (
                        <div key={crop.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                          
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{crop.name}</h3>
                            <p className="text-sm text-gray-600">{crop.variety}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getDifficultyColor(crop.difficulty)}`}>
                              {crop.difficulty}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                              <p className="text-xs text-gray-600">Harvest Time</p>
                              <p className="text-sm font-bold text-gray-800">{crop.timeToHarvest} days</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Est. Earnings</p>
                              <p className="text-sm font-bold text-green-600">₹{crop.estimatedEarnings.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-xs text-gray-600 mb-2">Required Inputs</p>
                            <div className="flex flex-wrap gap-1">
                              {crop.requiredInputs.map((input, index) => (
                                <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full border">
                                  {input}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              setNewPlan({ ...newPlan, cropName: crop.name, variety: crop.variety });
                              setActiveTab('create');
                            }}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Start Planning
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Calendar & Dashboard */}
                <div className="xl:col-span-1 space-y-6">
                  {/* Calendar View */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Farm Calendar</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((date, index) => {
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                        const hasTask = todaysTasks.some(task => 
                          new Date(task.dueDate).toDateString() === date.toDateString()
                        );
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(date)}
                            className={`p-2 text-xs rounded-lg transition-all relative ${
                              isToday 
                                ? 'bg-green-600 text-white font-bold' 
                                : isCurrentMonth 
                                  ? 'hover:bg-gray-100 text-gray-900' 
                                  : 'text-gray-400'
                            }`}
                          >
                            {date.getDate()}
                            {hasTask && (
                              <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expense Summary */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Financial Summary
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Total Est. Profit</p>
                        <p className="text-2xl font-bold text-green-800">₹{totalProfit.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-800">₹{totalExpenses.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Net Profit</p>
                        <p className="text-2xl font-bold text-blue-800">₹{netProfit.toLocaleString()}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Profit Margin</span>
                          <span>{totalProfit > 0 ? Math.round((netProfit / totalProfit) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${totalProfit > 0 ? Math.max(0, (netProfit / totalProfit) * 100) : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick AI Insights */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-blue-600" />
                      AI Insights
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-800">
                          🌡️ Weather is perfect for tomato flowering. Expect 15% yield increase.
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-800">
                          💰 Spinach prices up 20%. Consider expanding winter crop area.
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-yellow-200">
                        <p className="text-sm text-gray-800">
                          🐛 Pest alert: Monitor for aphids in next 3 days.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowAIChat(true)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Ask AI Assistant</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Chat Modal for Plans */}
        {showAIChat && selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Continue AI Chat</h3>
                      <p className="text-sm text-gray-600">
                        {cropPlans.find(p => p.id === selectedCrop)?.cropName} Plan Discussion
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIChat(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {cropPlans.find(p => p.id === selectedCrop)?.chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md flex items-start space-x-3 ${
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
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm text-gray-800">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl max-w-xs">
                        <p className="text-sm text-gray-800">
                          I'm here to help you with any questions about your {cropPlans.find(p => p.id === selectedCrop)?.cropName} crop. 
                          How can I assist you today?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCreatePlanMessage()}
                    placeholder="Ask about your crop, care tips, or any farming advice..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendCreatePlanMessage}
                    disabled={!chatInput.trim()}
                    className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-300"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};