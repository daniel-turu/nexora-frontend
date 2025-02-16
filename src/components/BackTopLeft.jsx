import React from 'react'
import { useNavigation } from '../Context/NavigationContext';
import { motion } from 'framer-motion';

export const BackTopLeft = () => {
    const { navigate, goBack } = useNavigation();
    
  return (
    <div className="container mx-auto p-6">
    <motion.button 
    whileHover={{ scale: 1.05 }}
    className="px-6 py-3 bg-[#0a2240] text-white rounded-lg font-medium hover:bg-red-600 transition"
    onClick={() => goBack()}
    >
    ⬅ Back
    </motion.button>
</div>
  )
}
