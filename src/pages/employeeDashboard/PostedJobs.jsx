import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetPostedJobsQuery } from "../../features/job/jobApi";

const PostedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetPostedJobsQuery(email);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Jobs you've posted</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;
