const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center w-full bg-card text-muted-foreground">
      <p className="py-4 text-sm">
        Made with ❤️ by{" "}
        <a
          href="https://zsyihab.com"
          className="text-kappa-green"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zaky Syihab
        </a>
      </p>
    </footer>
  );
};

export default Footer;
