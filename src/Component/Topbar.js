import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css'
import { Nav, Navbar, Button, Form, FormControl, NavDropdown } from 'react-bootstrap'
import history from '../history'

import Hamburger from './Hamburger';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            name: props.user,
        };
    }

    render() {
        return (
            <div class="topbar">
                <Navbar >
                    <Navbar href="/" style={{ color: 'white', height: 40, fontSize: 20 }} onClick={() => history.push('/home')}  >
                        <img
                            src="https://scontent.fbkk11-1.fna.fbcdn.net/v/t1.15752-9/152237023_129232515675141_1331579132455301323_n.png?_nc_cat=107&ccb=3&_nc_sid=ae9488&_nc_ohc=6pHEX8RMxnUAX9IurH4&_nc_ht=scontent.fbkk11-1.fna&oh=97ee3e7acba83e5b06fbb3574d54aa68&oe=605471E7"
                            height="50"
                            alt=""
                            loading="lazy"
                        />KLUNG CHANA
                    </Navbar>
                    <h1>{this.state.page}</h1>
                    <a1>{this.state.name}</a1>
                </Navbar>
            </div>
        )
    }
}

export default Topbar