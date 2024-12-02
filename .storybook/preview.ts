import type { Preview } from '@storybook/react';
import '../src/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
    nextjs: {
      appDirectory: true,
    },
  },
  loaders: [mswLoader],
};

export default preview;
