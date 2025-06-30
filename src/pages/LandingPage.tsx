import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Users, Mic, TrendingUp, ArrowRight, CheckCircle, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Real-time Market Intelligence',
      description: 'Get live crop prices, weather updates, and market trends'
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: 'AI Voice Assistant',
      description: 'Voice-accessible farming guidance in local languages'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Direct Market Access',
      description: 'Connect farmers directly with conscious consumers'
    }
  ];

  const testimonials = [
    {
      name: 'Raj Patel',
      role: 'Organic Farmer',
      content: 'FarmAid AI helped me increase my income by 40% through direct sales to consumers.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Consumer',
      content: 'I love getting fresh, organic produce directly from local farmers. The quality is amazing!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">FarmAid AI</h1>
            </div>
            <div className="space-x-4">
              <Link
                to="/login/farmer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Farmer Login
              </Link>
              <Link
                to="/login/consumer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Consumer Login
              </Link>
            </div>
            <a
  href="https://bolt.new/"
  target="_blank"
  rel="noopener noreferrer"
  className="ml-4 flex items-center"
  title="Built for Bolt Hackathon"
>
  <img
    src="/bolt_logo.png"
    alt="Bolt New"
    className="h-14 w-auto"
  />
</a>
          </div>
          
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bridging Farmers & Consumers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Voice-accessible platform providing real-time intelligence, transparency, 
            and direct market access for smallholder farmers and conscious consumers.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register/farmer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Join as Farmer</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/register/consumer"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Join as Consumer</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose FarmAid AI?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-12 py-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Sprout className="h-12 w-12 text-green-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">For Farmers</h3>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Real-time crop prices & weather</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>AI voice assistant in local languages</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Direct connection to consumers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span>Crop planning and disease diagnosis</span>
              </li>
            </ul>
            <div className="space-y-3">
              <Link
                to="/register/farmer"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors block text-center"
              >
                Start Farming Smarter
              </Link>
              <Link
                to="/login/farmer"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors block text-center"
              >
                Already a farmer? Sign in
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Users className="h-12 w-12 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">For Consumers</h3>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span>Fresh produce from local farmers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span>Complete traceability & transparency</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span>Support sustainable farming</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span>Demand-based ordering system</span>
              </li>
            </ul>
            <div className="space-y-3">
              <Link
                to="/register/consumer"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors block text-center"
              >
                Shop Fresh & Local
              </Link>
              <Link
                to="/login/consumer"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors block text-center"
              >
                Already a consumer? Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-green-400" />
              <h3 className="text-2xl font-bold">FarmAid AI</h3>
            </div>
            <p className="text-gray-400 mb-8">
              Empowering farmers and connecting communities through technology
            </p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};