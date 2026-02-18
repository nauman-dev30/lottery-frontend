"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { formatUnits } from "viem";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { exportToCSV } from "@/utils/csvExport";

export default function AdminCommissionReport() {
    const router = useRouter();
    const { address } = useAccount();
    const ownerAddress = useSelector((state) => state.trdoLottery.ownerAddress);
    const trdoDecimals = useSelector((state) => state.trdoToken.trdoDecimals);
    const [searchTerm, setSearchTerm] = useState("");
    const [columnFilters, setColumnFilters] = useState({
        type: "",
        drawId: "",
        transactionHash: "",
        sponsor: "",
        dateTime: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;
    const userData = useSelector((state) => state.user.userData);
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const [reports, setReports] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    // Debounce function for search
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Fetch reports from API
    const fetchReports = useCallback(async () => {
        // if (!userData?.walletAddress) return; // Admin report might not need wallet address check if public or protected by route, but sticking to pattern

        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE}/api/v1/getAdminCommissionReport`, {
                params: {
                    userWalletAddress: userData?.walletAddress,
                    page: currentPage,
                    limit: itemsPerPage,
                    searchTerm: searchTerm,
                    type: columnFilters.type,
                    drawId: columnFilters.drawId,
                    sponsor: columnFilters.sponsor,
                    date: columnFilters.dateTime,
                }
            });

            if (response.data.success) {
                setReports(response.data.reports);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error("Error fetching admin reports:", error);
        } finally {
            setLoading(false);
        }
    }, [userData, currentPage, searchTerm, columnFilters, API_BASE]);

    // Debounced fetch for search and filters
    const debouncedFetch = useCallback(
        debounce(() => {
            setCurrentPage(1);
            fetchReports();
        }, 500),
        [fetchReports]
    );

    // Fetch on mount and when currentPage changes
    useEffect(() => {
        fetchReports();
    }, [currentPage, userData]);

    // Protect Admin Route
    useEffect(() => {
        if (address && ownerAddress) {
            if (address.toLowerCase() !== ownerAddress.toLowerCase()) {
                router.push("/dashboard");
            }
        }
    }, [address, ownerAddress, router]);

    // Debounced fetch when search or filters change
    useEffect(() => {
        if (currentPage === 1) {
            debouncedFetch();
        }
    }, [searchTerm, columnFilters]);

    const handleColumnFilterChange = (column, value) => {
        setColumnFilters(prev => ({ ...prev, [column]: value }));
    };

    const clearFilters = () => {
        setSearchTerm("");
        setColumnFilters({
            type: "",
            drawId: "",
            sponsor: "",
            dateTime: ""
        });
        setCurrentPage(1);
    };

    const formatAmount = (amount) => {
        if (!amount) return "0";
        const formatted = formatUnits(amount, trdoDecimals);
        return Number(formatted).toFixed(2);
    };

    const handleExportCSV = () => {
        if (reports.length === 0) {
            alert("No data to export");
            return;
        }
        // Map data to a cleaner format for CSV
        const exportData = reports.map((r, index) => ({
            "Sr #": pagination.totalRecords - ((currentPage - 1) * itemsPerPage + index),
            "Type": r.type,
            "Draw ID": r.drawId || "N/A",
            "Amount (USDT)": formatAmount(r.amount),
            "Sponsor": r.sponsor || "N/A",
            "Timestamp": new Date(r.timestamp).toLocaleString()
        }));
        exportToCSV(exportData, "Admin_Commission_Report");
    };

    return (
        <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowX: "hidden", // 🔑 IMPORTANT
          margin:"auto",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    
        }}  
        >
                  <div   
      style={{
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
        }}>
                {/* Header */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    animation: "fadeInDown 0.6s ease-out"
                }}>
                    <h1 style={{
                        fontSize: "42px",
                        fontWeight: "700",
                        background: "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "12px",
                        letterSpacing: "-0.5px"
                    }}>
                        Admin Commission Report
                    </h1>
                    <p style={{
                        color: "#a8b3cf",
                        fontSize: "16px",
                        fontWeight: "400"
                    }}>
                        Monitor admin commission events and fee transfers
                    </p>
                </div>

                <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    marginBottom: "24px",
                    animation: "fadeIn 0.6s ease-out 0.3s backwards"
                }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                        <input
                            type="text"
                            placeholder="Search all columns..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            style={{
                                flex: "1",
                                minWidth: "250px",
                                padding: "14px 20px",
                                background: "rgba(255, 255, 255, 0.08)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                outline: "none",
                                transition: "all 0.3s ease"
                            }}
                            onFocus={e => {
                                e.target.style.background = "rgba(255, 255, 255, 0.12)";
                                e.target.style.borderColor = "#ff6b4a";
                                e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 74, 0.1)";
                            }}
                            onBlur={e => {
                                e.target.style.background = "rgba(255, 255, 255, 0.08)";
                                e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                        <button
                            onClick={handleExportCSV}
                            style={{
                                padding: "14px 28px",
                                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.4)";
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
                            }}
                        >
                            Export CSV
                        </button>
                        <button
                            onClick={clearFilters}
                            style={{
                                padding: "14px 28px",
                                background: "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(255, 107, 74, 0.3)"
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 74, 0.4)";
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(255, 107, 74, 0.3)";
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "20px", color: "#fff" }}>
                        <div style={{ fontSize: "18px" }}>Loading...</div>
                    </div>
                )}

                {/* Table */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    overflow: "hidden",
                    animation: "fadeInUp 0.6s ease-out 0.4s backwards",
                    width: "100%",
                    opacity: loading ? 0.5 : 1
                }}>
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              tableLayout: "fixed",
              minWidth: "1100px", 
            }}
          >
                            <thead>
                                <tr style={{
                                    borderBottom: "2px solid rgba(255, 107, 74, 0.3)"
                                }}>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>Sr #</th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>
                                        <div>Type</div>
                                        <select
                                            value={columnFilters.type}
                                            onChange={(e) => handleColumnFilterChange("type", e.target.value)}
                                            style={{
                                                marginTop: "8px", width: "100%", padding: "8px 12px", background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none"
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="" style={{ color: "black" }}>All Types</option>
                                            <option value="AdminCommissionPaid" style={{ color: "black" }}>Admin Commission Paid</option>
                                            <option value="LockedCommissionPaid" style={{ color: "black" }}>Locked Commission Paid</option>
                                            <option value="AdminFeeTransferred" style={{ color: "black" }}>Admin Fee Transferred</option>
                                        </select>
                                    </th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>
                                        <div>Draw ID</div>
                                        <input
                                            type="text" placeholder="Filter..." value={columnFilters.drawId}
                                            onChange={(e) => handleColumnFilterChange("drawId", e.target.value)}
                                            style={{ marginTop: "8px", width: "100%", padding: "8px 12px", background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>Amount</th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>
                                        <div>Sponsor / Details</div>
                                        <input
                                            type="text" placeholder="Filter sponsor..." value={columnFilters.sponsor}
                                            onChange={(e) => handleColumnFilterChange("sponsor", e.target.value)}
                                            style={{ marginTop: "8px", width: "100%", padding: "8px 12px", background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>Levels</th>
                                    <th style={{ padding: "20px", textAlign: "left", color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" }}>
                                        <div>Date & Time</div>
                                        <input
                                            type="text" placeholder="Filter date..." value={columnFilters.dateTime}
                                            onChange={(e) => handleColumnFilterChange("dateTime", e.target.value)}
                                            style={{ marginTop: "8px", width: "100%", padding: "8px 12px", background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...reports].map((report, index) => (
                                    <tr
                                        key={report._id}
                                        style={{
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                            transition: "all 0.3s ease",
                                            animation: `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        <td style={{ padding: "20px", color: "#a8b3cf", fontSize: "15px", fontWeight: "600" }}>
                                            {pagination.totalRecords - ((currentPage - 1) * itemsPerPage + index)}
                                        </td>
                                        <td style={{ padding: "20px", color: "#fff", fontSize: "15px", fontWeight: "600" }}>
                                            {report.type === 'AdminCommissionPaid' && <span style={{ color: '#4ade80' }}>Admin Commission</span>}
                                            {report.type === 'LockedCommissionPaid' && <span style={{ color: '#facc15' }}>Locked Commission</span>}
                                            {report.type === 'AdminFeeTransferred' && <span style={{ color: '#60a5fa' }}>Admin Fee</span>}
                                        </td>
                                        <td style={{ padding: "20px", color: "#a8b3cf", fontSize: "15px" }}>
                                            {report.drawId || "N/A"}
                                        </td>
                                        <td style={{ padding: "20px", color: "#fff", fontSize: "15px", fontWeight: "700" }}>
                                            {formatAmount(report.amount)} USDT
                                        </td>
                                        <td style={{ padding: "20px", color: "#a8b3cf", fontSize: "14px" }}>
                                            {report.sponsor ? (
                                                <span title={report.sponsor}>{report.sponsor.substring(0, 6)}...{report.sponsor.substring(report.sponsor.length - 4)}</span>
                                            ) : (
                                                report.type === 'AdminCommissionPaid' ? "N/A" : "-"
                                            )}
                                        </td>
                                        <td style={{ padding: "20px", color: "#a8b3cf", fontSize: "14px" }}>
                                            {report.type === 'AdminCommissionPaid' && report.commissionBreakdown?.length > 0 ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    {report.commissionBreakdown.map((item, i) => (
                                                        <span key={i} style={{
                                                            fontSize: '11px',
                                                            padding: '2px 6px',
                                                            background: 'rgba(255,255,255,0.1)',
                                                            borderRadius: '4px',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            L{item.level}: {formatAmount(item.amount)} ({Number(item.percent).toFixed(2)}%)
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : report.type === 'AdminCommissionPaid' && report.levelPercentages?.length > 0 ? (
                                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                    {report.levelPercentages.map((p, i) => (
                                                        <span key={i} style={{
                                                            fontSize: '11px',
                                                            padding: '2px 6px',
                                                            background: 'rgba(255,255,255,0.1)',
                                                            borderRadius: '4px'
                                                        }}>
                                                            L{i + 1}: {Number(p).toFixed(2)}%
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td style={{ padding: "20px", color: "#a8b3cf", fontSize: "14px" }}>
                                            {new Date(report.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {reports.length === 0 && !loading && (
                        <div style={{ padding: "60px 20px", textAlign: "center", color: "#a8b3cf" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>No results found</div>
                            <div style={{ fontSize: "14px" }}>Try adjusting your search or filters</div>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div style={{ padding: "24px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={!pagination.hasPrevPage}
                                style={{
                                    padding: "10px 16px",
                                    background: !pagination.hasPrevPage ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: "8px",
                                    color: !pagination.hasPrevPage ? "#666" : "#fff",
                                    cursor: !pagination.hasPrevPage ? "not-allowed" : "pointer",
                                    transition: "all 0.3s ease",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}
                            >
                                ← Previous
                            </button>

                            {[...Array(pagination.totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                if (
                                    pageNum === 1 ||
                                    pageNum === pagination.totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            style={{
                                                padding: "10px 16px",
                                                background: currentPage === pageNum
                                                    ? "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)"
                                                    : "rgba(255, 255, 255, 0.1)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                                borderRadius: "8px",
                                                color: "#fff",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                minWidth: "44px"
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={pageNum} style={{ padding: "10px", color: "#666" }}>...</span>;
                                }
                                return null;
                            })}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={!pagination.hasNextPage}
                                style={{
                                    padding: "10px 16px",
                                    background: !pagination.hasNextPage ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    borderRadius: "8px",
                                    color: !pagination.hasNextPage ? "#666" : "#fff",
                                    cursor: !pagination.hasNextPage ? "not-allowed" : "pointer",
                                    transition: "all 0.3s ease",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                input::placeholder { color: rgba(168, 179, 207, 0.5); }
                input:focus::placeholder { color: rgba(168, 179, 207, 0.7); }
                select option { padding: 8px; color: black; }
            `}</style>
        </div>
    );
}
