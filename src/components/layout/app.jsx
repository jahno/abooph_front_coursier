import React, { Fragment } from 'react'

import Sidebar from '../common/sidebar_components/sidebar';
import RightSidebar from '../common/right-sidebar';
import Footer from '../common/footer';
import Header from '../common/header_components/header';

export default function App({children}) {
    
    // const [state, setState] = useState({ltr:true, divName: 'RTL'})

    // function ChangeRtl(divName){
    //     if(divName === 'RTL') {
    //         document.body.classList.add('rtl');
    //         setState(state => ({...state, divName: 'LTR'}));
    //     }else{
    //         document.body.classList.remove('rtl');
    //         setState(state => ({...state, divName: 'RTL'}));
    //     }
    // }

    return (
        <Fragment>
            <div className="page-wrapper" >
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar/>
                    <RightSidebar/>
                    <div className="page-body">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
            {/* <div className="btn-light custom-theme" onClick={ () => ChangeRtl(state.divName)}>{state.divName}</div> */}
        </Fragment>
    )
}
