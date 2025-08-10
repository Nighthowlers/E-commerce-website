function Footer() {
  return (
    <footer className="bg-primary text-white p-4 dark:bg-gray-800 transition">
      <div className="container mx-auto text-center">
        <p className="text-gray-200 dark:text-gray-300 transition">&copy; 2025 E-commerce Store. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="#" className="hover:text-accent transition dark:hover:text-yellow-300">About</a>
          <a href="#" className="hover:text-accent transition dark:hover:text-yellow-300">Contact</a>
          <a href="#" className="hover:text-accent transition dark:hover:text-yellow-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;