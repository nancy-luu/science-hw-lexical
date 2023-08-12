import { useEmojiClickEvent } from '../EmojiClickEventProvider';

function handleClick(triggerEmojiPicker: () => void) {
  triggerEmojiPicker(); // Trigger the emoji picker event
}

const EmojiTrigger = () => {
  const { triggerEmojiPicker } = useEmojiClickEvent(); // Access triggerEmojiPicker from context

  return (
    <div className='trigger-form'>
      <img
        className="poke-add-btn"
        src="../public/Pok%3F_Ball.webp"
        onClick={() => {
        //   handleClick(triggerEmojiPicker);
            handleClick(() => console.log('Place holder for trggier funtion'))
        }}
      />
    </div>
  );
};

export default EmojiTrigger;