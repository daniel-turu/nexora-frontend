import { useEffect, useState } from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { getCurriculums } from "../api/apiCall";
import { BackTopLeft } from "./BackTopLeft";
import { BackBottomCenter } from "./BackBottomCenter";

const CurriculumOffers = () => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCurriculums = async () => {
      const data = await getCurriculums();
      setCurriculums(data);
    };
    fetchCurriculums();
  }, []);

  return (


    <div className="container pt-32 mx-auto p-6">

      <BackTopLeft />

      <AnimatedWrapper variant="slideFromTop" keyProp="title">
        <h1 className="text-3xl font-bold text-center mb-6 text-white bg-[#0a2240] p-4 rounded-lg shadow-lg">
          Curriculum Offers
        </h1>
      </AnimatedWrapper>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {curriculums.map((curriculum) => (
          <AnimatedWrapper key={curriculum.id} variant="zoomIn" keyProp={curriculum.id}>
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-[#0a2240]">
              <h2 className="text-xl font-semibold text-gray-800">{curriculum.name}</h2>
              <p className="text-gray-600 mt-2">{curriculum.description}</p>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Subjects:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {curriculum.subjects.map((subject) => (
                    <li key={subject.id}>{subject.name}</li>
                  ))}
                </ul>
              </div>
              {/* <p className="text-sm text-gray-500 mt-2">Updated: {new Date(curriculum.updated_at).toLocaleDateString()}</p> */}
            </div>
          </AnimatedWrapper>
        ))}
      </div>

      <BackBottomCenter />
    </div>
  );
};

export default CurriculumOffers;
