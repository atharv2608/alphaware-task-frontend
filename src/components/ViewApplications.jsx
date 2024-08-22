import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { fetchJobs } from "@/redux/jobSlice";

function ViewApplications() {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId } = useParams();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Memoize the filtered job to avoid unnecessary recalculations
  const job = useMemo(() => {
    return useSelector((state) => state.job.jobs).find(
      (job) => job?._id === jobId
    );
  }, [jobId]);

  // Extract applications only if the job exists
  const applications = job?.applications || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' gives the format dd/mm/yyyy
  };

  if (!job) {
    return (
      <h1 className="text-2xl lg:text-3xl text-white text-center mt-10">
        Job not found
      </h1>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-5">
      <h1 className="text-3xl lg:text-5xl font-bold text-white text-center">
        Applications for{" "}
        <span className="text-indigo-500">{job.companyName}</span>
      </h1>

      {applications.length > 0 ? (
        <div className="md:p-10 mt-10 md:mt-0">
          <Table className="bg-gray-800 text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Applicant ID
                </TableHead>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Date Applied
                </TableHead>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Name
                </TableHead>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Phone
                </TableHead>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Email
                </TableHead>
                <TableHead className="w-[100px] text-white bg-gray-700">
                  Resume Link
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.applicantId} className="hover:bg-gray-700">
                  <TableCell className="font-medium">{app.applicantId}</TableCell>
                  <TableCell className="font-medium">{formatDate(app.dateApplied)}</TableCell>
                  <TableCell className="font-medium">{app.applicantName}</TableCell>
                  <TableCell className="font-medium">{app.phone}</TableCell>
                  <TableCell className="font-medium">{app.email}</TableCell>
                  <TableCell className="font-medium">
                    <a
                      href={app.resumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 underline"
                    >
                      Link
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <h1 className="text-2xl lg:text-3xl text-white text-center mt-10">
          No Applications yet
        </h1>
      )}
    </div>
  );
}

export default ViewApplications;
