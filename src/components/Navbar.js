import Link from 'next/link';
import { useVault } from '../context/VaultContext';

export default function Navbar() {
  const { currentUser, logoutUser } = useVault();

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      background: '#f8f9fa', 
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#6366f1' }}>
          <span style={{ color: '#6366f1' }}>Password</span> Vault
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#374151' }}>
          Home
        </Link>
        
        {currentUser ? (
          <>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: '#374151' }}>
              Dashboard
            </Link>
            <span style={{ color: '#6b7280' }}>
              Hi, {currentUser.name || currentUser.email || 'User'}
            </span>
            <button 
              onClick={logoutUser}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ textDecoration: 'none', color: '#374151' }}>
              Login
            </Link>
            <Link href="/register" style={{ textDecoration: 'none', color: '#374151' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}