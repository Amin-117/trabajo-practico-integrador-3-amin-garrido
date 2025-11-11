export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy; {currentYear} <span>Amin Garrido - All rights reserved.</span>
      </p>
    </footer>
  );
};
