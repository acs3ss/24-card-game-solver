# 24-card-game-solver

Available online at https://acs3ss.github.io/24-card-game-solver! 

## Python usage

```python
python play24.py
```

Two game modes:
- Play 24 with randomly generated cards 
- Check solutions

## Web development

1. `npm install`
1. `npm run dev`
1. Open http://localhost:5173

### Service worker development

The service worker is only included in the production build.
If making changes to the service worker or if you otherwise want to test its functionality,
you'll need to build for production instead and start a separate local server.

1. `npm run build:watch`
1. `npm run serve`
1. Open http://localhost:4173

## Acknowledgements

Card images from https://www.me.uk/cards/.
Light cards use default colors.
Dark cards use #343A40 (gray-800) for the background, #E35D6A (red-400) for the red pips, and #F8F9FA (gray-100) for the black pips.
