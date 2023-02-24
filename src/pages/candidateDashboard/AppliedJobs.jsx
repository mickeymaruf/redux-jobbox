import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  const { byDate, byStatus } = useSelector(state => state.jobFilteration)

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.data
          ?.filter(job => {
            if (byStatus) {
              return job?.applicants?.find(applicant => applicant.email === email)?.status === byStatus
            }
            return job;
          })
          ?.sort((a, b) => {
            if (byDate === "lastApplied") {
              return new Date(b?.applicants?.find(applicant => applicant.email === email)?.appliedAt) - new Date(a?.applicants?.find(applicant => applicant.email === email)?.appliedAt)
            }
            return new Date(a?.applicants?.find(applicant => applicant.email === email)?.appliedAt) - new Date(b?.applicants?.find(applicant => applicant.email === email)?.appliedAt)
          })
          ?.map((job) => (
            <JobCard jobData={job} />
          ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
