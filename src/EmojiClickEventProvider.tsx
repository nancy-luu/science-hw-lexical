import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

interface EmojiClickEventContextProps {
  emojiPickerTriggered: boolean;
  triggerEmojiPicker: () => void;
}

const EmojiClickEventContext = createContext<EmojiClickEventContextProps | undefined>(undefined);

export const EmojiClickEventProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [emojiPickerTriggered, setEmojiPickerTriggered] = useState(false);

  const triggerEmojiPicker = () => {
    if (emojiPickerTriggered) {
      setEmojiPickerTriggered(false);
    } else if (!emojiPickerTriggered){
      setEmojiPickerTriggered(true);
    }
  };

  return (
    <EmojiClickEventContext.Provider value={{ emojiPickerTriggered, triggerEmojiPicker }}>
      {children}
    </EmojiClickEventContext.Provider>
  );
};

export const useEmojiClickEvent = () => {
  const context = useContext(EmojiClickEventContext);
  if (!context) {
    throw new Error('useEmojiClickEvent must be used within EmojiClickEventProvider');
  }
  return context;
};
