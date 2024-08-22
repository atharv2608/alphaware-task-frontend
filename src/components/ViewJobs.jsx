import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/jobSlice";
import job from "@/api/Job";
import SkeletonJobCard from "./SkeletonJobCard";
function ViewJobs() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.userData?._id);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const jobs = useSelector((state) => state.job.jobs);
  const filteredJobs = jobs.filter(
    (job) =>
      !job.applications.some(
        (application) => String(application.applicantId) === String(userId)
      )
  );

  const isLoading =  useSelector((state) => state.job.isLoading);
  const error = useSelector((state) => state.job.error);

  if (error) {
    return error;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      {filteredJobs.length > 0 ? (
        <>
          <h1 className="text-3xl text-indigo-500 lg:text-5xl font-bold text-center mb-10">
            Explore Jobs
          </h1>
          {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
           <SkeletonJobCard />
           <SkeletonJobCard />
           <SkeletonJobCard />
         </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {filteredJobs.map((job, index) => (
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
          No New Jobs To Show
        </h1>
      )}
    </div>
  );
}

export default ViewJobs;
