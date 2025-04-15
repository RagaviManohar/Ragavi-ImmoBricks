import type { Preview } from '@storybook/react'
import '../src/app/globals.css'; // Import the global CSS file for Tailwind styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;