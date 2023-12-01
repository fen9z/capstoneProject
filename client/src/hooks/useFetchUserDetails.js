import { useEffect, useState } from 'react';

const useFetchUserDetails = (token) => {
  // console.log(token);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user/userInfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userDetailsData = await response.json();
        setUserDetails(userDetailsData);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  // return user details
  return userDetails;
};

export default useFetchUserDetails;
