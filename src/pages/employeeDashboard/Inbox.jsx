import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMessagesQuery } from '../../features/job/jobApi';

const Inbox = () => {
    const { email } = useSelector(state => state.auth.user);
    const { data } = useGetMessagesQuery(email);

    const avatarImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

    return (
        <div className='w-8/12 mx-auto mt-16 border border-primary/10 shadow-lg rounded-lg'>
            <div className='border-b shadow-sm p-4 flex justify-between items-center'>
                <h3 className='text-xl'>Chatbox</h3>
            </div>
            <div>
                {
                    data?.data?.map(({ _id, messages, reciever }) => <Link to={_id}>
                        <div className='flex items-center gap-3 hover:bg-gray-100 p-5 border-b'>
                            <img className='w-12 rounded-full' src={avatarImg} alt="" />
                            <div>
                                <h4 className='font-bold'>{reciever}</h4>
                                <p className=''>{messages[0][email]}  ....</p>
                            </div>
                        </div>
                    </Link>)
                }

            </div>
        </div>
    );
};

export default Inbox;