
import * as React from 'react'
import GitHub from './GitHub';
import RSS from './RSS';

const Footer: React.FC<{}> = props => {

  return (
    <footer>
      <GitHub />
      <RSS />
    </footer>
  );
}

export default Footer
