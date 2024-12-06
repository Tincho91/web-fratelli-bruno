import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sepia text-old-paper">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Fratelli Bruno. Tutti i diritti riservati.</p>
          </div>
          <div className="flex space-x-2">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
