import React from 'react'
import Nav from './Aside/Nav'
import LinkLogoType from './Aside/LinkLogoType'

export const Aside = () => {
  return (
    <aside className="sidebar">
      <LinkLogoType />
      <Nav />
    </aside>
  )
}
