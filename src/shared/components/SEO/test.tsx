import { render } from '@testing-library/react';
import React from 'react';
import SEO from './index';

test('renders without crashing', () => {
  render(<SEO />);
});
