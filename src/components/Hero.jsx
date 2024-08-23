import heroImage from "../images/hero-img.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useScrollToTop } from "@/utils/scrollToTop";
function Hero() {
  useScrollToTop()
  const loginStatus = useSelector(state => state.auth.status)
  const role = useSelector(state => state?.auth?.role)
  return (
    <>
      <div className="bg-gray-900 py-20 min-h-screen flex items-center ">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 lg:w-2/3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                Welcome to <br className="hidden md:block" />
                <span className="text-indigo-500">Awesome</span> Jobs
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
              Unlock Your Future: Find the Job That Fits You Best
              </p>
              <div className="flex gap-2">
               {loginStatus && role ==="admin" && (
                 <Link
                 to="/panel/admin/post-job"
                 className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"
               >
                 Post Jobs
               </Link>
               )}
               {loginStatus && role ==="user" && (
                 <Link
                 to="/panel/user/view-jobs"
                 className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"
               >
                 View Jobs
               </Link>
               )}
                {!loginStatus &&(
                  <Link
                  to="/panel/user/view-jobs"
                 className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"

                   >
                  Explore Jobs
                </Link>
                )}
                {!loginStatus &&(
                  <Link
                  to="/register"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md"
                >
                  Register
                </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
              <img
                src={heroImage}
                alt="Hero Image"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
