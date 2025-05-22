import { API_ENDPOINTS, DEFAULT_SESSION_ID } from '../constants/api';

export const fetchProfile = async (nickname) => {
  const response = await fetch(API_ENDPOINTS.SHOW_PROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
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
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.success || !data.data?.page) {
    throw new Error('Invalid response format');
  }

  return data.data.page;
}; 