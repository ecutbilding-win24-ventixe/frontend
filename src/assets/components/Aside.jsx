import React from 'react';
import Nav from './Aside/Nav';
import LinkLogoType from './Aside/LinkLogoType';

const Aside = () => {
  return (
    <aside className="sidebar">
      <LinkLogoType />
      <Nav />
    </aside>
  );
};

export default Aside;
