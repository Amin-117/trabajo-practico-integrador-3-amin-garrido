export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <div className="container-fluid text-center">
        <p className="mb-0">
          &copy; {currentYear} <span>Amin Garrido - All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};
