import Logo from './public/images/Symbol.svg'

const LinkLogoType = () => {
  return (
    <div className="link-logotype">
      <a href="" >
        <img src={Logo} alt="Ventixe" className="logo" />
        <span className="logotype">Ventixe</span>
      </a>
    </div>
  )
}

export default LinkLogoType