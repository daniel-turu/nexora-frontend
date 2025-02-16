import React, { useEffect, useState } from 'react';
import { getFooter, postSubscribe } from '../api/apiCall';
import { useNavigation } from '../Context/NavigationContext';
import { useDialog } from '../Context/Dialog';

export const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const { navigate } = useNavigation();
  const { openDialog } = useDialog();
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFooterData = async () => {
      try {
        const data = await getFooter();
        setFooterData(data);
      } catch (error) {
        console.error('Failed to fetch footer data', error);
      }
    };

    fetchFooterData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      openDialog(<p className="text-red-500">Please enter a valid email.</p>);
      return;
    }

    try {
      await postSubscribe({ email });
      setEmail(""); // Reset input
      openDialog(<p className="text-green-500">🎉 Subscription successful! You'll receive our updates.</p>);
    } catch (error) {
      openDialog(<p className="text-red-500">⚠️ Failed to subscribe. Please try again.</p>);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Logo & Description */}
        <div className="space-y-4">
          <img src="/static/images/nexoLogo.png" alt="Nexora Academy Logo"
          className="w-24" 
           style={{ animation: "rolling-bounce 6s infinite" }}
          />
          <p className="text-sm">
            {footerData?.address || 'No. 20 Galadima Aminu Way, Jimeta - Yola, Adamawa State'}
          </p>
          <div className="flex space-x-4">
            <a href={footerData?.facebook_link || "#"} className="text-white hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54v-2.2c0-2.5 1.48-3.88 3.75-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.85h2.78l-.44 2.9h-2.34v7.03C18.34 21.25 22 17.09 22 12.07z" />
              </svg>
            </a>
            <a href={footerData?.twitter_link || "#"} className="text-white hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.36 8.48 8.48 0 01-2.71 1.03 4.24 4.24 0 00-7.23 3.87A12.05 12.05 0 013 5.15a4.23 4.23 0 001.31 5.67 4.2 4.2 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.15 4.2 4.2 0 01-1.91.07 4.24 4.24 0 003.96 2.94A8.51 8.51 0 012 19.54a12.01 12.01 0 006.5 1.9c7.8 0 12.06-6.46 12.06-12.07 0-.18 0-.37-.02-.55A8.6 8.6 0 0022.46 6z" />
              </svg>
            </a>
            <a href={footerData?.linkedin_link || "#"} className="text-white hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66h-3.55V9h3.41v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.63 0 4.3 2.39 4.3 5.49v6.26zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zM6.93 20.45H3.74V9h3.19v11.45zM22 2H2v20h20V2z" />
              </svg>
            </a>
          </div>
        </div>


        {/* Center Section: Featured Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Featured Links</h3>
          <ul className="space-y-2">
            <li><button onClick={() => navigate("About")} className="hover:text-blue-400">About</button></li>
            <li><button onClick={() => navigate("Gallery")} className="hover:text-blue-400">Gallery</button></li>
            <li><button onClick={() => navigate("FAQs")} className="hover:text-blue-400">FAQs</button></li>
            <li><button onClick={() => navigate("Contact")} className="hover:text-blue-400">Contact</button></li>
          </ul>
        </div>


        {/* Right Section: Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2">
            <li><i className="fas fa-phone-alt mr-2"></i> <a href={`tel:${footerData?.phone || '+2349065974003'}`} className="hover:text-blue-400">{footerData?.phone || '+234 906 597 4003'}</a></li>
            <li><i className="fas fa-envelope mr-2"></i> <a href={`mailto:${footerData?.email || 'nexoraacademyltd@gmail.com'}`} className="hover:text-blue-400">{footerData?.email || 'nexoraacademyltd@gmail.com'}</a></li>
            <li><i className="fas fa-envelope mr-2"></i> <a  className="hover:text-blue-400">Newsletter</a></li>
          </ul>
          <form onSubmit={handleSubscribe} className="flex items-center">
            <input
              type="email"
              name="email"
              className="p-2 bg-gray-800 w-[200px]  border border-gray-600 rounded text-white rounded-r-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-l-none rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Nexora Academy LTD. All Rights Reserved.</p>
      </div>

      <style>
        {`
          @keyframes rolling-bounce {
            0% { transform: translateX(-100vw) rotate(-360deg); opacity: 1; }
            10% { transform: translateX(0) rotate(0deg); }
            15%, 25%, 35%, 45%, 55% { transform: translateY(-20px); }
            20%, 30%, 40%, 50%, 60% { transform: translateY(0); }
            80% { transform: translateX(100vw) rotate(360deg); opacity: 1; }
            100% { transform: translateX(100vw) rotate(720deg); opacity: 0; }
          }
        `}
      </style>

    </footer>
  );
};
