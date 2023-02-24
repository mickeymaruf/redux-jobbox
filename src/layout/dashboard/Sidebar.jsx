import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterByDate, filterByStatus } from "../../features/job/jobFilterSlice";
const Sidebar = () => {
  const { role } = useSelector(state => state.auth.user);
  const { byDate, byStatus } = useSelector(state => state.jobFilteration)
  const dispatch = useDispatch();

  console.log(byDate, byStatus);

  return (
    <div className='bg-primary/10 col-span-2 h-screen sticky top-0'>
      <ul className='flex flex-col gap-2 w-full h-full  p-3'>
        <div className='flex justify-between items-center text-primary my-1'>
          <Link to='/' className='flex items-center'>
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className='text-xl'>Dashboard</h1>
        </div>
        {
          role === "candidate" &&
          <li>
            <Link
              className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
              to='applied-job'
            >
              Applied Job
            </Link>
          </li>
        }
        {
          role === "employer" &&
          <>
            <li>
              <Link
                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                to='posted-job'
              >
                Your Jobs
              </Link>
            </li>
            <li>
              <Link
                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                to='add-job'
              >
                Add Job
              </Link>
            </li>
          </>
        }
        <li>
          <Link
            className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
            to='inbox'
          >
            Inbox
          </Link>
        </li>
        {
          role === "candidate" &&
          <li>
            <div className="mt-5">
              <p>Filter By Date:</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => dispatch(filterByDate("firstApplied"))} className={`bg-primary/50 text-white text-sm p-2 rounded-full ${byDate === "firstApplied" && "!bg-primary/100"}`}>First applied</button>
                <button type="button" onClick={() => dispatch(filterByDate("lastApplied"))} className={`bg-primary/50 text-white text-sm p-2 rounded-full ${byDate === "lastApplied" && "!bg-primary/100"}`}>Last applied</button>
              </div>
            </div>
            <div className="mt-5">
              <p>Filter By Status:</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => dispatch(filterByStatus("pending"))} className={`bg-primary/50 text-white text-sm p-2 rounded-full ${byStatus === "pending" && "!bg-primary/100"}`}>Pending</button>
                <button type="button" onClick={() => dispatch(filterByStatus("approved"))} className={`bg-primary/50 text-white text-sm p-2 rounded-full ${byStatus === "approved" && "!bg-primary/100"}`}>Approved</button>
                <button type="button" onClick={() => dispatch(filterByStatus("declined"))} className={`bg-primary/50 text-white text-sm p-2 rounded-full ${byStatus === "declined" && "!bg-primary/100"}`}>Decline</button>
              </div>
            </div>
          </li>
        }
      </ul>
    </div>
  );
};

export default Sidebar;
