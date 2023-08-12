# Science HW
This React App has the following features:
- Utilizes a rich text Lexical editor
- Fetches 151 pokemon from the https://pokeapi.co/ api
- Supports undo/redo commands
- Has @-mention function to reference a pokemon
- Can add the selected pokemon into the Lexical editor window


## Getting started:
When the extracted file is open, run:
- `npm i` : to install dependencies
- `npm run dev`: to run the project in a Local browser


## Project Review:
Issues & Tradeoffs:
- The pokemon results are successfully fetched at the App component level - but I had an issue when I filtered through results in NewMentionsPlugin. The results are somehow being returned as an array of duplicates. To handle this, I mapped again over the duplicates array to return unique pokemon in the lookupService. Although this solution was suitable for the exercise, the additional looping may impact performance for larger data sets and I recognize that for this reason there could be room for optimization. 
- I challenged myself to create a custom plugin that would trigger the appearance of a select menu for emojis. My EmojiPickerPlugin was structured similarly to the NewMentionsPlugin but instead of having the menu render appearing at a typed character, I wanted the pokeball button to open the menu instead. In the code, I attempted to utilize useContext to have global access to the emojiPickerTriggered props. However, when diving deeper into the LexicalTypeaheadMenuPlugin, I realized that I would need to create a textNode that could satisfy the requirement of the LexicalTypeaheadMenuPlugin's menuRenderFn property. In simplest terms, having a button to force render a character (that could be hidden in css) so that that character could trigger an emoji window seemed overcomplex. Given more time, I would investigate further into Lexical's modules that expand utility.

Productionize:
- Given more time I would fix the issues as mentioend above as well as include error handling such as having a loading state in case the API does not fetch, provide informative error messages, and validations if I were to add additional features to the Lexical Composer that would require the user to input information. 

Additonal Notes:
- Axios was used to call the data. Mainly for the simplicity of syntax. 