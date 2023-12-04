import { useState } from "react";
import Table from "../../components/userProfile/Table";
import Testimonials from "../../components/userProfile/Testimonials";
import { useSelector } from "react-redux";
import UpdateProfileModal from "../../components/layout/UpdateProfileModal";
import ChangePasswordModal from "../../components/layout/ChangePasswordModal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BackButton from "../../components/layout/BackButton";

const Profile = () => {
  const [showMore, setShowMore] = useState(false);

  const { user } = useSelector((state) => state.user);

  const handleShowMore = () => {
    setShowMore(true);
  };
  return (
    <>
      <Navbar />
      <section className="relative block h-500-px py-40">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative flex justify-center lg:w-100 w-75 lg:h-100 h-75">
                    <img
                      alt="..."
                      src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex justify-center lg:justify-end">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    {user?.data ? (
                      <>
                        <div className="flex flex-col items-center sm:flex-row sm:justify-end sm:gap-4 sm:relative sm:left-10">
                          <UpdateProfileModal />
                          <ChangePasswordModal />
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="active:bg-black-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ backgroundColor: "#2E2E30", color: "white" }}
                        >
                          Connect
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        4.5
                      </span>
                      <span className="text-sm text-blueGray-400">Ratings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block tracking-wide text-blueGray-600">
                        Amateur
                      </span>
                      <span className="text-sm text-blueGray-400">Rank</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      I am a MERN Stack Developer with loads of Experience in
                      this field
                    </p>
                    {!showMore && (
                      <p
                        className="font-normal text-white hover:bg-black-600 uppercase font-bold shadow-md text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                        style={{ backgroundColor: "#2E2E30" }}
                        onClick={handleShowMore}
                      >
                        Show more
                      </p>
                    )}
                    {showMore && (
                      <>
                        <div>
                          <Table />
                        </div>
                        <div>
                          <Testimonials />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
