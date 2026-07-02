import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  X,
  User,
  MessageSquareQuote,
  AlertTriangle,
  Loader2,
  Check,
  Menu,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

// ─── Firebase Config ───────────────────────────────────────────────
// Replace with your actual Firebase config

const COLLECTION = "testimonials";

// ─── Star Rating Component ─────────────────────────────────────────
function StarRating({ value, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`transition-transform ${!readOnly ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
        >
          <Star
            size={20}
            className={`transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300 fill-slate-100"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Avatar Preview ────────────────────────────────────────────────
function Avatar({ url, name, size = "md" }) {
  const [err, setErr] = useState(false);
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-12 h-12 text-sm";
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  if (url && !err) {
    return (
      <img
        src={url}
        alt={name}
        onError={() => setErr(true)}
        className={`${dim} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-[#00bad6] to-[#9fd086] flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

// ─── Modal Backdrop ────────────────────────────────────────────────
function Modal({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  );
}

// ─── Testimonial Form Modal ────────────────────────────────────────
const EMPTY = { name: "", designation: "", avatarUrl: "", review: "", stars: 5 };

function TestimonialFormModal({ initial, onSave, onClose, loading }) {
  const [form, setForm] = useState(initial || EMPTY);
  const isEdit = !!initial?.id;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const valid = form.name.trim() && form.review.trim() && form.stars > 0;

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <MessageSquareQuote size={16} className="text-[#00bad6]" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">
              {isEdit ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Avatar preview + URL */}
          <div className="flex items-center gap-4">
            <Avatar url={form.avatarUrl} name={form.name} />
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Avatar URL
              </label>
              <input
                value={form.avatarUrl}
                onChange={set("avatarUrl")}
                placeholder="https://example.com/avatar.jpg"
                className="mt-1 w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00bad6] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Name + Designation */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Doe"
                className="mt-1 w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00bad6] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Designation
              </label>
              <input
                value={form.designation}
                onChange={set("designation")}
                placeholder="CEO, Acme Inc."
                className="mt-1 w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00bad6] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Stars */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Rating <span className="text-red-400">*</span>
            </label>
            <div className="mt-2">
              <StarRating
                value={form.stars}
                onChange={(v) => setForm((f) => ({ ...f, stars: v }))}
              />
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Review <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.review}
              onChange={set("review")}
              rows={4}
              placeholder="Write the testimonial here…"
              className="mt-1 w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00bad6] focus:border-transparent transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => valid && onSave(form)}
            disabled={!valid || loading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-[#00bad6] hover:bg-[#0d9ab0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {isEdit ? "Save Changes" : "Add Testimonial"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Delete Confirmation Modal ─────────────────────────────────────
function DeleteConfirmModal({ name, onConfirm, onClose, loading }) {
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={22} className="text-red-500" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">Delete Testimonial</h3>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-slate-700">"{name}"</span>'s testimonial? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────
export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Fetch ──
  const fetchAll = async () => {
    setFetching(true);
    try {
      const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Add ──
  const handleAdd = async (form) => {
    setActionLoading(true);
    try {
      await addDoc(collection(db, COLLECTION), { ...form, createdAt: serverTimestamp() });
      setShowForm(false);
      fetchAll();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); }
  };

  // ── Edit ──
  const handleEdit = async (form) => {
    setActionLoading(true);
    try {
      const { id, ...data } = form;
      await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() });
      setEditTarget(null);
      fetchAll();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); }
  };

  // ── Delete ──
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, COLLECTION, deleteTarget.id));
      setDeleteTarget(null);
      fetchAll();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); }
  };

      const { toggleSidebar, sidebarOpen } = useOutletContext();

  // ── UI ──
  return (
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
    
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="w-full mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div onClick={toggleSidebar} className=" cursor-pointer rounded-lg flex items-center justify-center">
              <Menu size={26} className="text-black" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Testimonials</h1>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#00bad6] hover:bg-[#0d9ab0] text-white rounded-lg transition-colors shadow-sm"
          >
            <Plus size={15} />
            Add Testimonial
          </button>
        </div>
      </header>

      <main className="w-full mx-auto px-6 py-8">
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: testimonials.length },
            {
              label: "Avg Rating",
              value: testimonials.length
                ? (testimonials.reduce((s, t) => s + t.stars, 0) / testimonials.length).toFixed(1)
                : "—",
            },
            {
              label: "5-Star",
              value: testimonials.filter((t) => t.stars === 5).length,
            },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {fetching ? (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <Loader2 size={22} className="animate-spin mr-2" />
              <span className="text-sm">Loading testimonials…</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <MessageSquareQuote size={36} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No testimonials yet</p>
              <p className="text-xs mt-1">Click "Add Testimonial" to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Person", "Designation", "Rating", "Review","Created At", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${
                          h === "Actions" ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Person */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar url={t.avatarUrl} name={t.name} size="sm" />
                          <span className="font-medium text-slate-800 whitespace-nowrap">{t.name}</span>
                        </div>
                      </td>
                      {/* Designation */}
                      <td className="px-5 py-3.5">
                        <span className="text-slate-500 text-xs">
                          {t.designation || <span className="text-slate-300 italic">—</span>}
                        </span>
                      </td>
                      {/* Rating */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <StarRating value={t.stars} readOnly />
                          <span className="text-xs text-slate-400 font-medium">({t.stars})</span>
                        </div>
                      </td>
                      {/* Review */}
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="text-slate-600 line-clamp-2 text-xs leading-relaxed">
                          {t.review}
                        </p>
                      </td>
                      {/* Review */}
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="text-slate-600 line-clamp-2 text-xs leading-relaxed">
                          {new Date(t.createdAt.seconds * 1000).toLocaleDateString("en-GB")}
                        </p>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditTarget(t)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#00bad6] hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(t)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        {!fetching && testimonials.length > 0 && (
          <p className="text-xs text-slate-400 mt-4 text-center">
            {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""} · Hover a row to reveal edit / delete actions
          </p>
        )}
      </main>

      {/* Add Modal */}
      {showForm && (
        <TestimonialFormModal
          onSave={handleAdd}
          onClose={() => setShowForm(false)}
          loading={actionLoading}
        />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <TestimonialFormModal
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
          loading={actionLoading}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
}