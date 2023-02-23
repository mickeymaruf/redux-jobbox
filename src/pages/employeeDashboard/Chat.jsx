import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMessageQuery, useSendMessageMutation } from '../../features/job/jobApi';

const Chat = () => {
    const avatarImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

    const { email } = useSelector(state => state.auth.user);

    const { person } = useParams();
    const { data } = useGetMessageQuery({ person, email }, { pollingInterval: 3000 });

    const { messages } = data?.data || {}

    const [sendMessageAPI] = useSendMessageMutation();

    const { register, handleSubmit, reset } = useForm();
    const handleSendMessage = (data) => {
        sendMessageAPI({
            from: email,
            to: person,
            text: data.text
        })
        reset();
    }

    console.log(data);

    // scroll stick to bottom
    const chatboxRef = useRef();
    useEffect(() => {
        const chatboxElement = chatboxRef.current;
        chatboxElement.scrollTo(0, chatboxElement.scrollHeight);
    }, [])

    useEffect(() => {
        if (chatboxRef) {
            chatboxRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])
    // scroll stick to bottom

    return (
        <div className='w-7/12 mx-auto mt-16 border border-primary/10 shadow-lg rounded-lg'>
            <div className='border-b shadow-sm p-4 flex justify-between items-center'>
                <h3 className='text-xl'>Chatbox</h3>
                <p>{person}</p>
            </div>
            <div ref={chatboxRef} className='max-h-[calc(100vh-16rem)] overflow-y-scroll p-5 pt-0'>
                {
                    messages?.map(message => <>

                        {
                            message.to === email &&
                            <div className='flex items-center gap-3 mt-5'>
                                <img className='w-12 rounded-full' src={avatarImg} alt="" />
                                <p className='bg-primary/50 p-2 px-4 text-white w-fit rounded-full mr-10'>{message.text}</p>
                            </div>
                        }
                        {
                            message.from === email &&
                            <div className='flex justify-end mt-5'>
                                <p className='bg-gray-500 ml-20 p-2 px-4 text-white w-fit rounded-full'>{message.text}</p>
                            </div>
                        }

                    </>)
                }
            </div>

            <form onSubmit={handleSubmit(handleSendMessage)}>
                <div className='mt-5 bg-white bottom-0 border-t p-5 flex items-center gap-2'>
                    <input {...register("text")} type="text" className='w-full' placeholder='Enter your message here...' />
                    <button type='submit'><FiSend size={20} /></button>
                </div>
            </form>
        </div>
    );
};

export default Chat;