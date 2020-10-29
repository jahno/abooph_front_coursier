import React, { Component,Fragment } from 'react'

import { Button } from 'antd';
import {
    Home,
    ShoppingCart
} from 'react-feather';
import { withRouter } from 'react-router-dom'
import { Hidden } from '@material-ui/core';

import SearchHeader from './searchHeader';
import Notification from './notification';
import UserMenu from './user-menu';
import Language from './language';
import { AlignLeft, Maximize2, Bell, MessageSquare, MoreHorizontal } from 'react-feather';

//images
import logo from 'assets/images/dashboard/multikart-logo.png'

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: true,
            rightSidebar: true,
            navMenus: false
        }
    }
    toggle() {
        this.setState(prevState => ({
            navMenus: !prevState.navMenus
        }));
    }
    showRightSidebar = () => {
        if (this.state.rightSidebar) {
            this.setState({ rightSidebar: false })
            document.querySelector(".right-sidebar").classList.add('show');
        } else {
            this.setState({ rightSidebar: true })
            document.querySelector(".right-sidebar").classList.remove('show');
        }
    }

    goFull = () => {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    render() {
        return (
            <Fragment>
                {/* open */}
                <div className="page-main-header open ">
                    <div className="main-header-right row">
                        <div className="main-header-left d-lg-none" >
                            <div className="logo-wrapper">
                                <a href="index.html">
                                    {/* <img className="blur-up lazyloaded" src={logo} alt="" /> */}
                                </a>
                            </div>
                        </div>
                        <div className="mobile-sidebar">
                            <div className="media-body text-right switch-sm">
                                <div className="logo-wrapper">
                                    <a href="index.html">
                                        <img className="blur-up lazyloaded" src={logo} alt="" />
                                    </a>
                                </div>
                                {/* <label className="switch"><a onClick={this.openCloseSidebar}><AlignLeft /></a></label> */}
                            </div>
                        </div>
                        <div className="nav-right col">
                            <ul className={"nav-menus " + (this.state.navMenus ? 'open' : '')}>
                                <li>
                                    <Hidden smUp>
                                        <Home onClick={() => this.props.history.push('/')}/>
                                    </Hidden>

                                    <Hidden xsDown>
                                        <Button onClick={() => this.props.history.push('/')} type="link">Dashboard</Button>
                                    </Hidden>
                                </li>

                                <li>
                                    <Hidden smUp>
                                        <ShoppingCart onClick={() => this.props.history.push('/commandes')}/>

                                    </Hidden>

                                    <Hidden xsDown>
                                        <Button onClick={() => this.props.history.push('/commandes')} type="link">Commandes</Button>
                                    </Hidden>
                                </li>

                                <li>
                                    <SearchHeader />
                                </li>

                                <li><a onClick={this.goFull} className="text-dark" href="#!"><Maximize2 /></a></li>

                                <UserMenu />
                            </ul>
                            <div className="d-lg-none mobile-toggle pull-right" onClick={() => this.toggle()}><MoreHorizontal /></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Header)
