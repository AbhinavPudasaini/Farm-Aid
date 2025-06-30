import React, {useEffect,  useState, useRef } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Mic, MicOff, Volume2, Send, Upload, Bot, User, Cloud, Sun, CloudRain, TrendingUp, TrendingDown, AlertTriangle, Award, Lightbulb, MessageSquare, FileText, Camera } from 'lucide-react';
import AIAssistant from "../../components/AIAssistant";
import ReactMarkdown from 'react-markdown';
// import useSpeechToText from '../../hooks/useSpeechToText'; // adjust path if needed



interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  hasFile?: boolean;
  fileName?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

interface MarketPrice {
  crop: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
}

interface NewsAlert {
  id: string;
  type: 'warning' | 'subsidy' | 'info';
  title: string;
  time: string;
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you today? You can ask me about crops, weather, market prices, or upload images for crop disease diagnosis.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);


  const weather: WeatherData = {
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    location: 'Pune, Maharashtra'
  };

  const marketPrices: MarketPrice[] = [
    { crop: 'Tomatoes', price: 45, change: 5.2, trend: 'up' },
    { crop: 'Onions', price: 32, change: -2.1, trend: 'down' },
    { crop: 'Wheat', price: 28, change: 3.8, trend: 'up' },
    { crop: 'Rice', price: 42, change: -1.5, trend: 'down' }
  ];

  const newsAlerts: NewsAlert[] = [
    { id: '1', type: 'subsidy', title: 'New Crop Insurance Scheme Available', time: '2h ago' },
    { id: '2', type: 'warning', title: 'Pest Alert: Fall Armyworm Detected', time: '4h ago' },
    { id: '3', type: 'info', title: 'Weather Advisory: Light Rain Expected', time: '6h ago' }
  ];

  const quickQuestions = [
    'What should I grow this season?',
    'How to treat tomato blight?',
    'What is today\'s market price?',
    'When should I water my crops?',
    'How to apply for crop insurance?',
    'What fertilizer for wheat?',
    'Best time to harvest rice?',
    'How to prevent pest attacks?'
  ];

  const farmingTips = [
    'Water your crops early morning for better absorption',
    'Rotate crops to maintain soil health',
    'Use organic compost to improve soil fertility',
    'Monitor weather forecasts for irrigation planning',
    'Keep farm records for better decision making'
  ];

  const sendMessage = async (input: string) => {
  const userMsg: Message = {
    id: Date.now().toString(),
    text: input,
    sender: 'user',
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMsg]);
  setIsAiTyping(true);

  try {
    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        context: "You are a helpful farming assistant. Provide simple, localized advice for farmers."
      }),
    });

    const data = await res.json();

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response,
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);

    // Speak the AI's response aloud
    await speak(data.response);

  } catch (error) {
    console.error("AI Error:", error);
  } finally {
    setIsAiTyping(false);
  }
};

useEffect(() => {
  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log("🎤 User said:", transcript);
      handlePromptSend(transcript); // Send voice input to AI
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  } else {
    console.warn("Speech Recognition not supported in this browser.");
  }
}, []);



  const handleMicToggle = () => {
  if (isListening) {
    recognitionRef.current?.stop();
    setIsListening(false);
  } else {
    recognitionRef.current?.start();
    setIsListening(true);
  }
};

const handlePromptSend = async (prompt: string) => {
  if (!prompt.trim()) return;

  const newUserMessage = {
    id: Date.now().toString(),
    text: prompt,
    sender: "user",
    timestamp: new Date()
  };

  setMessages((prev) => [...prev, newUserMessage]);
  setIsAiTyping(true);

  try {
    // ✅ Use full backend URL for local development
    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    const aiMessage = {
      id: Date.now().toString() + "_ai",
      sender: "ai",
      text: data.response || "⚠️ No response from AI.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    if (data.response && data.response.trim()) {
      speak(data.response); // ✅ Speak as well
}
  } catch (err) {
    console.error("❌ Error communicating with AI:", err);
  } finally {
    setIsAiTyping(false);
  }
};




  const handleQuestionSelect = (question: string) => {
    sendMessage(question);
  };

const speak = async (text: string) => {
  if (!text || !text.trim()) {
    console.warn("TTS skipped: empty text");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("TTS API failed");
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("TTS API failed", err);
  }
};




  const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputText,
    sender: 'user',
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);

  setIsAiTyping(true);

  try {
    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: inputText,
      }),
    });

    const data = await res.json();

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    // Speak the AI's response aloud
    await speak(data.response);

  } catch (error) {
    console.error("AI Error:", error);
  } finally {
    setIsAiTyping(false);
    setInputText('');
  }
};





  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `Uploaded image: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        hasFile: true,
        fileName: file.name
      };

      setMessages(prev => [...prev, userMessage]);
      setIsAiTyping(true);

      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I can see the image you uploaded. Based on the symptoms visible, this appears to be early blight on tomato leaves. I recommend removing affected leaves, improving air circulation, and applying copper-based fungicide. Would you like specific treatment recommendations?',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsAiTyping(false);
      }, 2000);
    }
  };

  const getAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'What should I grow this season?': 'Based on your location in Pune and current market trends, I recommend growing tomatoes, onions, and leafy greens. The weather conditions are favorable, and market prices are showing good demand for these crops. Tomatoes are particularly profitable right now with prices at ₹45/kg.',
      'How to treat tomato blight?': 'For tomato blight, remove affected leaves immediately, improve air circulation, avoid overhead watering, and apply copper-based fungicide. Ensure proper spacing between plants and consider resistant varieties for future planting.',
      'What is today\'s market price?': 'Current market prices in Pune: Tomatoes ₹45/kg (↑5.2%), Onions ₹32/kg (↓2.1%), Wheat ₹28/kg (↑3.8%), Rice ₹42/kg (↓1.5%). Tomatoes are showing strong upward trend.',
      'When should I water my crops?': 'Water early morning (6-8 AM) or late evening (6-8 PM) to minimize evaporation. Check soil moisture 2-3 inches deep. Most crops need 1-2 inches of water per week. Avoid watering during hot midday hours.',
      'How to apply for crop insurance?': 'Visit your nearest bank or Common Service Center with Aadhaar, land records, bank passbook, and sowing certificate. Premium deadline is usually 2 weeks after sowing. The new scheme offers 80% premium subsidy.',
      'What fertilizer for wheat?': 'For wheat, use NPK 12:32:16 at sowing (100kg/acre), followed by urea (50kg/acre) at first irrigation, and another urea dose (25kg/acre) at second irrigation. Ensure soil testing for precise recommendations.'
    };

    return responses[question] || 'I understand your question. Let me provide you with the most relevant information based on current conditions and best farming practices in your area. Could you provide more specific details about your situation?';
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'subsidy': return <Award className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Farming Assistant</h2>
          <p className="text-gray-600">Get instant answers about farming, weather, and market insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Weather & Market */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Weather Today</h3>
                {getWeatherIcon()}
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
                <p className="text-gray-600 capitalize">{weather.condition}</p>
                <p className="text-sm text-gray-500">{weather.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-medium">{weather.humidity}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wind Speed</span>
                  <span className="font-medium">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            {/* Market Prices */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Market Prices</h3>
              <div className="space-y-3">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{item.crop}</p>
                      <p className="text-sm text-gray-600">₹{item.price}/kg</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(item.trend)}
                      <span className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News Alerts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Alerts</h3>
              <div className="space-y-3">
                {newsAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[700px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">FarmAid AI Assistant</h3>
                      <p className="text-sm text-gray-600">Online • Ready to help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                      <Volume2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((msg) => (
  <div key={msg.id} className={`my-2 ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}>
    <div className={`p-3 rounded ${msg.sender === 'ai' ? 'bg-green-100' : 'bg-blue-100'}`}>
      {msg.sender === 'ai' ? (
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      ) : (
        msg.text
      )}
    </div>
  </div>
))}
                  
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 px-4 py-3 rounded-2xl">
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
              
              {/* Chat Input */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <div className="flex items-center space-x-3 mb-3">
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

                  
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about crops, weather, diseases, or upload an image..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleFileUpload}
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-300"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  {isListening ? 'Listening... Speak now' : 'Press mic to speak or type your question'}
                </p>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Right Sidebar - Quick Questions & Tips */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                Quick Questions
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect(question)}
                    className="w-full text-left p-3 rounded-lg text-sm border border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-800 transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Farming Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-sm border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                Daily Tips
              </h3>
              <div className="space-y-3">
                {farmingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white bg-opacity-60 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                How to Use
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <p>Click the mic button to ask questions with voice</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <p>Upload crop images for disease diagnosis</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <p>Use quick questions for instant answers</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <p>Check weather and prices in the sidebar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}