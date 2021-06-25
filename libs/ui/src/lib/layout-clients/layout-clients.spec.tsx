import { render } from '@testing-library/react';

import LayoutClients from './layout-clients';

describe('LayoutClients', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutClients />);
    expect(baseElement).toBeTruthy();
  });
});
