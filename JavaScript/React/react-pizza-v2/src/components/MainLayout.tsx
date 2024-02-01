import Header from './Header'

import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = (): React.JSX.Element => {

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
