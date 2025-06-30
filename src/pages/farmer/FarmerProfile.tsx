import React, { useState } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Edit3, MapPin, Calendar, Award, Star, Camera, Upload, Users, Bell, TrendingUp, MessageSquare, Eye, Share2, Heart, CheckCircle, Plus, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface FarmerBrand {
  farmName: string;
  tagline: string;
  name: string;
  location: string;
  farmType: string;
  cropsGrown: string[];
  organic: boolean;
  pesticideFree: boolean;
  story: string;
  experience: number;
  farmSize: number;
  certifications: string[];
  rating: number;
  totalReviews: number;
  avatar: string;
  coverImage: string;
  galleryImages: string[];
  socialLinks: {
    website?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  achievements: string[];
  specialties: string[];
}

interface Subscriber {
  id: string;
  name: string;
  avatar: string;
  location: string;
  subscribedDate: string;
  type: 'consumer' | 'business';
  totalOrders: number;
}

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
  productOrdered: string;
}

export const FarmerProfile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'subscribers' | 'reviews' | 'gallery' | 'analytics'>('overview');
  
  const [brand, setBrand] = useState<FarmerBrand>({
    farmName: 'Green Valley Organic Farm',
    tagline: 'Fresh, Organic, Sustainable',
    name: user?.name || 'Raj Patel',
    location: user?.location || 'Pune, Maharashtra',
    farmType: 'Organic Mixed Farming',
    cropsGrown: ['Tomatoes', 'Onions', 'Wheat', 'Rice', 'Leafy Greens', 'Carrots'],
    organic: true,
    pesticideFree: true,
    story: 'Welcome to Green Valley Organic Farm! We are a third-generation farming family passionate about sustainable agriculture and providing the freshest, healthiest produce to our community. Our farm has been certified organic for over 10 years, and we specialize in growing a variety of seasonal vegetables and grains using traditional methods combined with modern sustainable practices.',
    experience: 15,
    farmSize: 5.5,
    certifications: ['Organic Certified', 'Good Agricultural Practices', 'Fair Trade Certified'],
    rating: 4.8,
    totalReviews: 127,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    coverImage: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
    ],
    socialLinks: {
      website: 'www.greenvalleyfarm.com',
      facebook: 'greenvalleyfarm',
      instagram: '@greenvalley_organic'
    },
    achievements: [
      'Best Organic Farmer 2023',
      'Sustainable Farming Award',
      '500+ Happy Customers',
      'Zero Pesticide Certification'
    ],
    specialties: ['Organic Vegetables', 'Seasonal Fruits', 'Herb Garden', 'Sustainable Practices']
  });

  const [editForm, setEditForm] = useState(brand);

  const subscribers: Subscriber[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      location: 'Mumbai, Maharashtra',
      subscribedDate: '2024-01-15',
      type: 'consumer',
      totalOrders: 12
    },
    {
      id: '2',
      name: 'Fresh Market Co.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      location: 'Pune, Maharashtra',
      subscribedDate: '2024-01-10',
      type: 'business',
      totalOrders: 45
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      location: 'Nashik, Maharashtra',
      subscribedDate: '2024-01-08',
      type: 'consumer',
      totalOrders: 8
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 5,
      comment: 'Absolutely amazing quality! The tomatoes were so fresh and flavorful. You can really taste the difference with organic farming. Will definitely order again!',
      date: '2024-01-15',
      verified: true,
      images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'],
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
    },
    {
      id: '3',
      customerName: 'Sunita Devi',
      customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      rating: 4,
      comment: 'Good quality vegetables. The farm visit was educational and the kids loved it. Great to see sustainable farming practices.',
      date: '2024-01-08',
      verified: true,
      productOrdered: 'Farm Visit + Vegetables'
    }
  ];

  const analytics = {
    totalSubscribers: subscribers.length,
    monthlyGrowth: 15,
    totalViews: 2847,
    engagementRate: 8.5,
    topProducts: ['Organic Tomatoes', 'Fresh Spinach', 'Mixed Vegetables'],
    revenueGrowth: 23
  };

  const handleSave = () => {
    setBrand(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(brand);
    setIsEditing(false);
  };

  const handleImageUpload = (type: 'avatar' | 'cover' | 'gallery') => {
    // Image upload logic would go here
    console.log(`Upload ${type} image`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image */}
        <div className="relative h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl overflow-hidden mb-8">
          <img
            src={brand.coverImage}
            alt="Farm Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Farm Brand Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{brand.farmName}</h1>
            <p className="text-lg opacity-90">{brand.tagline}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {brand.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {analytics.totalSubscribers} subscribers
              </div>
            </div>
          </div>
          
          {isEditing && (
            <button 
              onClick={() => handleImageUpload('cover')}
              className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors"
            >
              <Camera className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={brand.avatar}
                  alt={brand.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button 
                    onClick={() => handleImageUpload('avatar')}
                    className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{brand.name}</h2>
                <p className="text-gray-600">{brand.farmType}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(brand.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {brand.rating} ({brand.totalReviews} reviews)
                  </span>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center space-x-3 mt-2">
                  {brand.socialLinks.website && (
                    <a href={`https://${brand.socialLinks.website}`} className="text-blue-600 hover:text-blue-700">
                      <Share2 className="h-4 w-4" />
                    </a>
                  )}
                  <button className="text-gray-600 hover:text-gray-700">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Brand'}</span>
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'subscribers', label: `Subscribers (${analytics.totalSubscribers})`, icon: Users },
              { id: 'reviews', label: `Reviews (${brand.totalReviews})`, icon: Star },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About Our Farm</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                      <input
                        type="text"
                        value={editForm.farmName}
                        onChange={(e) => setEditForm({ ...editForm, farmName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                      <input
                        type="text"
                        value={editForm.tagline}
                        onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Story</label>
                      <textarea
                        value={editForm.story}
                        onChange={(e) => setEditForm({ ...editForm, story: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={6}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{brand.story}</p>
                )}
              </div>

              {/* Specialties & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Specialties</h3>
                  <div className="space-y-3">
                    {brand.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                  <div className="space-y-3">
                    {brand.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crops Grown */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Crops We Grow</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {brand.cropsGrown.map((crop, index) => (
                    <div
                      key={index}
                      className="bg-green-50 border border-green-200 rounded-lg p-3 text-center"
                    >
                      <span className="text-green-800 font-medium">{crop}</span>
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
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{brand.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm Size</span>
                    <span className="font-medium">{brand.farmSize} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers</span>
                    <span className="font-medium">{analytics.totalSubscribers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium">{brand.totalReviews}</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
                <div className="space-y-3">
                  {brand.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Organic Farming</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Pesticide-Free</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  {brand.socialLinks.website && (
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-blue-600" />
                      <a href={`https://${brand.socialLinks.website}`} className="text-sm text-blue-600 hover:text-blue-700">
                        {brand.socialLinks.website}
                      </a>
                    </div>
                  )}
                  {brand.socialLinks.facebook && (
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Facebook: {brand.socialLinks.facebook}</span>
                    </div>
                  )}
                  {brand.socialLinks.instagram && (
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-pink-600" />
                      <span className="text-sm text-gray-700">Instagram: {brand.socialLinks.instagram}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Subscribers</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {analytics.monthlyGrowth}% growth this month
                </span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Export List
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={subscriber.avatar}
                      alt={subscriber.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{subscriber.name}</h4>
                      <p className="text-sm text-gray-600">{subscriber.location}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.type === 'business' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {subscriber.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Subscribed: {new Date(subscriber.subscribedDate).toLocaleDateString()}</p>
                    <p>Total Orders: {subscriber.totalOrders}</p>
                  </div>
                  
                  <button className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{brand.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{brand.totalReviews} reviews</p>
                </div>
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
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Product: </span>{review.productOrdered}
                  </div>

                  {review.images && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Farm Gallery</h3>
              <button 
                onClick={() => handleImageUpload('gallery')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Photos</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.galleryImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Farm ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="h-4 w-4 text-gray-700" />
                      </button>
                      {isEditing && (
                        <button className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors">
                          <span className="text-white text-sm">×</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add New Photo Card */}
              <div 
                onClick={() => handleImageUpload('gallery')}
                className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Add New Photo</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscribers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+{analytics.monthlyGrowth}%</span>
                  <span className="text-gray-500 ml-1">this month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalViews}</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.engagementRate}%</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+5%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue Growth</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.revenueGrowth}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+{analytics.revenueGrowth}%</span>
                  <span className="text-gray-500 ml-1">this quarter</span>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Products</h3>
              <div className="space-y-3">
                {analytics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{product}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(3 - index) * 30 + 40}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{(3 - index) * 30 + 40}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save/Cancel Buttons for Edit Mode */}
        {isEditing && (
          <div className="fixed bottom-8 right-8 flex space-x-3 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </main>
    </div>
  );
};