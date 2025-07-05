import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Award, 
  Calendar, 
  Sprout, 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  Bell,
  CheckCircle,
  TrendingUp,
  Package,
  Clock,
  Users,
  Camera,
  Eye,
  ShoppingCart
} from 'lucide-react';

interface CropPlan {
  id: string;
  cropName: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  area: number;
  status: 'planning' | 'planted' | 'growing' | 'harvesting' | 'completed';
  progress: number;
  estimatedYield: number;
  currentStage: string;
  nextTask: string;
  images: string[];
}

interface FarmerData {
  id: string;
  name: string;
  farmName: string;
  location: string;
  experience: number;
  farmSize: number;
  specialties: string[];
  certifications: string[];
  rating: number;
  totalReviews: number;
  avatar: string;
  coverImage: string;
  description: string;
  phone: string;
  cropsGrown: string[];
  farmingMethods: string[];
  totalSubscribers: number;
  totalOrders: number;
  responseTime: string;
  deliveryOptions: string[];
  priceRange: string;
  gallery: string[];
  achievements: string[];
  cropPlans: CropPlan[];
}

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productOrdered: string;
}

export const FarmerDashboard: React.FC = () => {
  const { farmerId } = useParams<{ farmerId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'crops' | 'reviews' | 'gallery'>('overview');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock farmer data - replace with actual API call
  const farmer: FarmerData = {
    id: farmerId || '1',
    name: 'Raj Patel',
    farmName: 'Green Valley Organic Farm',
    location: 'Pune, Maharashtra',
    experience: 15,
    farmSize: 5.5,
    specialties: ['Organic Vegetables', 'Seasonal Fruits', 'Herb Garden'],
    certifications: ['Organic Certified', 'Good Agricultural Practices', 'Fair Trade'],
    rating: 4.8,
    totalReviews: 127,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    coverImage: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
    description: 'Welcome to Green Valley Organic Farm! We are a third-generation farming family passionate about sustainable agriculture and providing the freshest, healthiest produce to our community.',
    phone: '+91 9876543210',
    cropsGrown: ['Tomatoes', 'Onions', 'Wheat', 'Rice', 'Leafy Greens', 'Carrots'],
    farmingMethods: ['organic', 'pesticide-free', 'sustainable'],
    totalSubscribers: 245,
    totalOrders: 1250,
    responseTime: '< 2 hours',
    deliveryOptions: ['Farm Pickup', 'Home Delivery', 'Local Market'],
    priceRange: '₹20-80/kg',
    gallery: [
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
    ],
    achievements: [
      'Best Organic Farmer 2023',
      'Sustainable Farming Award',
      '500+ Happy Customers',
      'Zero Pesticide Certification'
    ],
    cropPlans: [
      {
        id: '1',
        cropName: 'Tomatoes',
        variety: 'Arka Rakshak (Hybrid)',
        plantingDate: '2024-06-15',
        expectedHarvest: '2024-09-15',
        area: 1.2,
        status: 'growing',
        progress: 65,
        estimatedYield: 2400,
        currentStage: 'Flowering Stage',
        nextTask: 'Apply organic fertilizer',
        images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg']
      },
      {
        id: '2',
        cropName: 'Wheat',
        variety: 'HD-2967 (Drought Resistant)',
        plantingDate: '2024-11-15',
        expectedHarvest: '2025-04-15',
        area: 2.0,
        status: 'planning',
        progress: 10,
        estimatedYield: 4000,
        currentStage: 'Soil Preparation',
        nextTask: 'Complete field preparation',
        images: ['https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg']
      },
      {
        id: '3',
        cropName: 'Spinach',
        variety: 'All Green (Organic)',
        plantingDate: '2024-01-10',
        expectedHarvest: '2024-03-10',
        area: 0.5,
        status: 'completed',
        progress: 100,
        estimatedYield: 500,
        currentStage: 'Harvested',
        nextTask: 'Field preparation for next crop',
        images: ['https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg']
      }
    ]
  };

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 5,
      comment: 'Absolutely amazing quality! The tomatoes were so fresh and flavorful. You can really taste the difference with organic farming.',
      date: '2024-01-15',
      verified: true,
      productOrdered: 'Organic Tomatoes (5kg)'
    },
    {
      id: '2',
      customerName: 'Amit Kumar',
      customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 5,
      comment: 'Very reliable farmer. Always delivers on time with great produce. The vegetables stay fresh for days!',
      date: '2024-01-10',
      verified: true,
      productOrdered: 'Mixed Vegetables (10kg)'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'planted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'growing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'harvesting':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Calendar className="h-4 w-4" />;
      case 'planted':
        return <Sprout className="h-4 w-4" />;
      case 'growing':
        return <TrendingUp className="h-4 w-4" />;
      case 'harvesting':
        return <Package className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Farmers</span>
        </button>

        {/* Cover Image */}
        <div className="relative h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl overflow-hidden mb-8">
          <img
            src={farmer.coverImage}
            alt="Farm Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Farm Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{farmer.farmName}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {farmer.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {farmer.totalSubscribers} subscribers
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{farmer.name}</h2>
                <p className="text-gray-600">{farmer.experience} years of farming experience</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(farmer.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {farmer.rating} ({farmer.totalReviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-600">Response time: {farmer.responseTime}</span>
                  <span className="text-sm text-gray-600">Price range: {farmer.priceRange}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-3 rounded-lg transition-colors ${
                  isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  isSubscribed 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Bell className="h-4 w-4" />
                <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'crops', label: 'Crop Plans', icon: Sprout },
              { id: 'reviews', label: `Reviews (${farmer.totalReviews})`, icon: Star },
              { id: 'gallery', label: 'Gallery', icon: Camera }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Farm</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{farmer.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Specialties</h4>
                    <div className="space-y-2">
                      {farmer.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Farming Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {farmer.farmingMethods.map((method, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Crops Grown */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Crops Grown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {farmer.cropsGrown.map((crop, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
                    >
                      <span className="text-blue-800 font-medium">{crop}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {farmer.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Farm Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Farm Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm Size</span>
                    <span className="font-medium">{farmer.farmSize} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{farmer.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-medium">{farmer.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers</span>
                    <span className="font-medium">{farmer.totalSubscribers}</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
                <div className="space-y-3">
                  {farmer.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Delivery</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{farmer.phone}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Delivery Options</p>
                    <div className="space-y-1">
                      {farmer.deliveryOptions.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Order */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Order</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Order fresh produce directly from {farmer.name}
                </p>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Browse Products</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crops' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Crop Plans</h3>
              <p className="text-gray-600">Track the progress of {farmer.name}'s current and planned crops</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmer.cropPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{plan.cropName}</h3>
                      <p className="text-sm text-gray-600">{plan.variety}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(plan.status)}`}>
                      {getStatusIcon(plan.status)}
                      <span>{plan.status}</span>
                    </span>
                  </div>

                  <div className="mb-4">
                    <img
                      src={plan.images[0]}
                      alt={plan.cropName}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Area</span>
                      <span className="font-medium">{plan.area} acres</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Planted</span>
                      <span className="font-medium">{new Date(plan.plantingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected Harvest</span>
                      <span className="font-medium">{new Date(plan.expectedHarvest).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Est. Yield</span>
                      <span className="font-medium">{plan.estimatedYield} kg</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">Current Stage</p>
                    <p className="text-sm text-blue-700">{plan.currentStage}</p>
                    <p className="text-xs text-blue-600 mt-1">Next: {plan.nextTask}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
              <div className="text-right">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{farmer.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{farmer.totalReviews} reviews</p>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.customerAvatar}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-800">{review.customerName}</h4>
                          {review.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Product: </span>{review.productOrdered}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Farm Gallery</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmer.gallery.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Farm ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};