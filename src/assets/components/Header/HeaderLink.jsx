import React from "react";
import { useLocation, Link } from "react-router-dom";

const HeaderLink = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  let currentPath = "";

  const crumbs = pathParts.map((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === pathParts.length - 1;

    return (
      <span key={index}>
        {!isLast ? (
          <>
            <Link to={currentPath} className="breadcrumb-link">
              {decodeURIComponent(part)}
            </Link>
            <span className="breadcrumb-separator"> / </span>
          </>
        ) : (
          <span className="breadcrumb-current">{decodeURIComponent(part)}</span>
        )}
      </span>
    );
  });

  return (
    <div className="breadcrumb-header">
      <span className="breadcrumb-main">Dashboard /</span>
      {crumbs.length > 0 ? crumbs : <span className="breadcrumb-current"></span>}
    </div>
  );
};

export default HeaderLink;
