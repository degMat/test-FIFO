import { render } from '@testing-library/react';

import AjoutAction from './ajout-action';

describe('AjoutAction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AjoutAction  onActionAdded={() => ''}/>);
    expect(baseElement).toBeTruthy();
  });
});
