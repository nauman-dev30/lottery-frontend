// components/LogoutButton.js
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useDisconnect } from "wagmi"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/features/web3Slices/userSlice";
export default function LogoutButton() {
    // const { setToken, setUser } = useAuth();
    const dispatch = useDispatch();
    const { disconnect } = useDisconnect()
    const router = useRouter();
    return (
        <a
            className="item"
            onClick={() => {
                disconnect();
                // localStorage.removeItem('authToken');
                // localStorage.removeItem('authUser');
                // setToken(null);
                // setUser(null);
                router.push('/');
                dispatch(setUserData(null))
            }}
        >
            <i className="icon-log-out me-1" />
            Log out
        </a>
    );
}
