import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetApplicantsDetailsMutation, useGetJobDetailsQuery, useModifyApplicantStatusMutation } from '../../features/job/jobApi';

const CandidatesDetails = () => {
    const { jobId } = useParams();
    const { data } = useGetJobDetailsQuery(jobId);
    const { position, applicants } = data || {};

    const [getApplicantsDetails, { data: applicantsDetails }] = useGetApplicantsDetailsMutation();

    useEffect(() => {
        const applicantsEmail = applicants?.map(applicant => applicant.email);

        if (jobId && applicantsEmail?.length) {
            getApplicantsDetails({ applicants: applicantsEmail });
        }
    }, [applicants, jobId])

    const avatarImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

    // modify applicants status
    const [modifyApplicantStatus] = useModifyApplicantStatusMutation();

    const handleApplicantAction = (email, status) => {
        modifyApplicantStatus({ jobId, applicant: email, data: { status } });
    }

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
                            <Link to={`/dashboard/inbox/${email}`} className="block w-full">
                                <button className='bg-primary/40 w-full rounded-lg py-2'>Send Message</button>
                            </Link>
                            {
                                applicants.find(applicant => applicant.email === email).status === "pending"
                                    ? <div>
                                        <button onClick={() => handleApplicantAction(email, "declined")} className='border border-primary/40 px-2 rounded-lg py-2 mr-2'>❌</button>
                                        <button onClick={() => handleApplicantAction(email, "approved")} className='border border-primary/40 px-2 rounded-lg py-2'>✔️</button>
                                    </div>
                                    : <div className='w-full'>
                                        {
                                            applicants.find(applicant => applicant.email === email).status === "approved"
                                                ? <span className="bg-green-500 w-full block py-2 text-white text-center rounded-lg">Approved</span>
                                                : <span className="bg-red-500 w-full block py-2 text-white text-center rounded-lg">Declined</span>
                                        }
                                    </div>
                            }
                        </div>)
                }
            </div>
        </div>
    );
};

export default CandidatesDetails;