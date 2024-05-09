import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../components/userProfile/Table";
import Testimonials from "../../components/userProfile/Testimonials";
import { useSelector } from "react-redux";
import UpdateProfileModal from "../../components/layout/UpdateProfileModal";
import ChangePasswordModal from "../../components/layout/ChangePasswordModal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getUserDetailsApi } from "../../api/user/userApi";
import { message } from "antd";
import AddUser from "../../components/AddUser";

const Profile = () => {
  const params = useParams();
  const user = useSelector((state) => state.user);

  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState("N/A");
  const [email, setEmail] = useState("N/A");
  const [rank, setRank] = useState("N/A");
  const [projects, setProjects] = useState(0);
  const [rating, setRating] = useState("N/A");
  const [degree, setDegree] = useState();
  const [university, setUniversity] = useState();
  const [description, setDescription] = useState();
  const [role, setRole] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [channelId, setChannelId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("channelId");
    console.log(id);
    setChannelId(id);
    fetchUserDetails();
  }, [params.user]);

  const info = () => {
    message.error("User Not Found");
  };

  const fetchUserDetails = async () => {
    const data = await getUserDetailsApi(params.user);
    console.log(data);
    if (data) {
      setName(data?.data?.user?.name);
      setEmail(data?.data?.user?.email);
      setRole(data?.data?.user?.position);
      setDegree(data?.data?.user?.degree);
      setDescription(data?.data?.user?.description);
      setUniversity(data?.data?.user?.university);
      setProjects(data?.data?.user?.projects);
      setRank(data?.data?.user?.rank);
      if (data?.data?.user?.rating) {
        setRating(data?.data?.user?.rating);
      }
      setImagePreview(data?.data?.user?.avatar?.url);
    } else {
      info();
    }
  };

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
                      src={`${imagePreview}`}
                      className="shadow-xl rounded-full h-32 w-32 object-cover  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex justify-center lg:justify-end">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    {user?.data?.user?.email === params.user ? (
                      <>
                        <div className="flex flex-col items-center sm:flex-row sm:justify-end sm:gap-4 sm:relative sm:left-10">
                          <UpdateProfileModal user={user?.data?.user} />
                          <ChangePasswordModal user={user?.data?.user} />
                        </div>
                      </>
                    ) : (
                      <>
                        <AddUser channelId={channelId} userEmail={email} />
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {rating}
                      </span>
                      <span className="text-sm text-blueGray-400">Ratings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block tracking-wide text-blueGray-600">
                        {rank}
                      </span>
                      <span className="text-sm text-blueGray-400">Rank</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {projects}
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
                  {name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {role}
                </div>

                {university && (
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {university}
                  </div>
                )}
                {degree && (
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {degree}
                  </div>
                )}
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    {description && (
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {description}
                      </p>
                    )}
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
