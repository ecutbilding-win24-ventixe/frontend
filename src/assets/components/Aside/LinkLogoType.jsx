import Logo from '/images/Symbol.svg'

const LinkLogoType = () => {
  return (
    <div className="link-logotype">
      <a href="" >
        <img src={Logo} alt="Ventixe" className="ventix-logo" />
        <span className="logotype">Ventixe</span>
      </a>
    </div>
  )
}

export default LinkLogoType