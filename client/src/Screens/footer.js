import React, {Component} from "react";
import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Badge from '@material-ui/core/Badge';
import "./style.css";

class Footer extends Component {
  constructor(prop) {
    super(prop);
  }
  render(prop){
  return (
    <nav className="tab" style={(localStorage.getItem("mode") === "light") ? {backgroundColor: "#f6f6f6", boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.3), 0px 0px 5px rgba(80, 80, 80, 0.3)"} : null}>

<NavLink
        activeClassName="current"
        className={(localStorage.getItem("mode") === "light") ? "navlink2" : "navlink"}
        to={`/home?oau=true`}
      >
       {/* <span class="iconify" data-icon="ri:home-2-line" data-inline="false"></span> */}
       <span class="iconify" data-icon="ci:home-alt-fill"></span>
      </NavLink>

      {/* <NavLink
        className={(localStorage.getItem("mode") === "light") ? "navlink2" : "navlink"}
        activeClassName="current"
        to={`/assignments?oau=true`}
      >
       <span class="iconify" data-icon="wpf:books" data-inline="false"></span>
      </NavLink> */}

      <NavLink
        className={(localStorage.getItem("mode") === "light") ? "navlink2" : "navlink"}
        activeClassName="current"
        to={`/profile`}
      >
        <span class="iconify" data-icon="raphael:users" data-inline="false"></span>
      </NavLink>

      {/* <NavLink
        className={(localStorage.getItem("mode") === "light") ? "navlink2" : "navlink"}
        activeClassName="current"
        to={`/tutorials?oau=true`}>
          <span class="iconify" data-icon="la:chalkboard-teacher" style={{fontWeight: "bolder", fontSize: "36px"}} data-inline="false"></span>
      </NavLink> */}

      {/* <NavLink
          className={(localStorage.getItem("mode") === "light") ? "navlink2" : "navlink"}
          activeClassName="current"
          onClick={() => {
            localStorage.setItem('note', "0")}}
          to="/friends?oau=true"
        >
          {localStorage.getItem('note') !=="0" ?
          <Badge badgeContent={parseInt(localStorage.getItem("note"))} max={10} color="error">
            <span class="iconify" data-icon="ls:comments" data-inline="false"></span>
          </Badge>
          :
          <span class="iconify" data-icon="ls:comments" data-inline="false"></span> 
          }
          
        </NavLink> */}

    </nav>
  );
          }
}

export default Footer;
