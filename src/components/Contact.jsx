import React, { useEffect, useState } from 'react';
import { getFooter, postContact } from '../api/apiCall';
import { useNavigation } from '../Context/NavigationContext';
import AnimatedWrapper from './AnimatedWrapper';

export const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const { navigate } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchContactData = async () => {
      try {
        const data = await getFooter();
        setContactData(data);
      } catch (error) {
        console.error('Failed to fetch contact data', error);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      await postContact(formData);
      setFormData({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: "Message sent successfully!" });
    } catch (error) {
      setStatus({ type: "error", message: "Error sending message. Try again!" });
    }
  };

  return (
    <AnimatedWrapper variant="slideFromLeft" className="text-gray-600 pt-10 body-font relative">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-[#0a2240] rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${encodeURIComponent(contactData?.address || 'Izmir (My Business Name)')}&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">{contactData?.address || 'No. 20 Galadima Aminu Way, Jimeta - Yola, Adamawa State'}</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a href={`mailto:${contactData?.email || 'example@email.com'}`} className="text-indigo-500 leading-relaxed">
                  {contactData?.email || 'example@email.com'}
                </a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">{contactData?.phone || '123-456-7890'}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-[#0a2240] text-lg mb-1 font-medium title-font">Feedback</h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              We’d love to hear from you! Whether you have a question, suggestion, or just want to share your thoughts, feel free to reach out. Your feedback helps us improve and serve you better.
            </p>
            {status && (
              <p className={`text-sm mb-4 ${status.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {status.message}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  required
                ></textarea>
              </div>
              <button type="submit" className="text-white bg-[#0a2240] border-0 py-2 px-6 focus:outline-none hover:bg-[#0a2240] rounded text-lg">
                {status?.type === "loading" ? "Sending..." : "Submit"}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              If you have any questions or need further information, feel free to reach out to us. We're here to help!
            </p>
          </div>
        </div>
      </section>
    </AnimatedWrapper>
  );
};
