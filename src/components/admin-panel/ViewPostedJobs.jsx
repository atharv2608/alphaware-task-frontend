import React, { useEffect } from "react";
import JobCard from "../JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import SkeletonJobCard from "../SkeletonJobCard";
import { useScrollToTop } from "@/utils/scrollToTop";
function ViewPostedJobs({ role }) {
  useScrollToTop()
  const dispatch = useDispatch();

  //async data fetching via thunk
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);


  //role checking
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [role]);

  //extracting data from store
  const jobs = useSelector((state) => state.job.jobs);
  const isLoading = useSelector((state) => state.job.isLoading);
  const error = useSelector((state) => state.job.error);

  if (error) {
    return error;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      {jobs.length > 0 ? (
        <>
          <h1 className="text-3xl text-indigo-500 lg:text-5xl font-bold text-center mb-10">
            Jobs Posted By You
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              <SkeletonJobCard />
              <SkeletonJobCard />
              <SkeletonJobCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {jobs.map((job, index) => (
                <JobCard
                  key={index}
                  id={job._id}
                  companyName={job.companyName}
                  position={job.position}
                  contract={job.contract}
                  location={job.location}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <h1 className="text-3xl text-indigo-500 lg:text-5xl font-bold text-center mb-10">
          You haven't Posted Any Jobs
        </h1>
      )}
    </div>
  );
}

export default ViewPostedJobs;
