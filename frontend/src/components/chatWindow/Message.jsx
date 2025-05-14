import {useState} from 'react'
import useAuthContext from '../../hooks/useAuthContext.js';
import useChat from '../../zustand/useChat';
import { extractTime, extractDate } from '../../util/extractTime.js';
import { FaPencilAlt, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import useUpdateMessage from '../../hooks/useUpdateMessage.js';
import useDeleteMessage from '../../hooks/useDeleteMessage.js';
import {toast} from 'react-hot-toast';

const Message = ({message}) => {
  const { authUser } = useAuthContext()
  const { selectedChat } = useChat()

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);

  const { loading: updating, updateMessage } = useUpdateMessage();
  const { loading: deleting, deleteMessage } = useDeleteMessage();

  const isFromMe = message.sender_id ===authUser._id;
  const chatTypeClassName = isFromMe ? 'chat-end' : 'chat-start' // проверяем, отправили ли мы сообщение или нам
  // необходимо для правильного рендера сообщений: если от нас - то справа
  // если нам - то слева
  
  const profileAvatar = isFromMe ? authUser.avatar_url : selectedChat?.avatar_url
  const bubbleBgColorClassName = isFromMe ? 'bg-blue-500' : "bg-gray-700";
  const formattedTime = extractTime(message.updatedAt);
  const formattedDate = extractDate(message.updatedAt);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(message.text);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(message.text);
  }

  const handleSaveEdit = async () => {
    if (editedText.trim() === "" || editedText === message.text) {
      setIsEditing(false);
      return;
    }

    const success = await updateMessage(message._id, editedText);

    if(success) {
      toast.success("Message updated!");
    } else {
      toast.error("Failed to update the message");
    }
    setIsEditing(false);
  }

  const handleDelete = async () => {
    if(window.confirm("Do you want to delete this message?")) {
      const success = await deleteMessage(message._id);

      if(success) {
        toast.success("Message deleted!");
      } else {
        toast.error("Failed to delete the message");
      }
    }
  }

  return (
        <div className={`chat ${chatTypeClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profileAvatar} alt="user avatar" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColorClassName} pb-1 group relative`}>
                {isEditing ? (
                    <div>
                        <textarea
                            className="textarea textarea-bordered w-full text-sm p-2 bg-gray-800 text-white resize-none"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            rows={Math.max(1, Math.min(5, editedText.split('\n').length))} // Автоматическая высота
                        />
                        <div className="flex justify-end gap-2 mt-1">
                            <button
                                className="btn btn-xs btn-ghost text-green-500 hover:text-green-400"
                                onClick={handleSaveEdit}
                                disabled={updating || editedText.trim() === ""}
                            >
                                {updating ? <span className="loading loading-spinner loading-xs"></span> : <FaSave />}
                            </button>
                            <button
                                className="btn btn-xs btn-ghost text-red-500 hover:text-red-400"
                                onClick={handleCancelEdit}
                                disabled={updating}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {message.text}
                        {isFromMe && (
                            <div className="absolute top-0 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 bg-opacity-50 bg-black rounded-bl-md">
                                <button
                                    className="btn btn-xs btn-ghost text-yellow-400 hover:text-yellow-300"
                                    onClick={handleEdit}
                                    disabled={deleting || updating}
                                >
                                    <FaPencilAlt size={12} />
                                </button>
                                <button
                                    className="btn btn-xs btn-ghost text-red-500 hover:text-red-400"
                                    onClick={handleDelete}
                                    disabled={deleting || updating}
                                >
                                    {deleting ? <span className="loading loading-spinner loading-xs"></span> : <FaTrash size={12} />}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedDate}, {formattedTime}
                {message.status === "modified" && !isEditing && <span className="italic text-xs opacity-70 ml-1">(edited)</span>}
            </div>
        </div>
    );
}

export default Message;