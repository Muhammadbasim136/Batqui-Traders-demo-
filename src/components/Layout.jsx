import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WhatsAppButton from './WhatsAppButton';
import Toast from './Toast';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { toast } = useCart();
  
  return (
    <div className="min-h-screen">
      <Header />
      {/* ⚠️ MAIN SE PT-0 KARO - hero section khud sambhal lega */}
      <main className="pt-0">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      {toast && <Toast message={toast} />}
    </div>
  );
}