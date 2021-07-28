import * as React from 'react'

const RSS : React.FC<{}> = props => {

    const rssClass = 'rss';

    const targetValue = '_blank';

    const openLinkWay = 'noopener noreferrer';

    const rssYearClass = 'rss-year';

    const rssYearText = "'21";

    const rssLink = "https://rs.school/js/";

        return (
            <a className={rssClass} href={rssLink} target={targetValue} rel={openLinkWay}>
                <span className={rssYearClass}>{rssYearText}</span>
            </a>
        );
}

export default RSS
