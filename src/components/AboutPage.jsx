import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAbout } from '../api/apiCall';  // Import the getAbout function
import { BackBottomCenter } from './BackBottomCenter';
import { BackTopLeft } from './BackTopLeft';

export const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);  // This will hold the AboutPage content
  const [isLoading, setIsLoading] = useState(true);  // This will handle the loading state

  useEffect(() => {
    // Fetch AboutPage data from API
    const fetchAboutPage = async () => {
      const data = await getAbout();  // Get the AboutPage data
      setAboutData(data);  // Set the data
      setIsLoading(false);  // Update loading state
    };

    fetchAboutPage();  // Call the function to fetch data
  }, []);

  return (
    <div className="max-w-4xl mx-auto">

        <div className='py-16' />

        <BackTopLeft />
        
        <motion.h2
          className="text-3xl font-extrabold text-center text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>

        {isLoading ? (
          <motion.div
            className="text-center text-xl text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading About Page...
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Render About content here */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-lg text-gray-700"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                {/* Render HTML content, assuming content is stored in `aboutData.content` */}
                <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
              </motion.div>
            </motion.div>
          </div>
        )}

        <BackBottomCenter />
    </div>
  );
};
