// import React, { useState, useEffect } from 'react';
// import { FarmerHeader } from '../../components/farmer/FarmerHeader';
// import { Plus, Upload, MapPin, Calendar, MessageCircle, Phone, Eye, TrendingUp, Users, AlertCircle } from 'lucide-react';
// import { supabase } from '../../lib/supabase';
// import { useAuth } from '../../context/AuthContext';

// interface Product {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   price_per_unit: number;
//   available_date: string;
//   description: string;
//   images: string[];
//   organic: boolean;
//   pesticide_free: boolean;
//   delivery_options: string[];
//   location: string;
//   status: 'available' | 'sold' | 'reserved';
//   farmer_id: string;
//   created_at?: string;
// }

// interface DemandedProduct {
//   id: string;
//   cropName: string;
//   consumer: {
//     name: string;
//     location: string;
//     avatar: string;
//   };
//   quantity: number;
//   unit: string;
//   maxPrice: number;
//   requiredBy: string;
//   description: string;
//   preferences: string[];
//   responses: number;
//   distance: number;
//   urgency: 'high' | 'medium' | 'low';
//   createdAt: string;
// }

// export const ProductListing: React.FC = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState<'listings' | 'demands'>('listings');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [demandedProducts] = useState<DemandedProduct[]>([
//     {
//       id: '1',
//       cropName: 'Organic Tomatoes',
//       consumer: {
//         name: 'Priya Sharma',
//         location: 'Mumbai, Maharashtra',
//         avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
//       },
//       quantity: 50,
//       unit: 'kg',
//       maxPrice: 50,
//       requiredBy: '2024-01-25',
//       description: 'Looking for fresh organic tomatoes for my restaurant. Need consistent quality and regular supply.',
//       preferences: ['organic', 'pesticide-free'],
//       responses: 3,
//       distance: 45,
//       urgency: 'high',
//       createdAt: '2024-01-15'
//     },
//     {
//       id: '2',
//       cropName: 'Fresh Spinach',
//       consumer: {
//         name: 'Rajesh Kumar',
//         location: 'Pune, Maharashtra',
//         avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
//       },
//       quantity: 20,
//       unit: 'kg',
//       maxPrice: 30,
//       requiredBy: '2024-01-22',
//       description: 'Need fresh spinach for weekly family consumption. Prefer local farmers.',
//       preferences: ['local', 'pesticide-free'],
//       responses: 1,
//       distance: 12,
//       urgency: 'medium',
//       createdAt: '2024-01-12'
//     },
//     {
//       id: '3',
//       cropName: 'Organic Carrots',
//       consumer: {
//         name: 'Sunita Devi',
//         location: 'Nashik, Maharashtra',
//         avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
//       },
//       quantity: 100,
//       unit: 'kg',
//       maxPrice: 35,
//       requiredBy: '2024-01-30',
//       description: 'Bulk order for organic carrots for juice bar. Looking for consistent weekly supply.',
//       preferences: ['organic', 'bulk'],
//       responses: 0,
//       distance: 78,
//       urgency: 'low',
//       createdAt: '2024-01-10'
//     }
//   ]);

//   const [showNewListing, setShowNewListing] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     quantity: 0,
//     unit: 'kg',
//     price_per_unit: 0,
//     available_date: '',
//     description: '',
//     organic: false,
//     pesticide_free: false,
//     delivery_options: [] as string[],
//     images: [] as string[],
//     location: user?.location || ''
//   });

//   // Fetch listings from Supabase
//   const fetchListings = async () => {
//     if (!user?.id) return;
    
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('listings')
//         .select('*')
//         .eq('farmer_id', user.id)
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching listings:', error);
//         setError('Failed to load listings');
//       } else {
//         setProducts(data || []);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to load listings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, [user?.id]);

//   const handleCreateListing = async () => {
//     if (!user?.id) {
//       setError('User not authenticated');
//       return;
//     }

//     if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price_per_unit <= 0) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       const listingData = {
//         farmer_id: user.id,
//         name: newProduct.name,
//         quantity: newProduct.quantity,
//         unit: newProduct.unit,
//         price_per_unit: newProduct.price_per_unit,
//         available_date: newProduct.available_date,
//         description: newProduct.description,
//         organic: newProduct.organic,
//         pesticide_free: newProduct.pesticide_free,
//         delivery_options: newProduct.delivery_options,
//         location: user.location,
//         status: 'available',
//         images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'] // Default image
//       };

//       const { data, error } = await supabase
//         .from('listings')
//         .insert([listingData])
//         .select()
//         .single();

//       if (error) {
//         console.error('Error creating listing:', error);
//         setError('Failed to create listing: ' + error.message);
//       } else {
//         // Add the new listing to the local state
//         setProducts(prev => [data, ...prev]);
        
//         // Reset form
//         setNewProduct({
//           name: '',
//           quantity: 0,
//           unit: 'kg',
//           price_per_unit: 0,
//           available_date: '',
//           description: '',
//           organic: false,
//           pesticide_free: false,
//           delivery_options: [],
//           images: [],
//           location: user.location || ''
//         });
//         setShowNewListing(false);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to create listing');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeliveryOptionChange = (option: string) => {
//     setNewProduct(prev => ({
//       ...prev,
//       delivery_options: prev.delivery_options.includes(option)
//         ? prev.delivery_options.filter(o => o !== option)
//         : [...prev.delivery_options, option]
//     }));
//   };

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case 'high':
//         return 'bg-red-100 text-red-800 border-red-200';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'low':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getUrgencyIcon = (urgency: string) => {
//     switch (urgency) {
//       case 'high':
//         return <AlertCircle className="h-4 w-4" />;
//       case 'medium':
//         return <TrendingUp className="h-4 w-4" />;
//       case 'low':
//         return <Eye className="h-4 w-4" />;
//       default:
//         return <Eye className="h-4 w-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <FarmerHeader />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h2>
//             <p className="text-gray-600">Manage your listings and respond to consumer demands</p>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('listings')}
//               className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
//                 activeTab === 'listings'
//                   ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <Plus className="h-5 w-5" />
//                 <span>My Listings ({products.length})</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveTab('demands')}
//               className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
//                 activeTab === 'demands'
//                   ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <TrendingUp className="h-5 w-5" />
//                 <span>Demanded Products ({demandedProducts.length})</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Listings Tab */}
//         {activeTab === 'listings' && (
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-800">Your Product Listings</h3>
//               <button
//                 onClick={() => setShowNewListing(true)}
//                 className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//               >
//                 <Plus className="h-5 w-5" />
//                 <span>Add New Listing</span>
//               </button>
//             </div>

//             {/* New Listing Form */}
//             {showNewListing && (
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Listing</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
//                     <input
//                       type="text"
//                       value={newProduct.name}
//                       onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       placeholder="e.g., Fresh Tomatoes"
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-2">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//                       <input
//                         type="number"
//                         value={newProduct.quantity}
//                         onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
//                       <select
//                         value={newProduct.unit}
//                         onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       >
//                         <option value="kg">kg</option>
//                         <option value="quintal">quintal</option>
//                         <option value="ton">ton</option>
//                         <option value="piece">piece</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price per {newProduct.unit}</label>
//                     <input
//                       type="number"
//                       value={newProduct.price_per_unit}
//                       onChange={(e) => setNewProduct({ ...newProduct, price_per_unit: parseInt(e.target.value) || 0 })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       placeholder="₹"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Available Date</label>
//                     <input
//                       type="date"
//                       value={newProduct.available_date}
//                       onChange={(e) => setNewProduct({ ...newProduct, available_date: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     value={newProduct.description}
//                     onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     rows={3}
//                     placeholder="Describe your produce quality, variety, etc."
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
//                     <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={(e) => {
//                         const files = Array.from(e.target.files || []);
//                         const imageUrls = files.map(file => URL.createObjectURL(file));
//                         setNewProduct({ ...newProduct, images: imageUrls });
//                       }}
//                       className="hidden"
//                     />
//                     <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
//                     <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={newProduct.organic}
//                           onChange={(e) => setNewProduct({ ...newProduct, organic: e.target.checked })}
//                           className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Organic Certified</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={newProduct.pesticide_free}
//                           onChange={(e) => setNewProduct({ ...newProduct, pesticide_free: e.target.checked })}
//                           className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Pesticide-Free</span>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={newProduct.delivery_options.includes('pickup')}
//                           onChange={() => handleDeliveryOptionChange('pickup')}
//                           className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Farm Pickup</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={newProduct.delivery_options.includes('delivery')}
//                           onChange={() => handleDeliveryOptionChange('delivery')}
//                           className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Home Delivery</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={handleCreateListing}
//                     disabled={loading}
//                     className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
//                   >
//                     {loading ? 'Creating...' : 'Create Listing'}
//                   </button>
//                   <button
//                     onClick={() => setShowNewListing(false)}
//                     className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Product Listings Grid */}
//             {loading && products.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading your listings...</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                     <div className="relative">
//                       <img
//                         src={product.images[0] || 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'}
//                         alt={product.name}
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-4 right-4">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           product.status === 'available' ? 'bg-green-100 text-green-800' :
//                           product.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//                         <p className="text-lg font-bold text-green-600">₹{product.price_per_unit}/{product.unit}</p>
//                       </div>
                      
//                       <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {product.location}
//                       </div>
                      
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         Available: {new Date(product.available_date).toLocaleDateString()}
//                       </div>
                      
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {product.organic && (
//                           <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Organic</span>
//                         )}
//                         {product.pesticide_free && (
//                           <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pesticide-Free</span>
//                         )}
//                       </div>
                      
//                       <div className="text-sm text-gray-600 mb-4">
//                         <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
//                         <p><strong>Delivery:</strong> {product.delivery_options.join(', ')}</p>
//                       </div>
                      
//                       <div className="flex space-x-2">
//                         <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
//                           <MessageCircle className="h-4 w-4" />
//                           <span>Messages</span>
//                         </button>
//                         <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                           <Eye className="h-4 w-4" />
//                           <span>Views</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {!loading && products.length === 0 && (
//               <div className="text-center py-12">
//                 <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No listings yet.</p>
//                 <p className="text-gray-400 mt-2">Create your first listing to start selling!</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Demands Tab */}
//         {activeTab === 'demands' && (
//           <div>
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Products in Demand</h3>
//               <p className="text-gray-600">Respond to consumer requests and grow your business</p>
//             </div>

//             {/* Demand Statistics */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Total Demands</p>
//                     <p className="text-2xl font-bold text-gray-900">{demandedProducts.length}</p>
//                   </div>
//                   <TrendingUp className="h-8 w-8 text-blue-600" />
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">High Priority</p>
//                     <p className="text-2xl font-bold text-red-600">
//                       {demandedProducts.filter(d => d.urgency === 'high').length}
//                     </p>
//                   </div>
//                   <AlertCircle className="h-8 w-8 text-red-600" />
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Nearby Requests</p>
//                     <p className="text-2xl font-bold text-green-600">
//                       {demandedProducts.filter(d => d.distance < 50).length}
//                     </p>
//                   </div>
//                   <MapPin className="h-8 w-8 text-green-600" />
//                 </div>
//               </div>
//             </div>

//             {/* Demanded Products List */}
//             <div className="space-y-6">
//               {demandedProducts.map((demand) => (
//                 <div key={demand.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={demand.consumer.avatar}
//                         alt={demand.consumer.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800">{demand.cropName}</h3>
//                         <div className="flex items-center space-x-4 text-sm text-gray-600">
//                           <div className="flex items-center">
//                             <Users className="h-4 w-4 mr-1" />
//                             {demand.consumer.name}
//                           </div>
//                           <div className="flex items-center">
//                             <MapPin className="h-4 w-4 mr-1" />
//                             {demand.distance}km away
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getUrgencyColor(demand.urgency)}`}>
//                         {getUrgencyIcon(demand.urgency)}
//                         <span>{demand.urgency} priority</span>
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-gray-700 mb-4">{demand.description}</p>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Quantity Needed</p>
//                       <p className="text-gray-800">{demand.quantity} {demand.unit}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Max Price</p>
//                       <p className="text-gray-800 font-semibold text-green-600">₹{demand.maxPrice}/{demand.unit}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Required By</p>
//                       <div className="flex items-center text-gray-800">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         {new Date(demand.requiredBy).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Responses</p>
//                       <p className="text-gray-800">{demand.responses} farmers</p>
//                     </div>
//                   </div>

//                   {demand.preferences.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-sm font-medium text-gray-600 mb-2">Preferences</p>
//                       <div className="flex flex-wrap gap-2">
//                         {demand.preferences.map((preference) => (
//                           <span
//                             key={preference}
//                             className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                           >
//                             {preference}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-gray-500">
//                       Posted on {new Date(demand.createdAt).toLocaleDateString()}
//                     </p>
                    
//                     <div className="flex space-x-3">
//                       <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
//                         <MessageCircle className="h-4 w-4" />
//                         <span>Respond to Request</span>
//                       </button>
//                       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
//                         <Phone className="h-4 w-4" />
//                         <span>Contact</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {demandedProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No product demands at the moment.</p>
//                 <p className="text-gray-400 mt-2">Check back later for new consumer requests!</p>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Plus, Upload, MapPin, Calendar, MessageCircle, Phone, Eye, TrendingUp, Users, AlertCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  available_date: string;
  description: string;
  images: string[];
  organic: boolean;
  pesticide_free: boolean;
  delivery_options: string[];
  location: string;
  status: 'available' | 'sold' | 'reserved';
  farmer_id: string;
  created_at?: string;
}

interface DemandedProduct {
  id: string;
  cropName: string;
  consumer: {
    name: string;
    location: string;
    avatar: string;
  };
  quantity: number;
  unit: string;
  maxPrice: number;
  requiredBy: string;
  description: string;
  preferences: string[];
  responses: number;
  distance: number;
  urgency: 'high' | 'medium' | 'low';
  createdAt: string;
}

export const ProductListing: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'listings' | 'demands'>('listings');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [demandedProducts] = useState<DemandedProduct[]>([
    {
      id: '1',
      cropName: 'Organic Tomatoes',
      consumer: {
        name: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 50,
      unit: 'kg',
      maxPrice: 50,
      requiredBy: '2024-01-25',
      description: 'Looking for fresh organic tomatoes for my restaurant. Need consistent quality and regular supply.',
      preferences: ['organic', 'pesticide-free'],
      responses: 3,
      distance: 45,
      urgency: 'high',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      cropName: 'Fresh Spinach',
      consumer: {
        name: 'Rajesh Kumar',
        location: 'Pune, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 20,
      unit: 'kg',
      maxPrice: 30,
      requiredBy: '2024-01-22',
      description: 'Need fresh spinach for weekly family consumption. Prefer local farmers.',
      preferences: ['local', 'pesticide-free'],
      responses: 1,
      distance: 12,
      urgency: 'medium',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      cropName: 'Organic Carrots',
      consumer: {
        name: 'Sunita Devi',
        location: 'Nashik, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 100,
      unit: 'kg',
      maxPrice: 35,
      requiredBy: '2024-01-30',
      description: 'Bulk order for organic carrots for juice bar. Looking for consistent weekly supply.',
      preferences: ['organic', 'bulk'],
      responses: 0,
      distance: 78,
      urgency: 'low',
      createdAt: '2024-01-10'
    }
  ]);

  const [showNewListing, setShowNewListing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    unit: 'kg',
    price_per_unit: 0,
    available_date: '',
    description: '',
    organic: false,
    pesticide_free: false,
    delivery_options: [] as string[],
    images: [] as string[],
  });

  // Fetch listings from Supabase
  const fetchListings = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to load listings');
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.id]);

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError('');

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Add to images array
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, publicUrl]
      }));

    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image from list
  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleCreateListing = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price_per_unit <= 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const listingData = {
        farmer_id: user.id,
        name: newProduct.name,
        quantity: newProduct.quantity,
        unit: newProduct.unit,
        price_per_unit: newProduct.price_per_unit,
        available_date: newProduct.available_date,
        description: newProduct.description,
        organic: newProduct.organic,
        pesticide_free: newProduct.pesticide_free,
        delivery_options: newProduct.delivery_options,
        location: user.location || 'Pune, Maharashtra',
        status: 'available',
        images: newProduct.images.length > 0 ? newProduct.images : ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg']
      };

      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select()
        .single();

      if (error) {
        console.error('Error creating listing:', error);
        setError('Failed to create listing: ' + error.message);
      } else {
        // Add the new listing to the local state
        setProducts(prev => [data, ...prev]);
        
        // Reset form
        setNewProduct({
          name: '',
          quantity: 0,
          unit: 'kg',
          price_per_unit: 0,
          available_date: '',
          description: '',
          organic: false,
          pesticide_free: false,
          delivery_options: [],
          images: [],
        });
        setShowNewListing(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryOptionChange = (option: string) => {
    setNewProduct(prev => ({
      ...prev,
      delivery_options: prev.delivery_options.includes(option)
        ? prev.delivery_options.filter(o => o !== option)
        : [...prev.delivery_options, option]
    }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4" />;
      case 'low':
        return <Eye className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h2>
            <p className="text-gray-600">Manage your listings and respond to consumer demands</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>My Listings ({products.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('demands')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'demands'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Demanded Products ({demandedProducts.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Your Product Listings</h3>
              <button
                onClick={() => setShowNewListing(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Listing</span>
              </button>
            </div>

            {/* New Listing Form */}
            {showNewListing && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Listing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Fresh Tomatoes"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="kg">kg</option>
                        <option value="quintal">quintal</option>
                        <option value="ton">ton</option>
                        <option value="piece">piece</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per {newProduct.unit}</label>
                    <input
                      type="number"
                      value={newProduct.price_per_unit}
                      onChange={(e) => setNewProduct({ ...newProduct, price_per_unit: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="₹"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Date</label>
                    <input
                      type="date"
                      value={newProduct.available_date}
                      onChange={(e) => setNewProduct({ ...newProduct, available_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your produce quality, variety, etc."
                  />
                </div>

                {/* Image Upload Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                  
                  {/* Uploaded Images Preview */}
                  {newProduct.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer"
                  >
                    {uploadingImage ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-2"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.organic}
                          onChange={(e) => setNewProduct({ ...newProduct, organic: e.target.checked })}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Organic Certified</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.pesticide_free}
                          onChange={(e) => setNewProduct({ ...newProduct, pesticide_free: e.target.checked })}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pesticide-Free</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.delivery_options.includes('pickup')}
                          onChange={() => handleDeliveryOptionChange('pickup')}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Farm Pickup</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.delivery_options.includes('delivery')}
                          onChange={() => handleDeliveryOptionChange('delivery')}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Home Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleCreateListing}
                    disabled={loading || uploadingImage}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Listing'}
                  </button>
                  <button
                    onClick={() => setShowNewListing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Product Listings Grid */}
            {loading && products.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your listings...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.images[0] || 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'available' ? 'bg-green-100 text-green-800' :
                          product.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-lg font-bold text-green-600">₹{product.price_per_unit}/{product.unit}</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        Available: {new Date(product.available_date).toLocaleDateString()}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.organic && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Organic</span>
                        )}
                        {product.pesticide_free && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pesticide-Free</span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
                        <p><strong>Delivery:</strong> {product.delivery_options.join(', ')}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Messages</span>
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>Views</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No listings yet.</p>
                <p className="text-gray-400 mt-2">Create your first listing to start selling!</p>
              </div>
            )}
          </div>
        )}

        {/* Demands Tab */}
        {activeTab === 'demands' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Products in Demand</h3>
              <p className="text-gray-600">Respond to consumer requests and grow your business</p>
            </div>

            {/* Demand Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Demands</p>
                    <p className="text-2xl font-bold text-gray-900">{demandedProducts.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">
                      {demandedProducts.filter(d => d.urgency === 'high').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nearby Requests</p>
                    <p className="text-2xl font-bold text-green-600">
                      {demandedProducts.filter(d => d.distance < 50).length}
                    </p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Demanded Products List */}
            <div className="space-y-6">
              {demandedProducts.map((demand) => (
                <div key={demand.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={demand.consumer.avatar}
                        alt={demand.consumer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{demand.cropName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {demand.consumer.name}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {demand.distance}km away
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getUrgencyColor(demand.urgency)}`}>
                        {getUrgencyIcon(demand.urgency)}
                        <span>{demand.urgency} priority</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{demand.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quantity Needed</p>
                      <p className="text-gray-800">{demand.quantity} {demand.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Max Price</p>
                      <p className="text-gray-800 font-semibold text-green-600">₹{demand.maxPrice}/{demand.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Required By</p>
                      <div className="flex items-center text-gray-800">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(demand.requiredBy).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Responses</p>
                      <p className="text-gray-800">{demand.responses} farmers</p>
                    </div>
                  </div>

                  {demand.preferences.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {demand.preferences.map((preference) => (
                          <span
                            key={preference}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {preference}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Posted on {new Date(demand.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Respond to Request</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {demandedProducts.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No product demands at the moment.</p>
                <p className="text-gray-400 mt-2">Check back later for new consumer requests!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};