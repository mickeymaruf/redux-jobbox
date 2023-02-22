import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetApplicantsDetailsMutation, useGetJobDetailsQuery } from '../../features/job/jobApi';

const CandidatesDetails = () => {
    const { jobId } = useParams();
    const { data } = useGetJobDetailsQuery(jobId);
    const { position, applicants } = data || {};

    const [getApplicantsDetails, { data: applicantsDetails }] = useGetApplicantsDetailsMutation();

    useEffect(() => {
        const applicantsEmail = applicants?.map(applicant => applicant.email);

        if (jobId && applicantsEmail?.length) {
            getApplicantsDetails({
                data: { applicants: applicantsEmail },
                jobId
            });
        }
    }, [applicants, jobId])

    const avatarImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

    return (
        <div>
            <h1 className='text-xl py-5'>{position} Applicants List</h1>
            <div className="grid grid-cols-4 items-start gap-5">
                {
                    applicantsDetails?.data?.map(({
                        _id,
                        firstName,
                        lastName,
                        gender,
                        country,
                        address,
                        city,
                        postcode,
                        email
                    }) => <div key={_id} className='border rounded-lg p-2 shadow-lg flex flex-col items-center gap-1'>
                            <img className='w-14 rounded-full' src={avatarImg} alt="" />
                            <h4 className='text-2xl font-medium'>{firstName + " " + lastName}</h4>
                            <p>Gender: {gender}</p>
                            <p>Country: {country}</p>
                            <p>Address: {address}</p>
                            <p>City: {city}</p>
                            <p>Postcode: {postcode}</p>
                            <button
                                onClick={() => setChatApplicant({ name: firstName + " " + lastName, email })}
                                className='bg-primary/40 w-full rounded-lg py-2'
                            >
                                Send Message
                            </button>
                        </div>)
                }
            </div>
        </div>
    );
};

export default CandidatesDetails;