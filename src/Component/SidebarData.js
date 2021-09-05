
import React from 'react';
import './Navbar.css';
import { FaHistory, FaUserCog, FaClipboardCheck } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GiCash ,GiCardboardBox} from "react-icons/gi";
import { ImTruck } from "react-icons/im";
import { RiInboxArchiveLine, RiInboxUnarchiveLine,RiHistoryLine } from "react-icons/ri";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import{ BsFillPieChartFill } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";

export const SidebarData = [
  {
    title: 'HOME',
    path: '/home',
    icon: <AiFillHome color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'DASHBOARD',
    path: '/dashboard',
    icon: <BsFillPieChartFill color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'INVENTORY COST',
    path: '/inventoryCost',
    icon: <GiCash color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'STOCK & COUNTING',
    path: '/stock',
    icon: <GiCardboardBox color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'ORDERING',
    path: '/ordering',
    icon: <RiInboxArchiveLine color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'PICKING',
    path: '/picking',
    icon: <RiInboxUnarchiveLine color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'ORDER CONFIRMATION',
    path: '/orderConfirm',
    icon: <HiOutlineClipboardCheck color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'RETURN ORDER',
    path: '/returned',
    icon: <ImTruck color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'HISTORY',
    path: '/history',
    icon: <RiHistoryLine color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'MEMBER MANAGEMENT',
    path: '/memberManage',
    icon: <FaUserCog color = 'black' />,
    cName: 'nav-text'
  },
  {
    title: 'LOGOUT',
    path: '/',
    icon: <IoLogOutOutline color = 'black' />,
    cName: 'nav-text'
  },
];