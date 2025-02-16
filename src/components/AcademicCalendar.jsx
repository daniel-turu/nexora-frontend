import React, { useState, useEffect } from "react";
import { getAcademicCalendar } from "../api/apiCall";
import { format, parseISO, isSameDay, addMonths, subMonths } from "date-fns";
import { BackBottomCenter } from "./BackBottomCenter";
import { BackTopLeft } from "./BackTopLeft";
import AnimatedWrapper from "./AnimatedWrapper"; // Import AnimatedWrapper

export const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
        window.scrollTo(0, 0);

      try {
        const formattedMonth = format(currentMonth, "yyyy-MM");
        const data = await getAcademicCalendar(formattedMonth);
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentMonth]);

  const goToNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const goToPreviousMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));

  if (loading) return <p className="text-center text-gray-500">Loading academic calendar...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container pt-32 mx-auto py-12">
      <BackTopLeft />

      {/* Month Navigation */}
      <AnimatedWrapper variant="fadeAndStay">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Academic Calendar
        </h2>
      </AnimatedWrapper>

      <AnimatedWrapper variant="slideFromTop">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            ⬅ Previous
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={goToNextMonth}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            Next ➡
          </button>
        </div>
      </AnimatedWrapper>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => {
            const startDate = parseISO(event.start_datetime);
            const endDate = parseISO(event.end_datetime);
            const isSingleDay = isSameDay(startDate, endDate);

            return (
              <AnimatedWrapper key={event.id} variant="zoomIn">
                <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between relative hover:shadow-xl transition">
                  {/* Date Display */}
                  <div className="flex items-center">
                    <div className="px-4 py-3 bg-indigo-100 rounded-lg text-center">
                      <span className="text-indigo-600 font-semibold block">
                        {format(startDate, "MMM")}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {format(startDate, "dd")}
                      </span>
                      {!isSameDay(startDate, endDate) && (
                        <>
                          <span className="text-sm text-gray-500 mt-1 block">to</span>
                          <span className="text-indigo-600 font-semibold block">
                            {format(endDate, "MMM")}
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            {format(endDate, "dd")}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xs text-gray-500 uppercase">{event.category}</h2>
                      <h1 className="text-lg font-semibold text-gray-900">{event.title}</h1>
                      <p className="text-gray-600 mt-3">{event.description}</p>
                    </div>
                  </div>

                  <div className="h-5 w-full"></div>

                  {/* Time Display */}
                  <div className="absolute bottom-4 right-4 text-sm text-[#0a2240]">
                    {isSingleDay ? (
                      <p>
                        ⏰ {format(startDate, "hh:mm a")} - {format(endDate, "hh:mm a")}
                      </p>
                    ) : (
                      <p>
                        📅 {format(startDate, "MMM dd, hh:mm a")} - {format(endDate, "MMM dd, hh:mm a")}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })
        ) : (
          <AnimatedWrapper variant="fade">
            <p className="text-center col-span-3 text-gray-500">No events this month.</p>
          </AnimatedWrapper>
        )}
      </div>

      <BackBottomCenter />
    </section>
  );
};
