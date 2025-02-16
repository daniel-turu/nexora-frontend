import { useEffect, useState } from "react";
import { getGallery } from "../api/apiCall";
import { useDialog } from "../Context/Dialog";
import AnimatedWrapper from "./AnimatedWrapper";
import { BackBottomCenter } from "./BackBottomCenter";
import { BackTopLeft } from "./BackTopLeft";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 25; // Show 25 images per page
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await getGallery();
      setImages(data);
    };
    fetchGallery();
  }, []);

  // Get the images for the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleImageClick = (image) => {
    openDialog(
      <AnimatedWrapper variant="zoomIn">
       
        <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
          <button
            className="absolute top-4 bg-white rounded-full p-2 right-4 text-gray-600 hover:text-gray-900"
            onClick={closeDialog}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            alt={image.title}
            className="w-full h-auto rounded-lg"
            src={image.image}
          />
          <p className="text-center mt-4 text-lg font-semibold">{image.title}</p>
        </div>
      </AnimatedWrapper>
    );
  };

  return (
    <section className="text-gray-600 body-font">
    <BackTopLeft />
      <AnimatedWrapper variant="fade" className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            School Gallery
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            A collection of memorable moments captured at our school.
          </p>
        </div>
        
        {/* Image Grid */}
        <div className="flex flex-wrap md:-m-2 -m-1">
          {currentImages.map((image) => (
           
            <div className="md:p-2 p-1 w-1/2 md:w-1/3"> 
                <AnimatedWrapper key={image.id} variant="slideFromBottomRight">
                    <img
                    alt={image.title}
                    className="w-full object-cover h-full object-center block rounded-lg shadow-md cursor-pointer"
                    src={image.image}
                    onClick={() => handleImageClick(image)}
                    />            
                </AnimatedWrapper>
            </div>

          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            Page {currentPage} of {Math.ceil(images.length / imagesPerPage)}
          </span>

          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage >= Math.ceil(images.length / imagesPerPage)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage >= Math.ceil(images.length / imagesPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

      </AnimatedWrapper>
      
       <BackBottomCenter />
    </section>
  );
};
