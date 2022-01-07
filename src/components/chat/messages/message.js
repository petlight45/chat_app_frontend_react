import moment from 'moment';

export const Message = ({type, status, message, timestamp, timeRead}) => {
    return (
        <div className={`d-flex flex-column w-100 message-box-wrapper ${type} mb-3`}>
            <div className='message_box py-2 col-md-5 col-10 message-font pr-4'>
                {message}
            </div>
            <div className="">
                <div className="mr-4 font-5 custom-mute d-flex">
                    <div className="d-flex flex-column">
                        <span className="font-5 custom-mute px-3">
                            {timestamp ? moment(timestamp).calendar() : null}
                        </span>
                        {
                            type === "sent"?
                                <span className="font-5 custom-mute px-3">
                            {timeRead ? "Read @ " + moment(timeRead).calendar() : null}
                        </span>: null
                        }

                    </div>
                    <span className="m-0 p-0"><i className={`fas fa-circle message-status ${status}`}></i></span>
                </div>
            </div>
        </div>
    )
}