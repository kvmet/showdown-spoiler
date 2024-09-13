# showdown-spoiler
Spoiler Formatting for Showdown

## Installation

- Include `showdown-spoiler.js` script in your webpage.

```html
<script defer type="text/javascript" src="js/showdown-spoiler.js"></script>
```

- Call `spoiler()` when you initialize the showdown converter.

```javascript
var converter = new showdown.Converter({
  extensions: [
    spoiler(),
  ],
});
```

## Usage

This plugin uses the common double-pipe (||) format for hiding spoilers. 

```markdown
If you have something that you want to hide, make it a ||spoiler||!

This also ||supports  
text across multiple lines  
if you need it to.||
```

