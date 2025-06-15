import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaChartBar, FaBed, FaUserFriends, FaMoneyBill, FaUserTie,
    FaCog, FaFileAlt, FaCommentDots, FaBullhorn, FaSignOutAlt
} from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import logo from "../assets/logo.jpg"

const CustomSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const ownerMenu = [
        { label: 'Dashboard', icon: FaChartBar, path: '/owner/dashboard' },
        { label: 'Bookings', icon: FaFileAlt, path: '/owner/bookings' },
        { label: 'Rooms', icon: FaBed, path: '/owner/rooms' },
        { label: 'Customers', icon: FaUserFriends, path: '/owner/customers' },
        { label: 'Payments', icon: FaMoneyBill, path: '/owner/payments' },
        { label: 'Staff', icon: FaUserTie, path: '/owner/staff' },
        { label: 'Reports', icon: FaFileAlt, path: '/owner/reports' },
        { label: 'Reviews', icon: FaCommentDots, path: '/owner/reviews' },
        { label: 'Announcements', icon: FaBullhorn, path: '/owner/announcements' },
        { label: 'Settings', icon: FaCog, path: '/owner/settings' },
        { label: 'Logout', icon: FaSignOutAlt, path: '/owner/logout' },
    ];

    return (
        <Sidebar
            backgroundColor="#2a2a2a"
            borderRadius="20px"
            collapsed={collapsed}
            style={{
               
                minHeight: "100vh",
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
            }}

        >
            <div className="flex items-center justify-between p-3">
                {!collapsed && <img src={logo} className="h-[40px] mx-3" />}
                <HiMenu
                    className="text-white cursor-pointer text-xl my-4"
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>

            <Menu>
                {ownerMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <MenuItem
                            key={item.path}
                            icon={<Icon color={isActive ? '#ffffff' : '#bbbbbb'} size={18} />}
                            onClick={() => navigate(item.path)}
                            style={{
                                color: isActive ? '#ffffff' : '#bbbbbb',
                                backgroundColor: isActive ? '#3b3b3b' : 'transparent',
                                fontSize: '18px',
                                fontWeight: '400',
                                transition: 'all 0.2s',
                            }}
                            className="hover:bg-gray-700"
                        >
                            {item.label}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Sidebar>
    );
};

export default CustomSidebar;
