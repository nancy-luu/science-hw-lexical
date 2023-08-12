import type { EditorConfig, LexicalNode, NodeKey } from 'lexical'
import { ElementNode } from "lexical";

export class EmojiNode extends ElementNode {
    
    constructor(key?: NodeKey){
        super(key);
    }

    static clone(node: EmojiNode): EmojiNode {
        return new EmojiNode(node.__key)
    }

    createDOM(config: EditorConfig): HTMLElement {
        const element = document.createElement('img');
        element.className = 'emoji';
        element.src = "../public/Pok%3F_Ball.webp"
        element.alt = 'emoji'
        return element;
    }
}

export function $createEmojiNode(): EmojiNode {
    return new EmojiNode();
}

// type guard function
export function $isBannerNode(node: LexicalNode) : node is EmojiNode {
    return node instanceof EmojiNode;
}


