import "./Footer.css";

function Footer() {
  return (
    <footer className='w-100 p-5 bg-dark d-flex justify-content-center align-items-center'>
      <span>Pixel War &copy; {new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
