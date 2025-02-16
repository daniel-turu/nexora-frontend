import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/apiCall';
import { truncateMessage } from './Utils';
import { useNavigation } from '../Context/NavigationContext';

export const EventNews = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="relative text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {events.length > 0 ? (
            events.slice(0, 3).map(event => (
              <div key={event.id} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img 
                    className="lg:h-48 md:h-36 w-full object-cover object-center" 
                    src={event.display_picture || "https://dummyimage.com/720x400"} 
                    alt={event.title} 
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {event.type}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {event.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                    
                        
                      {event.description.length > 115 
                        ? truncateMessage(event.description).substring(0, 115) + "..."
                        : truncateMessage(event.description)}
                    </p>
                    <div className="flex items-center flex-wrap">
                    <a
                        onClick={() => navigate("EventDetail", { id: event.id })}
                        className="text-[#0a2240] inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                        >
                        See More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                      <span className="text-[#0a2240] inline-flex items-center leading-none text-sm ml-auto">
                        📅 {event.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No events available.</p>
          )}
        </div>
      </div>
    </section>
  );
};
