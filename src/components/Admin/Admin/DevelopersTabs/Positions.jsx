import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Briefcase, MapPin, Clock, ChevronDown, Search, Users, Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const FIELDS = ["Design", "Software Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Product"];
const MODES = ["Remote", "Hybrid", "On-site"];
const TIMES = ["Full-time", "Part-time", "Contract", "Internship"];

const FIELD_COLORS = {
  Design: "bg-violet-100 text-violet-700",
  "Software Engineering": "bg-blue-100 text-blue-700",
  Marketing: "bg-pink-100 text-pink-700",
  Sales: "bg-emerald-100 text-emerald-700",
  HR: "bg-amber-100 text-amber-700",
  Finance: "bg-cyan-100 text-cyan-700",
  Operations: "bg-orange-100 text-orange-700",
  Product: "bg-indigo-100 text-indigo-700",
};

const MODE_COLORS = {
  Remote: "bg-teal-50 text-teal-700 border border-teal-200",
  Hybrid: "bg-sky-50 text-sky-700 border border-sky-200",
  "On-site": "bg-slate-100 text-slate-600 border border-slate-200",
};

const TIME_COLORS = {
  "Full-time": "bg-green-50 text-green-700",
  "Part-time": "bg-yellow-50 text-yellow-700",
  Contract: "bg-red-50 text-red-700",
  Internship: "bg-purple-50 text-purple-700",
};

const emptyForm = { title: "", description: "", field: FIELDS[0], mode: MODES[0], time: TIMES[0] };

function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function Modal({ position, onClose, onSave }) {
  const [form, setForm] = useState(position || emptyForm);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const [loading, setLoading] = useState(false)
// const handleSave = async () => {
//   if (!form.title.trim() || !form.description.trim()) return;

//   try {
//     await addDoc(collection(db, "positions"), {
//       ...form,
//       createdAt: serverTimestamp(),
//     });

//     setForm(emptyForm);
//     onSave(form);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// SAVE (ADD + EDIT)
const handleSave = async () => {
  if (!form.title.trim() || !form.description.trim()) return;

  try {
    setLoading(true)
    if (form.id) {
      // EDIT
      const ref = doc(db, "positions", form.id);
      await updateDoc(ref, {
        title: form.title,
        description: form.description,
        field: form.field,
        mode: form.mode,
        time: form.time,
        updatedAt: serverTimestamp(),
      });

      setForm(prev =>
        prev.map(p => (p.id === form.id ? { ...p, ...form } : p))
      );
    } else {
      // ADD
      const docRef = await addDoc(collection(db, "positions"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setForm(prev => [
        { id: docRef.id, ...form },
        ...prev,
      ]);
    }

    setForm(emptyForm);
    onSave(form);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{position ? "Edit Position" : "Add Vacant Position"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{position ? "Update the role details" : "Fill in the details for the new role"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Job Title</label>
            <input
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder:text-slate-300"
              placeholder="e.g. Senior Backend Engineer"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Description</label>
            <textarea
              rows={3}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none placeholder:text-slate-300"
              placeholder="Brief description of the role..."
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Select label="Field" value={form.field} onChange={set("field")} options={FIELDS} />
            <Select label="Mode" value={form.mode} onChange={set("mode")} options={MODES} />
            <Select label="Time" value={form.time} onChange={set("time")} options={TIMES} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.title.trim() || !form.description.trim()}
            className="px-5 py-2 text-sm font-semibold bg-[#32bbcf] text-white rounded-xl hover:bg-[#1f99ac] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? "Saving..." : position ? "Save Changes" : "Add Position"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PositionCard({ position, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${FIELD_COLORS[position.field] || "bg-gray-100 text-gray-600"}`}>
              {position.field}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">{position.title}</h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => onEdit(position)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition">
            <Pencil size={14} />
          </button>
          <button onClick={() => onDelete(position.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{position.description}</p>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg ${MODE_COLORS[position.mode]}`}>
          <MapPin size={11} />
          {position.mode}
        </span>
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg ${TIME_COLORS[position.time] || "bg-gray-100 text-gray-600"}`}>
          <Clock size={11} />
          {position.time}
        </span>
      </div>
    </div>
  );
}

export default function VacantPositions() {
  const [positions, setPositions] = useState([]);
  const [modal, setModal] = useState(null); // null | "add" | position object
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("All");
  const [nextId, setNextId] = useState(4);

  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const fetchPositions = async () => {
    try {
        setLoading(true);
      const q = query(
        collection(db, "positions"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions: ", error);
    } finally {
        setLoading(false);
    }
  };

  fetchPositions();
}, []);

  const filtered = positions.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.field.toLowerCase().includes(search.toLowerCase());
    const matchField = filterField === "All" || p.field === filterField;
    return matchSearch && matchField;
  });

  const handleSave = (form) => {
    if (modal === "add") {
      setPositions((prev) => [...prev, { ...form, id: nextId }]);
      setNextId((n) => n + 1);
    } else {
      setPositions((prev) => prev.map((p) => (p.id === modal.id ? { ...form, id: modal.id } : p)));
    }
    setModal(null);
  };

    //  const handleDelete = (id) => setPositions((prev) => prev.filter((p) => p.id !== id));
    // DELETE (FIREBASE + STATE)
    const handleDelete = async (id) => {
    try {
        await deleteDoc(doc(db, "positions", id));
        setPositions(prev => prev.filter(p => p.id !== id));
    } catch (err) {
        console.error(err);
    }
    };

    const { toggleSidebar, sidebarOpen } = useOutletContext();

  return (
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
      {/* Sidebar + Main layout */}
      <div className="flex">

        {/* Main */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Menu onClick={toggleSidebar} className='w-6 h-6 cursor-pointer' />
                Vacant Positions</h1>
              <p className="text-sm text-slate-400 mt-0.5">{positions.length} open roles across the organization</p>
            </div>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#32bbcf] hover:bg-[#1f99ac] text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-indigo-200"
            >
              <Plus size={16} />
              Add Position
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Open", value: positions.length, color: "text-indigo-600" },
              { label: "Remote", value: positions.filter((p) => p.mode === "Remote").length, color: "text-teal-600" },
              { label: "Full-time", value: positions.filter((p) => p.time === "Full-time").length, color: "text-green-600" },
              { label: "Departments", value: [...new Set(positions.map((p) => p.field))].length, color: "text-amber-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
                <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6 flex-wrap items-center">
            <div className="relative flex-1 min-w-48">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Search positions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", ...FIELDS].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterField(f)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition ${
                    filterField === f
                      ? "bg-[#32bbcf] text-white"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

            {loading && (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading records…</span>
                </div>
            </div>
            )}
          {/* Grid */}
          {filtered.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Briefcase size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-semibold text-base mb-1">No positions found</p>
              <p className="text-slate-400 text-sm">Try adjusting your filters or add a new position.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PositionCard key={p.id} position={p} onEdit={setModal} onDelete={(id) => setDeleteId(id)} />
              ))}
            </div>
          )}
        </main>
      </div>
  
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Delete Position</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this position?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      {modal !== null && (
        <Modal
          position={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}