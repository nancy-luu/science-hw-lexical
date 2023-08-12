import { useEffect } from 'react';
import { EditorState } from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
// import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import '../styles.css'
import NewMentionsPlugin from './NewMentionsPlugin';
import { MentionNode } from '../nodes/MentionNode';
import { Pokemon } from '../App';

interface EditorProps {
  pokemons: Pokemon[]
}

const theme = {
  // Theme styling goes here
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

export default function Editor({ pokemons } : EditorProps): JSX.Element{
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [MentionNode]
    };
    
      return (
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-container"/>}
            placeholder={
              <div 
              className="editor-placeholder">
                <div>Start your poke blog...</div>
                <div>You can use @-mentions to reference a pokemon or ctrl+z to undo</div>
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
