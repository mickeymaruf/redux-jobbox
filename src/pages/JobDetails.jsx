import React, { useEffect, useState } from "react";

import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useApplyJobMutation, useAskQuestionMutation, useGetJobDetailsQuery, useReplyQuestionMutation } from "../features/job/jobApi"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";

const JobDetails = () => {
  const { id } = useParams();
  const { _id: userId, email, role } = useSelector(state => state.auth.user);

  const { data, isLoading } = useGetJobDetailsQuery(id);
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    applicants,
    _id,
  } = data || {};

  const [applyJob, { isLoading: applyLoading }] = useApplyJobMutation();
  const handleApply = () => {
    applyJob({
      userId,
      jobId: _id,
      email
    });
  }


  const { register, handleSubmit, control, reset } = useForm();
  const hasText = useWatch({ control, name: "query" })

  const [askQuestion] = useAskQuestionMutation();
  const handleAskQuestion = (data) => {
    askQuestion({
      userId,
      jobId: _id,
      email,
      question: data.query,
    });
    reset();
  }

  const [replyQuestion] = useReplyQuestionMutation();

  const [reply, setReply] = useState("");
  const handleSubmitReply = (id) => {
    replyQuestion({ reply, userId: id });
    rese
  }

  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            {
              applyLoading
                ? <span className='py-2.5 px-5 rounded-full bg-gray-500 text-white border-white animate-pulse'>Loading...</span>
                : applicants?.some(aplcnt => aplcnt.email === email)
                  ? <button className='py-2.5 px-5 rounded-full bg-green-500 text-white border-white'>Applied</button>
                  : <button onClick={handleApply} className='btn'>Apply</button>
            }
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>

            <div className='text-primary my-2'>
              {queries?.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {
                    role === "employer" &&
                    <div className='flex gap-3 my-5'>
                      <input onBlur={(e) => setReply(e.target.value)} placeholder='Reply' type='text' className='w-full' />
                      <button
                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                        type='button'
                        onClick={() => handleSubmitReply(id)}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  }

                </div>
              ))}
            </div>

            {
              role === "candidate" &&
              <form onSubmit={handleSubmit(handleAskQuestion)} className='flex gap-3 my-5'>
                <input
                  placeholder='Ask a question...'
                  type='text'
                  className='w-full'
                  {...register("query")}
                />
                {
                  hasText
                    ? <button
                      className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                      type='submit'
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                    : <button
                      className='shrink-0 h-14 w-14 bg-primary/10 border border-gray hover:bg-gray rounded-full transition-all  grid place-items-center text-gray'
                      disabled
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                }

              </form>
            }
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
