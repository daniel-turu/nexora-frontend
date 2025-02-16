import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFAQs } from '../api/apiCall';
import { BackBottomCenter } from './BackBottomCenter';
import { BackTopLeft } from './BackTopLeft';

export const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch FAQs from API
    const fetchFAQs = async () => {
      const data = await getFAQs();
      setFaqs(data);
      setIsLoading(false);
    };

    fetchFAQs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto ">

        <div className='py-16' />

    <BackTopLeft />
      <motion.h2
        className="text-3xl font-extrabold text-center text-gray-800 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>

      {isLoading ? (
        <motion.div
          className="text-center text-xl text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading FAQs...
        </motion.div>
      ) : (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.h3
                className="text-xl font-semibold text-blue-600 cursor-pointer hover:text-blue-800"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {faq.question}
              </motion.h3>
              <motion.p
                className="mt-4 text-gray-600 text-lg"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          ))}
        </div>
      )}

    <BackBottomCenter />
    </div>
  );
};

