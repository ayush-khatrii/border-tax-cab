import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t py-8 mt-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Site links */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/insurance" className="hover:text-primary">Insurance</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">Contact Info</h3>
          <ul className="text-sm space-y-2">
            <li>Email: info@example.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Your City, India</li>
          </ul>
        </div>

        {/* Developer Credit */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Developer</h3>
            <p className="text-sm">
              Built by{" "}
              <a
                href="https://yourdevlink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Your Developer Name
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-6 pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EasyTax. All rights reserved.
      </div>
    </footer>
  );
}
