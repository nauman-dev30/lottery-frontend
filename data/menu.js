export const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const dashboardMenuItems = [
  {
    label: "Dashboard",
    icon: "icon-home",
    href: "/dashboard",
    active: true,
  },
  {
    label: "Contest",
    icon: "icon-game",
    hasChildren: true,
    subMenu: [
      {
        label: "Active Contest",
        href: "/dashboard-contest",
      },
      {
        label: "Ended Contest",
        href: "/dashboard-old-contest",
      },
    ],
  },
  {
    label: "Reports",
    icon: "icon-ticket",
    hasChildren: true,
    subMenu: [
      {
        label: "Referral Income Report",
        href: "/Referral-Income-Report",
      },
      {
        label: "Level Income Report",
        href: "/level-income-report",
      },
      {
        label: "Ticket Purchase Report",
        href: "/ticket-purchase-report",
      },
      {
        label: "Wining Report",
        href: "/wining-report",
      },
      {
        label: "Admin Commission Report",
        href: "/admin-commission-report",
        adminPage: true,
      },
    ],
  },
  // {
  //   label: "Scratch offs",
  //   icon: "icon-scratch-offs",
  //   href: "/dashboard-scratch-offs",
  // },
  // {
  //   label: "Wallet",
  //   icon: "icon-wallet",
  //   href: "/dashboard-wallet",
  // },
  {
    label: "Affiliate",
    icon: "icon-affiliate",
    href: "/dashboard-affiliate",
  },
  // {
  //   label: "My favorite",
  //   icon: "icon-my-favorite",
  //   href: "/dashboard-my-favorite",
  // },
  {
    label: "Support",
    icon: "icon-faq",
    href: "/dashboard-support",
  },
  // {
  //   label: "My account",
  //   icon: "icon-rev-share",
  //   href: "/dashboard-my-account",
  // },
  {
    label: "Logout",
    icon: "icon-log-out",
    href: "/logout",
  },
  {
    label: "Create Draw",
    icon: "icon-rev-share",
    href: "/dashboard-create-draw",
    adminPage: true,
  },
  {
    label: "See All Draws",
    icon: "icon-rev-share",
    href: "/dashboard-see-all-draws",
    adminPage: true,
  },
  {
    label: "Wallet Updation Requests",
    icon: "icon-rev-share",
    href: "/wallet-updation-requests",
    adminPage: true,
  },
];
