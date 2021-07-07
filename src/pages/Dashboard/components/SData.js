import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Recipes',
    path: '/dashboard/recipe',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'List Recipe',
        path: '/dashboard/recipe',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Adding Recipe',
        path: '/dashboard/recipe/add',
        icon: <IoIcons.IoIosRocket />,
        cName: 'sub-nav'
      },      
    ]
  },
  {
    title: 'Tips',
    path: '/dashboard/tips',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Register',
    path: '/dashboard/register',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Account',
    path: '/dashboard/user',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Profile',
        path: '/dashboard/user/profile',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];