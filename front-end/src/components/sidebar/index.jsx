import React from 'react';
import Catalog from './catalog';
import Materials from './materials';
import OtherMaterials from './otherMaterials';

const Sidebar = (props) => {
    return (
        <div className="w-3/12 hidden lg:block relative">
            <Catalog />
            <Materials />
            <OtherMaterials />
        </div>
    );
};
export default Sidebar;
