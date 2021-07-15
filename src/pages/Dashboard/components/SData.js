import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Recipes",
    // path: '/dashboard/recipe',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "List Recipe",
        path: "/dashboard/recipe",
        icon: <IoIcons.IoIosListBox />,
        cName: "sub-nav",
      },
      {
        title: "Adding Recipe",
        path: "/dashboard/recipe/add",
        icon: <IoIcons.IoIosRocket />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Food Category",
    path: "/dashboard/fc",
    icon: <IoIcons.IoIosArchive />,
  },
  {
    title: "Tips",
    path: "/dashboard/tips",
    icon: <IoIcons.IoIosShare />,
  },

  {
    title: "Account",
    // path: '/dashboard/user',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Profile",
        path: "/dashboard/user",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Change Password",
        path: "/dashboard/user/changepw",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Create Admin",
        path: "/dashboard/user/create",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
