// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-white text-xl font-bold mb-3">Batqui Traders</h3>
            <p className="text-sm leading-relaxed mb-4">
              Elevate Every Device — premium mobile accessories shipped nationwide across Pakistan.
            </p>
            <p className="text-xs">
              Karachi-based, delivering quality since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/shop" className="block hover:text-white transition-colors">Shop All</Link>
              <Link to="/shop?category=phone-cases" className="block hover:text-white transition-colors">Phone Cases</Link>
              <Link to="/shop?category=chargers-cables" className="block hover:text-white transition-colors">Chargers & Cables</Link>
              <Link to="/shop?category=power-banks" className="block hover:text-white transition-colors">Power Banks</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Categories</h4>
            <div className="space-y-2 text-sm">
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/shop?category=${cat.slug}`}
                  className="block hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {['instagram', 'facebook', 'tiktok'].map(platform => (
                <a
                  key={platform}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={platform}
                >
                  <span className="material-symbols-outlined text-lg">
                    {platform === 'instagram' ? 'photo_camera' : platform === 'tiktok' ? 'music_note' : 'public'}
                  </span>
                </a>
              ))}
              <a
                href="https://wa.me/923001234567"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-lg text-white">chat</span>
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-white text-sm font-medium mb-3">Payment Methods</h4>
              <div className="flex gap-2 flex-wrap">
                {['COD', 'EasyPaisa', 'JazzCash', 'Card'].map(method => (
                  <span
                    key={method}
                    className="text-[10px] px-2.5 py-1 bg-white/10 rounded-full text-white/60"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-center">
            Batqui Traders is Karachi-based and ships nationwide across Pakistan with Cash on Delivery, genuine warranty, and real customer support.
          </p>
          <p className="text-xs text-center mt-2 text-white/40">
            &copy; {new Date().getFullYear()} Batqui Traders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}