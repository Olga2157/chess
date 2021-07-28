import * as React from 'react'

const Loader: React.FC<{}> = props => {

  return (
    <div id="loader-id" className="loader-container">
      <div className="item item-1"></div>
      <div className="item item-2"></div>
      <div className="item item-3"></div>
      <div className="item item-4"></div>
    </div>
  );
}

export default Loader
