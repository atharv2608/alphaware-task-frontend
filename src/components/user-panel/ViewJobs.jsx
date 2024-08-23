import React, { useEffect, useMemo, useState } from "react";
import JobCard from "../JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/jobSlice";
import SkeletonJobCard from "../SkeletonJobCard";
import { useScrollToTop } from "@/utils/scrollToTop";
import SearchFilter from "../SearchFilter";

function ViewJobs({ role }) {
  useScrollToTop();
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  console.log("Company: ", companyNameFilter);

  const [contractFilter, setContractFilter] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.userData?._id);
  const jobs = useSelector((state) => state.job.jobs);
  const isLoading = useSelector((state) => state.job.isLoading);
  const error = useSelector((state) => state.job.error);
  useEffect(() => {
    if (role !== "user") {
      navigate("/", { replace: true });
    }
  }, [role]);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          !job.applications.some(
            (application) => String(application.applicantId) === String(userId)
          )
      )
      .filter((job) =>
         job.companyName
              .toLowerCase()
              .includes(companyNameFilter.toLowerCase())
         
      )
      .filter((job) =>
        contractFilter ? job.contract === contractFilter : true
      );
  }, [jobs, userId, companyNameFilter, contractFilter]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <h1 className="text-3xl text-indigo-500 lg:text-5xl font-bold text-center mt-5 mb-10">
        Explore Jobs
      </h1>
      <div className="w-full max-w-md">
        <SearchFilter
          setCompanyNameFilter={setCompanyNameFilter}
          setContractFilter={setContractFilter}
        />
      </div>
      {filteredJobs.length > 0 ? (
        <>
          <div className="mb-10 flex justify-center"></div>
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
        <h1 className="text-3xl text-indigo-500  font-bold text-center mb-10">
          No New Jobs To Show
        </h1>
      )}
    </div>
  );
}

export default ViewJobs;
