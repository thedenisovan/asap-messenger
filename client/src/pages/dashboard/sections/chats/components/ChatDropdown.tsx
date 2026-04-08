import { useContext } from 'react';
import DashboardContext from '../../../../../context/DashboardContext';
import clearChat from '../../../../../services/api/clearChat.client';
import LightIcon from '../../../../../components/common/LightIcon';
import DarkIcon from '../../../../../components/common/DarkIcon';
import leaveGroup from '../../../../../services/api/leaveGroup.client';
import isUserAdmin from '../../../../../utils/isUserAdmin';

export default function ChatDropdown() {
  const dashContext = useContext(DashboardContext);
  const isGroupChat =
    dashContext?.currentChat && 'chatters' in dashContext.currentChat;
  const isGroupChatBoolean = isGroupChat ? true : false;

  if (!dashContext) return null;

  return (
    <ul
      className={`${dashContext.isChatDropdownHidden ? 'hidden' : ''} z-10 absolute rounded-xl dark:bg-[#333333] bg-gray-50 border border-gray-200 dark:border-gray-800 transition-transform origin-top-right duration-100 right-8 top-12 min-w-50`}
    >
      {isGroupChat && (
        <li className='hover:bg-gray-100 dark:hover:bg-[#222222] rounded-t-lg transition-colors duration-75'>
          <button className='flex gap-1 w-full items-center py-2.5 pl-4 pr-9 cursor-pointer'>
            <DarkIcon
              width='20'
              path='M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
            />
            <LightIcon
              width='20'
              path='M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
            />
            Group Info
          </button>
        </li>
      )}
      <li className='border-b dark:border-b-neutral-500 border-b-neutral-300 hover:bg-gray-100 dark:hover:bg-[#222222] rounded-t-lg transition-colors duration-75'>
        <button
          className='flex gap-1 w-full items-center py-2.5 pl-4 pr-9 cursor-pointer'
          onClick={() => {
            // Only admin can clear group chat history
            const isAdmin = isUserAdmin(
              dashContext.currentChat,
              dashContext.userProfile!.id,
            );

            if (!isAdmin) {
              alert(`Only admin have rights to clear group chat history.`);
              return;
            }

            // Clear chat confirm
            const confirm = window.confirm(
              `Do you want to delete all messages from this chat?`,
            );

            if (confirm) {
              dashContext?.setMessages([]);
              dashContext.socket.emit('clear_chat', {
                roomName: isGroupChatBoolean
                  ? 'group-' + dashContext?.currentChat?.id
                  : 'direct-' + dashContext?.currentChat?.id,
              });
              clearChat(dashContext!.currentChat!.id, isGroupChatBoolean);
            }
          }}
        >
          <LightIcon
            width='20'
            path='m656-120-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Zm-176 0q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q11 0 20.5-.5T520-203v81q-10 1-19.5 1.5t-20.5.5ZM120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm414 190-94-94v-216h80v184l56 56-42 70Z'
          />
          <DarkIcon
            width='20'
            path='m656-120-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Zm-176 0q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q11 0 20.5-.5T520-203v81q-10 1-19.5 1.5t-20.5.5ZM120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm414 190-94-94v-216h80v184l56 56-42 70Z'
          />
          <p>Clear History</p>
        </button>
      </li>
      {isGroupChat ? (
        <li className=' hover:bg-red-100 dark:hover:bg-red-900/20 rounded-t-lg transition-colors duration-75'>
          <button
            // Remove user from given group and close chat window
            onClick={() => {
              const confirmation = confirm(
                'Are you sure you want to leave this group?',
              );

              if (!confirmation) return;

              leaveGroup(
                dashContext.userProfile!.id,
                dashContext.currentChat!.id,
                null,
                null,
              );
              dashContext.setIsChatOpen(false);

              // Set user group chat state to filtered down version of chats not including current chat
              dashContext.setGroupChat(
                dashContext.groupChat.filter(
                  (groupChat) => groupChat.id !== dashContext.currentChat!.id,
                ),
              );
            }}
            className='flex text-red-500 dark:text-red-400 gap-1 w-full items-center py-2.5 pl-4 pr-9 cursor-pointer'
          >
            Leave Group
          </button>
        </li>
      ) : (
        <li className='hover:bg-red-100 dark:hover:bg-red-900/20 rounded-t-lg transition-colors duration-75'>
          <button
            onClick={() => {
              const confirmation = confirm(
                'Are you sure you want to leave this chat?',
              );

              if (!confirmation) return;

              leaveGroup(
                dashContext.userProfile!.id,
                null,
                dashContext.currentChat!.id,
                dashContext.directContactId,
              );
              dashContext.setIsChatOpen(false);

              // Update contact state
              if (dashContext.contactsProfile)
                dashContext.setContactsProfile(
                  dashContext.contactsProfile.filter(
                    (contacts) => contacts.id !== dashContext.directContactId,
                  ),
                );
            }}
            className='flex text-red-500 dark:text-red-400 gap-1 w-full items-center py-2.5 pl-4 pr-9 cursor-pointer'
          >
            Remove Contact
          </button>
        </li>
      )}
    </ul>
  );
}
