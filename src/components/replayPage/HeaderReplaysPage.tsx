import * as React from 'react'
import AppButton from '../shared/AppButton';
import Logo from '../shared/Logo';


export const HeaderReplaysPage = () => {

    return (
        <header>
            <Logo/>
            <nav className="navigation-buttons">
                <AppButton buttonId="back-to-lobby" buttonText="TO LOBBY" path="/"/>
            </nav>
        </header>
    );
}

export default HeaderReplaysPage
