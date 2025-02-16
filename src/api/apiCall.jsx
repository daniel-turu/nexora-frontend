export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Define your API base URL here
// const API_BASE_URL = "http://192.168.17.39:7000";
const API_BASE_URL = window.location.origin;

export const API_Response = async (requestPart, method = 'GET', data = null, queryParams = null, auth = false) => {
    try {
        let url = `${API_BASE_URL}/${requestPart}`;

        // Add query parameters to the URL
        if (queryParams) {
            const queryString = new URLSearchParams(queryParams).toString();
            url += `?${queryString}`;
        }

        const headers = { 'Content-Type': 'application/json' };

        if (auth) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            } else {
                throw new Error('Authentication required, but no token found.');
            }
        }

        const options = {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        };

        if (method === 'GET' || method === 'HEAD') {
            delete options.body; // GET and HEAD requests shouldn't have a body
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPrincipalWelcomeMessage = async () => {
    try {
        return await API_Response('api/principal-message/', 'GET', null, null, false);
    } catch (error) {
        console.error('Error fetching principal welcome message:', error.message);
        throw error;
    }
};



export const getFooter = async () => {
    try {
        return await API_Response('api/footer/', 'GET', null, null, false);
    } catch (error) {
        console.error('Error fetching footer:', error.message);
        throw error;
    }
};



export const getEvents = async () => {
    try {
        return await API_Response('api/events/', 'GET', null, null, false);
    } catch (error) {
        console.error('Error fetching events:', error.message);
        throw error;
    }
};


export const getEventById = async (eventId) => {
    try {
        return await API_Response(`api/events/${eventId}/`, 'GET', null, null, false);
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error.message);
        throw error;
    }
};


export const getAcademicCalendar = async (month) => {
    try {
        return await API_Response(`api/academic-calendar/?month=${month}`, 'GET', null, null, false);
    } catch (error) {
      console.error("Failed to fetch academic calendar:", error);
      return [];
    }
  };
  


 
export const getCurriculums = async (month) => {
    try {
        return await API_Response(`api/curriculum-offers/`, 'GET', null, null, false);
    } catch (error) {
      console.error("Failed to fetch curriculum offers:", error);
      return [];
    }
  };
   



  export const getGallery = async () => {
    try {
        return await API_Response(`api/gallery/`, 'GET', null, null, false);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
      return [];
    }
  };
   


  export const getFAQs = async () => {
    try {
        return await API_Response(`api/faqs/`, 'GET', null, null, false);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
      return [];
    }
  };
   



export const getAbout = async () => {
    try {
        return await API_Response(`api/about/`, 'GET', null, null, false);
    } catch (error) {
        console.error("Failed to fetch about:", error);
        return [];
    }
};


export const postContact = async (contactData) => {
    try {
        return await API_Response(`api/contact/`, 'POST', contactData, null, false);
    } catch (error) {
        console.error("Failed to send contact message:", error);
        throw error;
    }
};



export const postSubscribe = async (Data) => {
    try {
        return await API_Response(`api/subscribe/`, 'POST', Data, null, false);
    } catch (error) {
        console.error("Failed to subscribe:", error);
        throw error;
    }
};
