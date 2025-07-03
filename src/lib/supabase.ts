import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eteiplyjfkccvutldynp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZWlwbHlqZmtjY3Z1dGxkeW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTExNzAsImV4cCI6MjA2Njg2NzE3MH0.Vq0-Cp5Dn073qBTc7EtcCz1lFLQJ0Vv-yOr50TDZ4LU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your schema
export interface FarmerProfile {
  id: string
  name: string
  phone_number: string
  description?: string
  location: string
  experience: number
  crops_to_grow?: string[]
  image?: string
  created_at?: string
  updated_at?: string
}

export interface ConsumerProfile {
  id: string
  phone_number: string
  location: string
  consumer_type: 'personal' | 'business'
  created_at?: string
  updated_at?: string
}

// Auth helper functions
export const authHelpers = {
  // Sign up farmer
  async signUpFarmer(data: {
    email: string 
    phone_number: string
    password: string
    name: string
    bio?: string
    farm_location: string
    experience: number
    crops_we_grow?: string[]
    profile_image?: string
  }) {
    try {
      // TODO: You might need to adjust this based on your auth setup
      // If using phone auth, you might need to use signInWithOtp instead
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email, // Temporary email if using email auth
        password: data.password,
        options: {
          data: {
            phone_number: data.phone_number,
            user_type: 'farmer'
          }
        }
      })

      if (authError) throw authError

      // Insert farmer profile
      const { data: profileData, error: profileError } = await supabase
        .from('farmers') // TODO: Replace 'farmers' with your actual table name
        .insert([{
          id: authData.user?.id,
          name: data.name,
          phone_number: data.phone_number,
          bio: data.bio,
          farm_location: data.farm_location,
          experience: data.experience,
          crops_we_grow: data.crops_we_grow,
          profile_image: data.profile_image,
        }])
        .select()
        .single()

      if (profileError) throw profileError

      return { user: authData.user, profile: profileData }
    } catch (error) {
      console.error('Farmer signup error:', error)
      throw error
    }
  },

  // Sign up consumer
  async signUpConsumer(data: {
    email: string // Temporary email if using email auth
    phone_number: string
    password: string
    location: string
    consumer_type: 'personal' | 'business'
  }) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
  email: data.email,
  password: data.password,
  options: {
    data: {
      phone_number: data.phone_number,
      user_type: 'consumer'
    }
  }
      })
if (authError) throw authError;

const userId = authData.user?.id;

if (!userId) {
  throw new Error('User ID not found after signup');
}

//       await supabase.from('user_profiles').insert([{
//   id: authData.user?.id,
//   phone_number: data.phone_number,
//   email: data.email,
//   user_type: 'consumer',
//   location: data.location,
// }]);



      // Insert consumer profile
      const { data: profileData, error: profileError } = await supabase
  .from('consumers')
  .insert([{
    id: authData.user?.id,   // <--- IMPORTANT: assign this
    phone_number: data.phone_number,
    location: data.location,
    consumer_type: data.consumer_type,
  }])
  .select()
  .single();



      if (profileError) throw profileError

      return { user: authData.user, profile: profileData }
    } catch (error) {
      console.error('Consumer signup error:', error)
      throw error
    }
  },



  // Sign in with phone and password
  async signIn(email: string, password: string) {
    try {
      // TODO: Adjust based on your auth method
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email, // If using email auth
        password: password
      })

      if (error) throw error

      // Get user profile based on user type
      const userType = data.user?.user_metadata?.user_type
      let profile = null

      if (userType === 'farmer') {
        const { data: farmerData } = await supabase
          .from('farmers') // TODO: Replace with your table name
          .select('*')
          .eq('id', data.user.id)
          .single()
        profile = farmerData
      } else if (userType === 'consumer') {
        const { data: consumerData } = await supabase
          .from('consumers') // TODO: Replace with your table name
          .select('*')
          .eq('id', data.user.id)
          .single()
        profile = consumerData
      }

      return { user: data.user, profile, userType }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}