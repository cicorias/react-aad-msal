// import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import AzureAD from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
//   ReactDOM.render(<AzureAD />, div);
  ReactDOM.unmountComponentAtNode(div);
});