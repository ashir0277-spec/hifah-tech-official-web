import { useState, useRef, useCallback, useEffect } from "react";
import {
  Copy, Check, Phone, Mail, MessageCircle, GripVertical,
  Filter, Calendar, ChevronDown, X, Search, Users, Clock,
  ArrowUpDown, Eye, Download,
  Menu,
  Trash2
} from "lucide-react";

// ─── Firebase config — replace with your own ────────────────────────────────
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, where, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import {db } from "../../../../firebase"; 
import { useOutletContext } from "react-router-dom";

// ────────────────────────────────────────────────────────────────────────────

const DATE_FILTERS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "3 Days", value: "3days" },
  { label: "7 Days", value: "7days" },
  { label: "1 Month", value: "1month" },
  { label: "3 Months", value: "3months" },
  { label: "6 Months", value: "6months" },
  { label: "1 Year", value: "1year" },
  { label: "Custom", value: "custom" },
];

const DEVELOPER_OPTIONS = [
  "All", "Full Stack Developer", "React Developer", "Backend Developer",
  "Mobile Developer", "DevOps Engineer", "Data Scientist", "UI/UX Designer",
];

const COMM_OPTIONS = ["All", "Phone Call", "Google Meet", "Email"];

function getDateRange(filter) {
  const now = new Date();
  const start = new Date();
  switch (filter) {
    case "today": start.setHours(0, 0, 0, 0); break;
    case "yesterday": start.setDate(now.getDate() - 1); start.setHours(0, 0, 0, 0); now.setDate(now.getDate() - 1); now.setHours(23, 59, 59, 999); break;
    case "3days": start.setDate(now.getDate() - 3); break;
    case "7days": start.setDate(now.getDate() - 7); break;
    case "1month": start.setMonth(now.getMonth() - 1); break;
    case "3months": start.setMonth(now.getMonth() - 3); break;
    case "6months": start.setMonth(now.getMonth() - 6); break;
    case "1year": start.setFullYear(now.getFullYear() - 1); break;
    default: return null;
  }
  return { start, end: now };
}

function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button onClick={handleCopy} title={`Copy ${text}`}
      className={`ml-1 p-0.5 rounded transition-all opacity-0 group-hover:opacity-100 hover:bg-blue-50 ${className}`}>
      {copied
        ? <Check size={12} className="text-emerald-500" />
        : <Copy size={12} className="text-slate-400 hover:text-blue-500" />}
    </button>
  );
}

function BulkCopyButton({ data, field, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const values = data.map(r => r[field]).filter(Boolean).join("\n");
    navigator.clipboard.writeText(values).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button onClick={handleCopy} title={`Copy all ${label}`}
      className="ml-1 p-0.5 rounded hover:bg-blue-100 transition-all">
      {copied
        ? <Check size={11} className="text-emerald-500" />
        : <Copy size={11} className="text-slate-500 hover:text-blue-600" />}
    </button>
  );
}

const DEFAULT_COLUMNS = [
  { key: "fullName", label: "Full Name", width: "160px" },
  { key: "email", label: "Email", width: "200px", hasCopy: true, hasBulkCopy: true },
  { key: "phone", label: "Phone", width: "140px", hasCopy: true, hasBulkCopy: true },
  { key: "companyName", label: "Company", width: "150px" },
  { key: "developerRequired", label: "Developer Needed", width: "170px" },
  { key: "commMethod", label: "Comm. Method", width: "140px" },
  { key: "projectType", label: "Project Type", width: "140px" },
  { key: "projectDescription", label: "Description", width: "200px" },
  { key: "createdAt", label: "Date", width: "130px" },
  { key: "Action", label: "Action", width: "120px" },
];

function CommBadge({ method }) {
  const map = {
    "Phone Call": "bg-blue-50 text-blue-700 border-blue-200",
    "WhatsApp": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Email": "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${map[method] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {method}
    </span>
  );
}

function DevBadge({ dev }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
      {dev}
    </span>
  );
}

export default function HireDevelopersTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [dragCol, setDragCol] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [search, setSearch] = useState("");
  const [devFilter, setDevFilter] = useState("All");
  const [commFilter, setCommFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const datePickerRef = useRef(null);

  const [confirmDelete, setConfirmDelete] = useState(null); // holds record to delete

    const { toggleSidebar, sidebarOpen } = useOutletContext();
  

  // ── Fetch from Firebase (falls back to mock) ──────────────────────────────
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const q = query(collection(db, "hire_developers"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (snap.empty) throw new Error("empty");
        setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {
        // Use mock data if Firebase not configured or empty
        // setRecords(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ── Click outside date picker ─────────────────────────────────────────────
  useEffect(() => {
    function handler(e) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = records.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || [r.fullName, r.email, r.phone, r.companyName, r.developerRequired, r.commMethod, r.projectType]
      .some(v => v?.toLowerCase().includes(q));
    const matchDev = devFilter === "All" || r.developerRequired === devFilter;
    const matchComm = commFilter === "All" || r.commMethod === commFilter;

    let matchDate = true;
    const date = r.createdAt?.toDate ? r.createdAt.toDate() : new Date(r.createdAt);
    if (dateFilter === "custom") {
      if (customStart) matchDate = date >= new Date(customStart);
      if (customEnd) matchDate = matchDate && date <= new Date(customEnd + "T23:59:59");
    } else if (dateFilter) {
      const range = getDateRange(dateFilter);
      if (range) matchDate = date >= range.start && date <= range.end;
    }
    return matchSearch && matchDev && matchComm && matchDate;
  });

  // ── Drag & Drop columns ───────────────────────────────────────────────────
  const onDragStart = (e, idx) => { setDragCol(idx); e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (e, idx) => { e.preventDefault(); setDragOver(idx); };
  const onDrop = (e, idx) => {
    e.preventDefault();
    if (dragCol === null || dragCol === idx) return;
    const newCols = [...columns];
    const [moved] = newCols.splice(dragCol, 1);
    newCols.splice(idx, 0, moved);
    setColumns(newCols);
    setDragCol(null);
    setDragOver(null);
  };
  const onDragEnd = () => { setDragCol(null); setDragOver(null); };

  // ── Cell renderer ─────────────────────────────────────────────────────────
  function renderCell(record, col) {
    const val = record[col.key];
    if (col.key === "email") return (
      <div className="flex items-center group min-w-0">
        <a href={`mailto:${val}`} className="text-blue-600 hover:text-blue-800 hover:underline text-xs truncate" title={val}>
          {val}
        </a>
        <CopyButton text={val} />
      </div>
    );
    if (col.key === "phone") return (
      <div className="flex items-center gap-1 group">
        <a href={`tel:${val}`} className="text-slate-700 hover:text-blue-600 text-xs font-mono" title="Call">
          {val}
        </a>
        <a href={`https://wa.me/${val?.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
          className="p-0.5 rounded hover:bg-emerald-50 transition-all opacity-0 group-hover:opacity-100" title="WhatsApp">
          <MessageCircle size={11} className="text-emerald-500" />
        </a>
        <a href={`tel:${val}`} className="p-0.5 rounded hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100" title="Call">
          <Phone size={11} className="text-blue-500" />
        </a>
        <CopyButton text={val} />
      </div>
    );
    if (col.key === "createdAt") {
      const d = val?.toDate ? val.toDate() : new Date(val);
      return <span className="text-xs text-slate-500 whitespace-nowrap">{d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>;
    }
    if (col.key === "developerRequired") return <DevBadge dev={val} />;
    if (col.key === "commMethod") return <CommBadge method={val} />;
    if (col.key === "Action") return (
      <button
        onClick={() => setConfirmDelete(record)}
        className="flex items-center gap-1 px-2 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all"
      >
        <Trash2 size={11} /> Delete
      </button>
    );
    if (col.key === "projectDescription") return (
      <span className="text-xs text-slate-500 truncate block max-w-[180px]" title={val}>{val}</span>
    );
    return <span className="text-xs text-slate-700">{val}</span>;
  }

  const activeFiltersCount = [
    devFilter !== "All", commFilter !== "All", !!dateFilter, !!search
  ].filter(Boolean).length;

  return (
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
    
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-medium text-[#1E9994] tracking-tight flex items-center gap-2">
            <Menu onClick={toggleSidebar} className='w-6 h-6 cursor-pointer' />
            Hire Developers
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} of {records.length} enquiries · drag column headers to reorder
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
            {records.length} total records
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 p-3 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="Search name, email, company…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-slate-50"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2"><X size={13} className="text-slate-400" /></button>}
        </div>

        {/* Developer filter */}
        <div className="relative">
          <select value={devFilter} onChange={e => setDevFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer text-slate-700">
            {DEVELOPER_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Comm Method filter */}
        <div className="relative">
          <select value={commFilter} onChange={e => setCommFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer text-slate-700">
            {COMM_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Date filter */}
        <div className="relative" ref={datePickerRef}>
          <button onClick={() => setShowDatePicker(v => !v)}
            className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-xl transition-all ${dateFilter ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            <Calendar size={13} />
            {dateFilter ? DATE_FILTERS.find(d => d.value === dateFilter)?.label || "Date" : "Date Range"}
            <ChevronDown size={12} />
          </button>
          {showDatePicker && (
            <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 w-72">
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {DATE_FILTERS.map(d => (
                  <button key={d.value}
                    onClick={() => { setDateFilter(d.value); if (d.value !== "custom") setShowDatePicker(false); }}
                    className={`text-xs py-1.5 px-2 rounded-lg border transition-all ${dateFilter === d.value ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 hover:bg-blue-50 text-slate-600"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
              {dateFilter === "custom" && (
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">From</label>
                    <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">To</label>
                    <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <button onClick={() => setShowDatePicker(false)}
                    className="w-full text-xs bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <button onClick={() => { setSearch(""); setDevFilter("All"); setCommFilter("All"); setDateFilter(""); setCustomStart(""); setCustomEnd(""); }}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 px-2 py-1.5 rounded-lg hover:bg-red-50 border border-red-200 transition-all">
            <X size={11} /> Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading records…</span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: columns.reduce((s, c) => s + parseInt(c.width), 0) + "px" }}>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {columns.map((col, idx) => (
                    <th key={col.key}
                      draggable
                      onDragStart={e => onDragStart(e, idx)}
                      onDragOver={e => onDragOver(e, idx)}
                      onDrop={e => onDrop(e, idx)}
                      onDragEnd={onDragEnd}
                      className={`px-3 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap select-none cursor-grab active:cursor-grabbing transition-all
                        ${dragOver === idx ? "bg-blue-100 border-l-2 border-blue-400" : ""}
                        ${dragCol === idx ? "opacity-40" : ""}
                      `}
                      style={{ width: col.width, minWidth: col.width }}>
                      <div className="flex items-center gap-1">
                        <GripVertical size={12} className="text-slate-300 flex-shrink-0" />
                        <span>{col.label}</span>
                        {col.hasBulkCopy && (
                          <BulkCopyButton data={filtered} field={col.key} label={col.label} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-16 text-slate-400 text-sm">
                      No records match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((record, ri) => (
                    <tr key={record.id}
                      className={`border-b border-slate-100 hover:bg-blue-50/40 transition-colors group ${ri % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                      {columns.map(col => (
                        <td key={col.key} className="px-3 py-2.5" style={{ maxWidth: col.width }}>
                          {renderCell(record, col)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-500">
              Showing <strong>{filtered.length}</strong> records
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <GripVertical size={11} /> Drag headers to reorder columns
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Copy size={11} /> Click copy icons to copy
              </span>
            </div>
          </div>
        )}
      </div>
      {confirmDelete && (
  <div className="fixed inset-0  bg-[#00000040] bg-opacity-40 flex items-center justify-center" style={{zIndex: '9999'}}>
      <div className=" bg-white p-7 rounded-lg w-full sm:max-w-[561px] shadow-xl">
        <h2 className="mont font-medium text-xl mb-3">Are you sure you want to delete?</h2>
        <p className="font-medium text-[12px] text-[#000000B0] mb-6">
        Once deleted, all associated data will be permanently removed.
        </p>

        <div className="flex justify-end gap-9">
          <button
            onClick={() => setConfirmDelete(null)}
            className="text-[#333333E5] px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
            try {
              await deleteDoc(doc(db, "hire_developers", confirmDelete.id));
              setRecords(prev => prev.filter(r => r.id !== confirmDelete.id));
            } catch (e) {
              alert("Failed to delete: " + e.message);
            } finally {
              setConfirmDelete(null);
            }
          }}
            className="w-2/6 bg-[#FF383C] text-white pr-[32px] pl-[32px] py-3 rounded cursor-pointer"
          >
            Delete
            
          </button>
        </div>
      </div>
    </div>
)}
    </div>
  );
}