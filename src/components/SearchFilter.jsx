import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchFilter({setCompanyNameFilter, setContractFilter}) {
  return (
    <div className="bg-white p-4 rounded-lg flex space-x-5 max-w-screen-md">
      <Input
        placeholder="Search by Company Name"
        type="input"
        className="border border-indigo-500 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        onChange={(e) => setCompanyNameFilter(e.target.value)}
      />
      <Select onValueChange={(value) => setContractFilter(value === "None" ? "" : value)}>
        <SelectTrigger className="border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <SelectValue placeholder="Contract type" />
        </SelectTrigger>
        <SelectContent className="border border-indigo-500 rounded-md">
        <SelectItem value="None">None</SelectItem>
          <SelectItem value="Full Time">Full Time</SelectItem>
          <SelectItem value="Part Time">Part Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchFilter;
