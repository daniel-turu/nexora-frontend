import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEventById } from '../api/apiCall';
import { useNavigation } from '../Context/NavigationContext';

export const SingleEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!eventId) return <p className="text-center text-gray-500">Invalid event.</p>;
  if (loading) return <p className="text-center text-gray-500">Loading event...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="container mx-auto px-5 py-16 text-gray-800 ">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="max-w-3xl  mt-20 mx-auto bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden"
      >
        {/* Event Image */}
        <img
          className="w-full h-72 object-cover"
          src={event.display_picture || "https://dummyimage.com/720x400"}
          alt={event.title}
        />

        {/* Event Content */}
        <div className="p-8">
          <span className="inline-block text-sm font-medium text-indigo-600 uppercase tracking-wide">{event.type}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 my-3">{event.title}</h1>
          <p className="text-gray-600 text-sm mb-6">📅 {event.date}</p>
          
          <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: event.description }} />

          {/* Optional Images Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.optional_image_1 && (
              <motion.img 
                whileHover={{ scale: 1.05 }} 
                className="w-full h-40 object-cover rounded-lg shadow-md transition"
                src={event.optional_image_1}
                alt="Optional 1"
              />
            )}
            {event.optional_image_2 && (
              <motion.img 
                whileHover={{ scale: 1.05 }} 
                className="w-full h-40 object-cover rounded-lg shadow-md transition"
                src={event.optional_image_2}
                alt="Optional 2"
              />
            )}
            {event.optional_image_3 && (
              <motion.img 
                whileHover={{ scale: 1.05 }} 
                className="w-full h-40 object-cover rounded-lg shadow-md transition"
                src={event.optional_image_3}
                alt="Optional 3"
              />
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-[#0a2240] text-white rounded-lg font-medium hover:bg-red-600 transition"
              onClick={() => goBack("EventDetail")}
            >
              ⬅ Back to Events
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
