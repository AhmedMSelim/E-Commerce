import Link from "next/link";
import Image from "next/image";
import fresh from "../../../../public/freshcart-logo.49f1b44d.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Brands", href: "/brands" },
      { name: "Electronics", href: "/products?category=electronics" },
      { name: "Men's Fashion", href: "/products?category=mens" },
    ],
    account: [
      { name: "My Account", href: "/profile" },
      { name: "Order History", href: "/profile/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Sign In", href: "/login" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Track Order", href: "/track-order" },
    ],
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container-[90%] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <Image
                  src={fresh}
                  alt="FreshCart Logo"
                  width={160}
                  height={31}
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <FaPhoneAlt className="text-green-500" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <FaEnvelope className="text-green-500" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-green-500 mt-0.5" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </Link>
                ),
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5 capitalize">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-[90%] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Visa", "Mastercard", "PayPal"].map((pay) => (
                <div
                  key={pay}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <FaCreditCard />
                  <span>{pay}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
