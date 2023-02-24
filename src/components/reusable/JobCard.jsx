import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCloseJobMutation } from "../../features/job/jobApi";

const JobCard = ({ jobData }) => {
  const { _id: userId, email, role } = useSelector(state => state.auth.user);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { _id, position, companyName, location, employmentType, applicants } =
    jobData || {};

  const [closeJob, { isSuccess, isLoading }] = useCloseJobMutation();
  const handleCloseJob = () => {
    closeJob(_id);
    if (isSuccess) {
      navigate("/dashboard/posted-job")
    }
  }

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        <div>
          {
            pathname.includes('/dashboard') && role === "employer" &&
            <>
              {
                isLoading
                  ? <button className='btn mr-2' disabled>
                    Closing...
                  </button>
                  : <button className='btn mr-2' onClick={handleCloseJob}>
                    Close Job
                  </button>
              }
            </>
          }
          <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
            Details
          </button>
        </div>
      </div>
      {
        role === "employer" && pathname.includes('/dashboard') &&
        <div className="rounded-xl bg-primary/10 p-3 mt-5 text-primary flex justify-between items-center">
          <h3 className="font-bold">Total Applicants: {applicants?.length}</h3>
          <Link to={`/dashboard/candidates-details/${_id}`} className="hover:underline">View Candidates</Link>
        </div>
      }
    </div>
  );
};

export default JobCard;
