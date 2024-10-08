import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { deleteJobService } from "@/services/jobService";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/jobSlice";

import { ApplyDialog } from "./ApplyDialog";
//basic job card from shadcn
function JobCard({
  id,
  companyName = "Company Name",
  position = "Position",
  contract = "Contract",
  location = "Location",
  showButton = true,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state?.auth?.userData?.role);
  const onEditClick = (id) => {
    navigate(`edit/${id}`);
  };

  const onViewApplicationsClick = (id) => {
    navigate(`view-applications/${id}`);
  };
  const onDeleteClick = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete? ");
    if (confirmDelete) {
      const success = await deleteJobService(id);
      if (success) {
        dispatch(fetchJobs());
      }
    } else {
      return;
    }
  };

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{`${companyName}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`${contract} - ${location}`}</p>
      </CardContent>
      <CardFooter>
        <div className="space-x-5">
          {role === "admin" && (
            <>
              <Button onClick={() => onEditClick(id)}>Edit</Button>
              <Button
                onClick={() => onViewApplicationsClick(id)}
                className="bg-blue-500 hover:bg-blue-500"
              >
                View Applications
              </Button>
              <Button
                onClick={() => onDeleteClick(id)}
                className="bg-red-500 hover:bg-red-500"
              >
                Delete
              </Button>
            </>
          )}
          {role === "user" && showButton && (
            <>
              <ApplyDialog
                comapanyName={companyName}
                position={position}
                jobID={id}
                dispatch={dispatch}
                fetchJobs={fetchJobs}
              />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default JobCard;
