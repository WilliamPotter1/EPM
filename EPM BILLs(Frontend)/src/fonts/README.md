# VAG Rounded BT Fonts

This folder contains the VAG Rounded BT font for the application.

## Available Font Files

The following font files are currently available:

- `VAG Rounded BT.woff2` - Web Open Font Format 2.0 (22KB)
- `VAG Rounded BT.ttf` - TrueType Font (43KB)

## How to Obtain the Font Files

### Option 1: Purchase License
- Purchase a license for VAGRounded BT Regular from Bitstream
- Ensure you have proper licensing for web use
- Download the font files from the licensed source

### Option 2: Use System Font
- VAGRounded BT Regular is often available as a system font
- Check if it's installed on your system
- Copy the font files from your system fonts folder

### Option 3: Use Similar Fonts
If you cannot obtain the official EPM font, consider using similar alternatives:
- **Poppins** - Similar rounded, modern sans-serif
- **Inter** - Clean, professional sans-serif
- **Nunito** - Rounded, friendly sans-serif

## Font Usage

The font is configured in `src/App.css` with the following @font-face rule:

```css
@font-face {
  font-family: 'VAG Rounded BT';
  src: url('./fonts/VAG Rounded BT.woff2') format('woff2'),
       url('./fonts/VAG Rounded BT.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Current Status

✅ **Font files are available and configured.**
The VAG Rounded BT font is properly loaded and ready to use throughout the application.

## Fallback Fonts

The application uses these fallback fonts if EPM fonts are not available:
- Poppins
- Arial
- Helvetica
- sans-serif 