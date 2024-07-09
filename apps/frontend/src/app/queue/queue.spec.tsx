import { render } from '@testing-library/react';

import Queue from './queue';

describe('Queue', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Queue  reload/>);
    expect(baseElement).toBeTruthy();
  });
});
