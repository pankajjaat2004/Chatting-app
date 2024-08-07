import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ChatListItem';
import { useChatContext } from '../../context/ChatContext';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

function ChatContactList() {
  const { contacts, handleChatSelect } = useChatContext();
  const [display, setDisplay] = useState({
    Groups: true,
    Chats: true
  });

  const contactGroups = contacts.reduce(
    (prev, curr) => {
      curr?.chatType === 'room' ? prev.Groups.push(curr) : prev.Chats.push(curr);
      return prev;
    },
    {
      Groups: [],
      Chats: []
    }
  );

  const handleToggleDisplay = (key) => {
    setDisplay((prev) => ({ ...prev, [key]: !display[key] }));
  };

  const renderedGroups = Object.entries(contactGroups).map(([key, values]) => {
    const renderedContacts = values.map((contact) => {
      const { _id, avatarImage, ...otherContact } = contact;
      return (
        <ListItem
          key={_id}
          contactId={_id}
          avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
          handleItemClick={(e) => handleChatSelect(contact)}
          {...otherContact}
        />
      );
    });

    return (
      <ListGroup key={key}>
        <GroupTitle onClick={() => handleToggleDisplay(key)}>
          {key}
          {display[key] ? <BiChevronDown /> : <BiChevronUp />}
        </GroupTitle>
        {display[key] ? renderedContacts : null}
      </ListGroup>
    );
  });

  return <List>{renderedGroups}</List>;
}

const List = styled.div`
  width: 80%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: var(--bg-color-main);
    width: 6px;
    display: none;
    &-thumb {
      background-color: var(--bg-color-darken);
      border-radius: 8px;
    }
  }
`;

const ListGroup = styled.ul`
  width: 100%;
  padding: .31rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--main-color);
  align-self: flex-start;
  margin-bottom: 4px;
  text-transform: capitalize;
  cursor: pointer;
`;

export default ChatContactList;
