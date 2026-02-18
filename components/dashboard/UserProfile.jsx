'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useDisconnect } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const disconnect = useDisconnect()

  const handleLogout = async () => {
    disconnect()
    logout();
  };

  return (
    <div className="header-account">
      <div className="popup-wrap account">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="popup-top">
              <span className="image">
                <Image
                  alt=""
                  src="/images/avatar/user-1.png"
                  width={100}
                  height={100}
                />
              </span>
              <span className="name">
                <span className="text">{user?.email || 'User'}</span>
                <i className="icon-arrow-down" />
              </span>
            </span>
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <Link href={`/dashboard-my-account`} className="item">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  className="me-1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4993 4C10.4993 4.66304 10.2359 5.29893 9.7671 5.76777C9.29826 6.23661 8.66237 6.5 7.99933 6.5C7.33629 6.5 6.70041 6.23661 6.23157 5.76777C5.76273 5.29893 5.49933 4.66304 5.49933 4C5.49933 3.33696 5.76273 2.70107 6.23157 2.23223C6.70041 1.76339 7.33629 1.5 7.99933 1.5C8.66237 1.5 9.29826 1.76339 9.7671 2.23223C10.2359 2.70107 10.4993 3.33696 10.4993 4ZM3 13.412C3.02142 12.1002 3.55756 10.8494 4.49278 9.92936C5.42801 9.00929 6.68739 8.49365 7.99933 8.49365C9.31127 8.49365 10.5707 9.00929 11.5059 9.92936C12.4411 10.8494 12.9772 12.1002 12.9987 13.412C11.4303 14.1312 9.72477 14.5023 7.99933 14.5C6.21533 14.5 4.522 14.1107 3 13.412Z"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                My account
              </Link>
            </li>

            <li>
              <Link href={`/dashboard-wallet`} className="item">
                <i className="icon-wallet me-1" />
                Wallet
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="item">
                <i className="icon-log-out me-1" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;