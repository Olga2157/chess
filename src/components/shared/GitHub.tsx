import * as React from 'react'

const GitHub: React.FC<{}> = props => {

  const gitHubClass = 'github';

  const targetValue = '_blank';

  const openLinkWay = 'noopener noreferrer';

  const gitHubText = 'github';

  const gitHubLink = "https://github.com/Olga2157";

  return (
    <a className={gitHubClass} href={gitHubLink} target={targetValue} rel={openLinkWay}>{gitHubText}</a>
  );
}

export default GitHub
