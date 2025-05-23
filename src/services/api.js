import { API_ENDPOINTS, DEFAULT_SESSION_ID } from '../constants/api';
import { mockProfileData } from '../constants/mockData';

export const fetchProfile = async (nickname) => {
  try {
    const response = await fetch(API_ENDPOINTS.SHOW_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        meta: {
          session_id: DEFAULT_SESSION_ID,
          cmd: "show_profile_me"
        },
        data: {
          nickname
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.data?.page) {
      throw new Error('Invalid response format');
    }

    return data.data.page;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return mockProfileData.data.page;
  }
}; 