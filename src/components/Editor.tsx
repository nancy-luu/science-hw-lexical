import { useEffect } from 'react';

// Lexical imports
import { $createParagraphNode, $createTextNode, $getRoot, EditorState, $getSelection, $isRangeSelection } from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

// Project imports
import { Pokemon } from '../App';
import { MentionNode } from '../nodes/MentionNode';
import { useEmojiClickEvent } from '../EmojiClickEventProvider';
import NewMentionsPlugin from './NewMentionsPlugin';
import EmojiPickerPlugin from './EmojiPickerPlugin';
import EmojiTrigger from './EmojiTrigger';

// Styles
import '../styles.css'


interface EditorProps {
  pokemons: Pokemon[]
}

const theme = {
  // Theme styling goes here
}


function HeadingPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (tag: string) : void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)){
        // @ts-ignore -----> Error on tag not assignable to HeadingTagType. Does not affect functionality.
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    })
  }
  return <div className="heading-btn-container">{['h1', 'h2'].map((tag) => (
      <button className="heading-btn"onClick={() => {onClick(tag)}} key={tag}>{tag.toLocaleUpperCase()}</button>
    ))}
    </div>
}

function onError(error : Error) : void{
  console.error(error);
}

function MyOnChangePlugin(props: {onChange: (editorState: EditorState) => void}) : null{
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    })
  }, [onChange, editor]);
  return null;
}

function prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() !== null) {
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode(":"),
    );
    root.append(paragraph);
  }
}


export default function Editor({ pokemons } : EditorProps): JSX.Element{
  const { emojiPickerTriggered } = useEmojiClickEvent()

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [MentionNode, HeadingNode]
    };


    if (emojiPickerTriggered){
      prepopulatedRichText()
    }
    
      return (
        <LexicalComposer initialConfig={initialConfig}>
          <div className="tool-bar">
            <EmojiTrigger />
            <HeadingPlugin/>
          </div>
          <EmojiPickerPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-container"/>}
            placeholder={
              <div 
              className="editor-placeholder">
                <div>Start your poke blog...</div>
                <div>You can use @-mentions to reference a pokemon,</div>
                <div>type : to enable emoji menu,</div>
                <div>or ctrl+z to undo.</div>

              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={(editorState) => {console.log(editorState)}}/>
          <NewMentionsPlugin pokemons={pokemons} />
        </LexicalComposer>
      );
}
