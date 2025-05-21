import React from 'react'
import HeaderLink from './Header/HeaderLink'
import Notification from './Header/Notification'
import Account from './Header/Account'

const Header = () => {
  return (
    <header className="header">
      <HeaderLink />
      <Notification />
      <Account />
    </header>
  )
}

export default Header