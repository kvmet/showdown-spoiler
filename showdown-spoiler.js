// showdown-spoiler
//
// copyright 2024 kvmet (Kristen Metcalfe)
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the “Software”), to deal
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software. 
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS 
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

'use strict';

const SPOILER_CLASS = 'showdown-spoiler';

const spoiler = function() {
  return [
    {
      type: 'output',
      filter: function(text) {
        // Split the text into code blocks and non-code blocks
        const parts = text.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/gi);
        
        return parts.map(part => {
          // If this part is a code block, return it unchanged
          if (part.startsWith('<pre') || part.startsWith('<code')) {
            return part;
          }
          // Otherwise, apply the spoiler replacement
          return part.replace(/\|\|((?:(?!<\/).|\n)+?)\|\|/g, function(match, content) {
            return `<span class="${SPOILER_CLASS}">` + content.trim() + '</span>';
          });
        }).join('');
      }
    }
  ];
};

// Add Styling
const showdownSpoilerStyle = document.createElement('style');
showdownSpoilerStyle.innerHTML = `
  .${SPOILER_CLASS} {
    background-color: #000;
    color: #000;
    padding: 0 3px;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
  }
  .${SPOILER_CLASS}.revealed {
    background-color: transparent;
    color: inherit;
    border: 1px dotted #888;
  }
`;
document.head.appendChild(showdownSpoilerStyle);

// Register Extension with Showdown if Available
if (typeof showdown !== 'undefined' && showdown.extension) {
  showdown.extension('spoiler', spoiler);
}

// Event listener for revealing spoilers
document.addEventListener('click', function(e) {
  const element = e.target.closest(`.${SPOILER_CLASS}`);
  if (element) {
    element.classList.toggle('revealed');
  }
});
