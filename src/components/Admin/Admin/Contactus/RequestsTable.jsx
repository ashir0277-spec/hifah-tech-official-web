import { useState, useRef } from "react";
import { Check, Copy as CopyIcon, ChevronDown, GripVertical, Copy } from "lucide-react";

const INITIAL_COLUMNS = [
  { id: "fullName", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "city", label: "City" },
  { id: "preferredMode", label: "Preferred mode" },
  { id: "classType", label: "Class type" },
  { id: "courses", label: "Courses" },
  { id: "status", label: "Status" },
  { id: "message", label: "Message" },
  { id: "dateCreated", label: "Date Created" },
  { id: "action", label: "Action" },
];

  const coursesOptions= [
     "Flutter App Development",
     "Web Development",
     "Graphic Designing",
     "UI/UX Design",
     "Freelancing & Digital Skills",
     "AI",
     "Digital Marketing",
     "Client Hunting / Lead Generation",
     "WooCommerce",
     "Python",
     "Java",
     "React JS",
     "Angular",
     "Node JS",
     "C & C++",
     "HTML, CSS & JavaScript",
     "Flutter"
  ]


export default function RequestsTable({
  searchedRequests,
  isLoading,
  copied,
  handleCopyEmail,
  fetchMessages,
  setShowTexts,
  setNumber,
  setShowEmails,
  setEmail,
  setUsername,
  formatPhoneNumber,
  status,
  setStatus,
  statusId,
  setStatusId,
  filterRef,
  statuses,
  updateStatusById,
  updateLoading,
  loader,
  Lottie,
  Skeleton,
  setDeletePopup,
  setdelId,
  delId,
}) {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [dragEnabledCol, setDragEnabledCol] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const dragCol = useRef(null);
  const dragOverCol = useRef(null);

  const [copiedEmail, setCopied] = useState(false)

  const handleCopyAllEmail = () => {
  // extract emails from searchedRequests
  const emails = searchedRequests
    .map(item => item.email)   
    .filter(Boolean)
    .join(', ');

  // copy to clipboard
  navigator.clipboard.writeText(emails)
    .then(() => setCopied(true))
    .catch(err => console.error('Failed to copy emails:', err));

  // reset copied state after 2 seconds
  setTimeout(() => setCopied(false), 2000);
};

  const handleCopyAllPhone = () => {
  // extract emails from searchedRequests
  const emails = searchedRequests
    .map(item => item.phone)   // get email field
    .filter(Boolean)           // remove null/undefined
    .join(', ');               // comma separated

  // copy to clipboard
  navigator.clipboard.writeText(emails)
    .then(() => setCopied(true))
    .catch(err => console.error('Failed to copy emails:', err));

  // reset copied state after 2 seconds
  setTimeout(() => setCopied(false), 2000);
};

  const handleDragEnd = () => {
    if (!dragCol.current || !dragOverCol.current || dragCol.current === dragOverCol.current) {
      dragCol.current = null;
      dragOverCol.current = null;
      setDragEnabledCol(null);
      setDragOverId(null);
      return;
    }
    const updated = [...columns];
    const fromIdx = updated.findIndex((c) => c.id === dragCol.current);
    const toIdx = updated.findIndex((c) => c.id === dragOverCol.current);
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setColumns(updated);
    dragCol.current = null;
    dragOverCol.current = null;
    setDragEnabledCol(null);
    setDragOverId(null);
  };

  const renderSkeletonRow = (idx) => (
    <tr key={idx}>
      {columns.map((col) => (
        <td key={col.id}>
          <Skeleton
            width={col.id === "action" ? 30 : 90}
            height={["status", "message", "dateCreated"].includes(col.id) ? 30 : 20}
            borderRadius={col.id === "action" ? 50 : col.id === "courses" ? 6 : 8}
            className="mx-3 my-2"
          />
        </td>
      ))}
    </tr>
  );

  const renderCell = (col, item) => {
    switch (col.id) {
      case "fullName":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
            {item.fullName}
          </td>
        );

      case "email":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-600">
            <p  className="flex gap-1 items-center">
             <span onClick={ async () => {  await fetchMessages(); setShowEmails(true); setUsername(item.fullName); setEmail(item.email); }} > {item.email}</span>
              {copied && item.id === delId ? (
                <Check className="w-4 h-4 text-green-500 cursor-pointer" />
              ) : (
                <CopyIcon
                  onClick={() => {handleCopyEmail(item.email, item.phone); setdelId(item.id)}}
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                />
              )}
            </p>
          </td>
        );

      case "phone":
        return (
          <td
            key={col.id}
            onClick={ async () => {  await fetchMessages(); setShowTexts(true); setUsername(item.fullName); setNumber(formatPhoneNumber(item.phone)); }}
            className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm text-gray-600"
          >
            +{formatPhoneNumber(item.phone)}
          </td>
        );

      case "city":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {item.city}
          </td>
        );

      case "preferredMode":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {item.preferredMode}
          </td>
        );

      case "classType":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            {item.classType}
          </td>
        );

      case "courses":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
            <p className="flex flex-wrap gap-1">
              {(Array.isArray(item.courses) ? item.courses : [item.courses]).map((c, i) => (
                <span key={i} className="border border-gray-400 rounded-full px-3 py-1">{c}</span>
              ))}
            </p>
          </td>
        );

      case "status":
        return (
          <td key={col.id} className="px-6 py-4 overflow-auto whitespace-nowrap relative">
            <span
              onClick={() => { setStatus((prev) => !prev); setStatusId(item.id); }}
              className={`px-3 py-1 cursor-pointer capitalize rounded-full inline-flex text-xs leading-5 font-semibold
                ${item.status === "delayed" ? "text-[#FF4444] border border-[#FF4444]" :
                  item.status === "pending" ? "text-[#EAB308] border border-[#EAB308]" :
                  item.status === "confirmed" ? "text-[#12B76A] border border-[#12B76A]" : "text-gray-500"}
              `}
            >
              {item.status}
              <ChevronDown className="w-5 h-5" />
            </span>
            {status && statusId === item.id && (
              <div
                ref={filterRef}
                className="absolute bg-white border w-[230px] border-[#E9EAED] mt-3 shadow-[0_2px_12px_0_rgba(16,24,40,0.1)] rounded-xl p-1 right-14 top-10 z-10"
              >
                {statuses.map((st, idx) => (
                  <div key={idx}>
                    <p
                      onClick={() => updateStatusById(item.id, st)}
                      className={`p-2 flex items-center rounded-sm justify-between capitalize cursor-pointer roboto text-xs font-medium w-full
                        ${st === item.status && item.status === "delayed" ? "text-white bg-[#FF4444]" :
                          st === item.status && item.status === "pending" ? "text-white bg-[#EAB308]" :
                          st === item.status && item.status === "confirmed" ? "text-white bg-[#12B76A]" : ""}
                      `}
                    >
                      {st}
                      {updateLoading ? (
                        <div className="w-[25px] h-[25px] flex items-center text-white justify-center">
                          <Lottie animationData={loader} style={{ transform: "scale(2)", transformOrigin: "center" }} className="scale-110" />
                        </div>
                      ) : st === item.status ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 4.5L6.75 12.75L3 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </td>
        );

      case "message":
        return (
          <td key={col.id} className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
            {item.message}
          </td>
        );

      case "dateCreated":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(item.createdAt.seconds * 1000).toLocaleDateString("en-GB")}
          </td>
        );

      case "action":
        return (
          <td key={col.id} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              onClick={() => { setDeletePopup(true); setdelId(item.id); }}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </td>
        );

      default:
        return <td key={col.id} />;
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => {
            const isEnabled = dragEnabledCol === col.id;
            const isBeingDragged = dragCol.current === col.id;
            const isDropTarget = dragOverId === col.id && dragCol.current !== col.id;

            return (
              <th
                key={col.id}
                draggable={isEnabled}
                onDoubleClick={() => setDragEnabledCol(col.id)}
                onDragStart={() => { dragCol.current = col.id; }}
                onDragEnter={() => { dragOverCol.current = col.id; setDragOverId(col.id); }}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                title="Double-click to drag and reorder"
                className={`
                  px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                  select-none transition-all duration-150
                  ${isEnabled ? "cursor-grab bg-blue-50 text-blue-500 ring-2 ring-inset ring-blue-300" : "cursor-default text-gray-500"}
                  ${isBeingDragged ? "opacity-30" : ""}
                  ${isDropTarget ? "bg-blue-100 border-l-2 border-blue-400" : ""}
                `}
              >
                <span className="flex items-center gap-1">
                  {isEnabled && <GripVertical className="w-3 h-3 shrink-0 text-blue-400" />}
                  {col.label === 'Email' || col.label === 'Phone' ? 
                  <div className="flex items-center gap-1">
                  {col.label}

                  {copiedEmail ? (
                <Check className="w-4 h-4 text-green-500 cursor-pointer" />
              ) : (
                <CopyIcon
                  onClick={() => {col.label === 'Email' ? handleCopyAllEmail() : handleCopyAllPhone()}}
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                />
              )}
                  </div>
                  : col.label}
                  {/* {col.label} */}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => renderSkeletonRow(idx))
        ) : (
          <>
            {searchedRequests.length > 0 ? (
              searchedRequests.map((item, idx) => (
                <tr key={idx} className={!item.read ? "bg-blue-50/40" : ""}>
                  {columns.map((col) => renderCell(col, item))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-[#475467] inter text-sm font-regular py-4"
                >
                  No responses Found
                </td>
              </tr>
            )}
          </>
        )}
      </tbody>
      
    </table>
  );
}