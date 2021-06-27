const Logo = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 57 57"
    {...props}
  >
    <path fill="none" d="M0 0h56.65v56.44H0z"></path>
    <circle
      cx="355.51"
      cy="570.744"
      r="78.213"
      fill="url(#_Linear1)"
      transform="translate(-98.878 -175.87) scale(.35754)"
    ></circle>
    <path
      fill="#fff"
      d="M35.013 27.301a1 1 0 010 1.79l-9.849 4.924a1 1 0 01-1.447-.895v-9.849a1 1 0 011.447-.894l9.849 4.924z"
    ></path>
    <defs>
      <linearGradient
        id="_Linear1"
        x1="0"
        x2="1"
        y1="0"
        y2="0"
        gradientTransform="translate(277.297 570.744) scale(156.427)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff9581"></stop>
        <stop offset="1" stopColor="#ff0016"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
