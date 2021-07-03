const Logo = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        fill="url(#paint0_linear)"
        d="M10.483 20.974c5.792 0 10.487-4.696 10.487-10.487C20.97 4.695 16.275 0 10.483 0 4.692 0-.003 4.695-.003 10.487c0 5.791 4.695 10.487 10.486 10.487z"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M13.027 10.151a.375.375 0 010 .671l-3.694 1.847a.375.375 0 01-.542-.336V8.64a.375.375 0 01.542-.335l3.694 1.846z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="-0.003"
        x2="20.97"
        y1="10.487"
        y2="10.487"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF9581"></stop>
        <stop offset="1" stopColor="#FF0016"></stop>
      </linearGradient>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h21v21H0z"></path>
      </clipPath>
    </defs>
  </svg>

  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   fillRule="evenodd"
  //   strokeLinejoin="round"
  //   strokeMiterlimit="2"
  //   clipRule="evenodd"
  //   // viewBox="0 0 57 57"
  //   viewBox="0 0 150 150"
  //   {...props}
  // >
  //   <path fill="none" d="M0 0h56.65v56.44H0z"></path>
  //   <circle
  //     cx="355.51"
  //     cy="570.744"
  //     r="78.213"
  //     fill="url(#_Linear1)"
  //     transform="translate(-98.878 -175.87) scale(.35754)"
  //   ></circle>
  //   <path
  //     fill="#fff"
  //     d="M35.013 27.301a1 1 0 010 1.79l-9.849 4.924a1 1 0 01-1.447-.895v-9.849a1 1 0 011.447-.894l9.849 4.924z"
  //   ></path>
  //   <defs>
  //     <linearGradient
  //       id="_Linear1"
  //       x1="0"
  //       x2="1"
  //       y1="0"
  //       y2="0"
  //       gradientTransform="translate(277.297 570.744) scale(156.427)"
  //       gradientUnits="userSpaceOnUse"
  //     >
  //       <stop offset="0" stopColor="#ff9581"></stop>
  //       <stop offset="1" stopColor="#ff0016"></stop>
  //     </linearGradient>
  //   </defs>
  // </svg>
);

export default Logo;
