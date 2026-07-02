import { useState, useEffect } from 'react';
import image6 from '../../../../images/portfolio/image (4).png';
import editicon from '../../../../images/team/user-edit.svg';
import deleteicon from '../../../../images/team/user-minus.svg';
import { useOutletContext } from 'react-router-dom';
import { Menu, X, ImagePlus, Layers, Star } from 'lucide-react';

const BaseUrl = 'http://localhost:8000/api';

const EMPTY_FORM = {
  title: '',
  description: '',
  categoryInput: '',
  category: [],
  image: null,
  heroImage: null,
  featureSectionImage: null,
  features: [],       // ← now an array of { featureTitle, featureDescription }
  paragraphs: [],
};

// ─── Reusable image upload button ────────────────────────────────────────────
const ImageUploadField = ({ label, name, preview, onChange, disabled }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[14px] text-[#333333CC] poppins-medium-italic">{label}</label>
    <label
      className={`flex items-center gap-2 cursor-pointer bg-[#249D981F] text-[#249D98] text-sm px-4 py-2 rounded-[50px] w-fit transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1E9994] hover:text-white'
      }`}
    >
      <ImagePlus className="w-4 h-4" />
      {preview ? 'Change Image' : 'Choose Image'}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
    </label>
    {preview && (
      <img
        src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)}
        alt={label}
        className="mt-2 w-32 h-20 object-cover rounded-lg border border-[#D8E4FE]"
      />
    )}
  </div>
);

function Portfolio() {
  const [token] = useState(localStorage.getItem('adminToken') || null);
  const { toggleSidebar, sidebarOpen } = useOutletContext();

  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm]             = useState(EMPTY_FORM);
  const [editId, setEditId]         = useState(null);
  const [editPreviews, setEditPreviews] = useState({
    image: null,
    heroImage: null,
    featureSectionImage: null,
  });

  const [errorMessage, setErrorMessage]     = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isBusy = loading || submitting || !!deletingId;

  useEffect(() => { fetchPortfolios(); }, []);

  useEffect(() => {
    if (!errorMessage && !successMessage) return;
    const t = setTimeout(() => { setErrorMessage(''); setSuccessMessage(''); }, 5000);
    return () => clearTimeout(t);
  }, [errorMessage, successMessage]);

  // ── Fetch ─────────────────────────────────────────────────────────
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BaseUrl}/get-all-portfolio`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch portfolios');
      const data = await res.json();
      setProjects(data.portfolios || []);
    } catch {
      setErrorMessage('Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  // ── Input handlers ────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (['image', 'heroImage', 'featureSectionImage'].includes(name)) {
      setForm(f => ({ ...f, [name]: files[0] }));
    } else if (name === 'categoryInput') {
      const cats = value.split(',').map(c => c.trim()).filter(Boolean);
      setForm(f => ({ ...f, categoryInput: value, category: cats }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // ── Feature handlers ──────────────────────────────────────────────
  const handleFeatureChange = (e, idx) => {
    const { name, value } = e.target;
    setForm(f => {
      const features = [...f.features];
      features[idx] = { ...features[idx], [name]: value };
      return { ...f, features };
    });
  };

  const handleAddFeature = () => {
    setForm(f => ({
      ...f,
      features: [...f.features, { featureTitle: '', featureDescription: '' }],
    }));
  };

  const handleRemoveFeature = (idx) => {
    setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  };

  // ── Paragraph handlers ────────────────────────────────────────────
  const handleParagraphChange = (e, idx) => {
    const { name, value, files } = e.target;
    setForm(f => {
      const paras = [...f.paragraphs];
      paras[idx] = {
        ...paras[idx],
        [name]: name === 'paragraphImage' && files?.[0] ? files[0] : value,
      };
      return { ...f, paragraphs: paras };
    });
  };

  const handleAddParagraph = () => {
    setForm(f => ({
      ...f,
      paragraphs: [
        ...f.paragraphs,
        { paragraphTitle: '', paragraphDescription: '', paragraphImage: null },
      ],
    }));
  };

  const handleRemoveParagraph = (idx) => {
    setForm(f => ({ ...f, paragraphs: f.paragraphs.filter((_, i) => i !== idx) }));
  };

  // ── Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); setSuccessMessage('');

    if (!form.title.trim())
      return setErrorMessage('Project title is required.');
    if (form.category.length === 0)
      return setErrorMessage('Please add at least one category.');
    if (
      form.paragraphs.length === 0 ||
      form.paragraphs.some(p => !p.paragraphTitle || !p.paragraphDescription)
    )
      return setErrorMessage('Please add at least one complete paragraph (title + description).');
    if (!editId && !form.image)
      return setErrorMessage('Please upload the main project mockup image.');

    // Validate features: if any are added, both fields must be filled
    if (form.features.some(f => !f.featureTitle.trim() || !f.featureDescription.trim()))
      return setErrorMessage('Each feature must have both a title and a description.');

    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append('title',       form.title);
      fd.append('description', form.description);
      fd.append('category',    form.categoryInput || form.category.join(', '));

      if (form.image)               fd.append('image',               form.image);
      if (form.heroImage)           fd.append('heroImage',           form.heroImage);
      if (form.featureSectionImage) fd.append('featureSectionImage', form.featureSectionImage);

      // Send full features array (supports multiple)
      fd.append('features', JSON.stringify(form.features));

      const paragraphsMeta = form.paragraphs.map(p => ({
        paragraphTitle:       p.paragraphTitle,
        paragraphDescription: p.paragraphDescription,
      }));
      fd.append('paragraphs', JSON.stringify(paragraphsMeta));
      form.paragraphs.forEach((p, i) => {
        if (p.paragraphImage) fd.append(`paragraphImage-${i}`, p.paragraphImage);
      });

      const url    = editId ? `${BaseUrl}/update-portfolio/${editId}` : `${BaseUrl}/post-portfolio`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || err.error || 'Failed to save portfolio');
      }

      const result = await res.json();
      setSuccessMessage(result.message || 'Portfolio saved successfully!');
      setForm(EMPTY_FORM);
      setEditId(null);
      setEditPreviews({ image: null, heroImage: null, featureSectionImage: null });
      await fetchPortfolios();

    } catch (err) {
      setErrorMessage(err.message || 'Failed to save portfolio. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
    try {
      setDeletingId(id);
      const res = await fetch(`${BaseUrl}/delete-portfolio/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete portfolio');
      setSuccessMessage('Portfolio deleted successfully!');
      await fetchPortfolios();
    } catch {
      setErrorMessage('Failed to delete portfolio. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Edit ──────────────────────────────────────────────────────────
  const handleEdit = (project) => {
    const cats  = cleanCategories(project.category);
    const paras = (project.paragraphs || []).map(p => ({
      paragraphTitle:       p.paragraphTitle || '',
      paragraphDescription: p.paragraphDescription || '',
      paragraphImage:       null,
    }));

    // Restore full features array
    const features = (project.features || []).map(f => ({
      featureTitle:       f.featureTitle || '',
      featureDescription: f.featureDescription || '',
    }));

    setEditId(project._id);
    setForm({
      title:               project.title || '',
      description:         project.description || '',
      category:            cats,
      categoryInput:       cats.join(', '),
      image:               null,
      heroImage:           null,
      featureSectionImage: null,
      features,
      paragraphs:          paras,
    });
    setEditPreviews({
      image:               project.image || null,
      heroImage:           project.heroImage || null,
      featureSectionImage: project.featureSectionImage || null,
    });

    setErrorMessage(''); setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAll = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setEditPreviews({ image: null, heroImage: null, featureSectionImage: null });
    setErrorMessage(''); setSuccessMessage('');
  };

  // ── Helpers ───────────────────────────────────────────────────────
  const cleanCategories = (category) => {
    if (Array.isArray(category)) return category.map(c => c.trim().replace(/"/g, ''));
    if (typeof category === 'string') {
      try {
        const parsed = JSON.parse(category.replace(/'/g, '"'));
        if (Array.isArray(parsed)) return parsed.map(c => c.trim().replace(/"/g, ''));
      } catch {}
      return category.replace(/[\[\]"']/g, '').split(',').map(c => c.trim()).filter(Boolean);
    }
    return [];
  };

  const previewSrc = (formFile, editUrl) => {
    if (formFile) return URL.createObjectURL(formFile);
    if (editUrl)  return editUrl;
    return null;
  };

  return (
    <div
      className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${
        sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'
      } p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-full mx-auto">

          {/* ── Header ── */}
          <h2 className="text-[32px] halant-bold text-[#1E9994] flex items-center gap-2">
            <Menu onClick={toggleSidebar} className="w-5 h-5 cursor-pointer" />
            {editId ? 'Update Portfolio' : 'Manage Portfolio'}
          </h2>
          <p className="text-[#333333CC] poppins-medium-italic text-[14px] mb-4">
            Welcome back! Let's take a look at what's new today.
          </p>

          {/* ── Status banners ── */}
          {loading && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <span className="text-blue-700 text-sm">Loading portfolios...</span>
            </div>
          )}
          {submitting && (
            <div className="mb-4 p-3 bg-teal-50 border border-[#1E9994] rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-[#1E9994] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <span className="text-[#1E9994] text-sm font-medium">
                {editId ? 'Updating portfolio, please wait...' : 'Uploading portfolio, please wait...'}
              </span>
            </div>
          )}
          {deletingId && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <span className="text-red-600 text-sm font-medium">Deleting portfolio...</span>
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* ════════════════════════════════════════
              FORM
          ════════════════════════════════════════ */}
          <form onSubmit={handleSubmit} className="bg-[#F1F5FE] p-4 md:p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-[14px] text-[#333333CC] poppins-medium-italic">Project Title *</label>
              <input
                type="text" name="title" value={form.title} onChange={handleInputChange}
                placeholder="Enter project title" required disabled={isBusy}
                className="p-2 h-[54px] border border-[#D8E4FE] bg-white rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-[14px] text-[#333333CC] poppins-medium-italic">Description</label>
              <textarea
                name="description" value={form.description} onChange={handleInputChange}
                placeholder="Enter project description" rows={3} disabled={isBusy}
                className="p-2 border border-[#D8E4FE] bg-white rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-1 text-[14px] text-[#333333CC] poppins-medium-italic">
                Categories * (comma separated)
              </label>
              <input
                type="text" name="categoryInput" value={form.categoryInput} onChange={handleInputChange}
                placeholder="e.g. Mobile App, UI UX Designing" disabled={isBusy}
                className="px-4 py-2 h-[54px] border border-[#D8E4FE] bg-white rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
              />
            </div>

            {/* Main image */}
            <div className="flex flex-col">
              <ImageUploadField
                label={`Main Project Mockup ${editId ? '(leave empty to keep existing)' : '*'}`}
                name="image"
                preview={previewSrc(form.image, editPreviews.image)}
                onChange={handleInputChange}
                disabled={isBusy}
              />
            </div>

            {/* Hero image */}
            <div className="flex flex-col">
              <ImageUploadField
                label={`Hero Section Image ${editId ? '(leave empty to keep existing)' : ''}`}
                name="heroImage"
                preview={previewSrc(form.heroImage, editPreviews.heroImage)}
                onChange={handleInputChange}
                disabled={isBusy}
              />
            </div>

            {/* Feature section image */}
            <div className="flex flex-col">
              <ImageUploadField
                label={`Feature Section Image ${editId ? '(leave empty to keep existing)' : ''}`}
                name="featureSectionImage"
                preview={previewSrc(form.featureSectionImage, editPreviews.featureSectionImage)}
                onChange={handleInputChange}
                disabled={isBusy}
              />
            </div>

            {/* ══════════════════════════════════════════
                FEATURES — dynamic, multiple items
            ══════════════════════════════════════════ */}
            <div className="md:col-span-2 flex flex-col gap-3">

              {/* Section header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#1E9994]" />
                  <span className="text-[15px] text-[#1E9994] font-semibold">
                    Feature Section Details
                  </span>
                  {form.features.length > 0 && (
                    <span className="text-[11px] bg-[#1E9994] text-white px-2 py-0.5 rounded-full">
                      {form.features.length}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  disabled={isBusy}
                  className="flex items-center gap-1 text-sm bg-[#1E999414] text-[#1E9994] px-4 py-1.5 rounded-[50px] hover:bg-[#1E9994] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Feature
                </button>
              </div>

              {/* Empty state */}
              {form.features.length === 0 && (
                <div className="bg-white border border-dashed border-[#D8E4FE] rounded-xl p-5 text-center text-[13px] text-[#999]">
                  No features added yet. Click <strong>+ Add Feature</strong> to add one.
                </div>
              )}

              {/* Feature cards */}
              {form.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#D8E4FE] rounded-xl p-4 flex flex-col gap-3 relative"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] text-[#1E9994] font-semibold flex items-center gap-2">
                      <Star className="w-3.5 h-3.5" />
                      Feature {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      disabled={isBusy}
                      className="text-red-400 hover:text-red-600 disabled:opacity-40 transition"
                      title="Remove this feature"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Feature Title */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-[13px] text-[#333333CC] poppins-medium-italic">
                      Feature Title *
                    </label>
                    <input
                      type="text"
                      name="featureTitle"
                      value={feat.featureTitle}
                      onChange={(e) => handleFeatureChange(e, idx)}
                      placeholder="e.g. Packed with powerful features"
                      disabled={isBusy}
                      className="p-2 h-[48px] border border-[#D8E4FE] bg-[#F9FBFF] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
                    />
                  </div>

                  {/* Feature Description */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-[13px] text-[#333333CC] poppins-medium-italic">
                      Feature Description *
                    </label>
                    <textarea
                      name="featureDescription"
                      value={feat.featureDescription}
                      onChange={(e) => handleFeatureChange(e, idx)}
                      placeholder="Brief description for this feature"
                      rows={2}
                      disabled={isBusy}
                      className="p-2 border border-[#D8E4FE] bg-[#F9FBFF] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ══════════════════════════════════════════
                PARAGRAPHS
            ══════════════════════════════════════════ */}
            {form.paragraphs.map((para, idx) => (
              <div
                key={idx}
                className="flex flex-col md:col-span-2 bg-white border border-[#D8E4FE] rounded-xl p-4 gap-3 relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[15px] text-[#1E9994] font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Paragraph {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(idx)}
                    disabled={isBusy}
                    className="text-red-400 hover:text-red-600 disabled:opacity-40 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-[13px] text-[#333333CC] poppins-medium-italic">Title *</label>
                  <input
                    type="text" name="paragraphTitle" value={para.paragraphTitle}
                    onChange={(e) => handleParagraphChange(e, idx)}
                    placeholder="Enter paragraph title" disabled={isBusy}
                    className="p-2 h-[48px] border border-[#D8E4FE] bg-[#F9FBFF] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-[13px] text-[#333333CC] poppins-medium-italic">Description *</label>
                  <textarea
                    name="paragraphDescription" value={para.paragraphDescription}
                    onChange={(e) => handleParagraphChange(e, idx)}
                    placeholder="Enter paragraph description" rows={2} disabled={isBusy}
                    className="p-2 border border-[#D8E4FE] bg-[#F9FBFF] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1E9994] disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-[13px] text-[#333333CC] poppins-medium-italic">
                    Image {para.paragraphImage ? '(selected)' : ''}
                  </label>
                  <label
                    className={`flex items-center gap-2 cursor-pointer bg-[#249D981F] text-[#249D98] text-sm px-4 py-2 rounded-[50px] w-fit transition ${
                      isBusy ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1E9994] hover:text-white'
                    }`}
                  >
                    <ImagePlus className="w-4 h-4" />
                    {para.paragraphImage ? 'Change Image' : 'Choose Image'}
                    <input
                      type="file" name="paragraphImage" accept="image/*"
                      onChange={(e) => handleParagraphChange(e, idx)}
                      disabled={isBusy} className="hidden"
                    />
                  </label>
                  {para.paragraphImage && (
                    <img
                      src={URL.createObjectURL(para.paragraphImage)}
                      alt={`para-${idx}`}
                      className="mt-2 w-28 h-16 object-cover rounded-lg border border-[#D8E4FE]"
                    />
                  )}
                </div>
              </div>
            ))}
          </form>

          {/* ── Action buttons ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              type="button" onClick={handleAddParagraph} disabled={isBusy}
              className="cursor-pointer bg-[#1E999414] rounded-[50px] text-[#1E9994] py-2 px-4 w-full hover:bg-[#1E9994] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Paragraph
            </button>

            <button
              type="button" onClick={handleClearAll} disabled={isBusy}
              className="cursor-pointer text-[#FF4D4F] bg-[#FF4D4F1F] rounded-[50px] py-[9px] px-[20px] h-[40px] w-full hover:bg-[#FF4D4F] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button>

            <button
              type="button" onClick={handleSubmit} disabled={isBusy}
              className="cursor-pointer bg-[#1E9994] text-white rounded-[50px] py-[9px] px-[20px] h-[40px] hover:bg-[#15736e] w-full transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {submitting ? 'Processing...' : editId ? 'Update Project' : 'Add Project'}
            </button>
          </div>

          {/* ════════════════════════════════════════
              PROJECT CARDS GRID
          ════════════════════════════════════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {projects.map(project => {
              const isDeleting = deletingId === project._id;
              return (
                <div
                  key={project._id}
                  className={`bg-white p-4 rounded-lg flex flex-col transition ${
                    isDeleting ? 'opacity-50 pointer-events-none' : 'hover:shadow-md'
                  }`}
                  style={{ boxShadow: '0px 2px 14px 0px #0000001F' }}
                >
                  <div className="relative">
                    <img
                      src={project.image || image6}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover rounded-lg mb-4"
                    />
                    {project.heroImage && (
                      <span className="absolute top-2 left-2 bg-[#1E9994] text-white text-[10px] px-2 py-0.5 rounded-full">
                        Hero ✓
                      </span>
                    )}
                    {project.featureSectionImage && (
                      <span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Feature Img ✓
                      </span>
                    )}
                    {isDeleting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg poppins-semibold-italic text-[#333333] mb-1 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-[#595959] poppins-regular-italic mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features preview — show all */}
                  {project.features?.length > 0 && (
                    <div className="mb-3 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
                      <p className="text-[11px] text-purple-600 font-semibold uppercase tracking-wide mb-1">
                        Features ({project.features.length})
                      </p>
                      {project.features.map((feat, i) => (
                        feat.featureTitle && (
                          <p key={i} className="text-[12px] text-[#333] font-medium line-clamp-1">
                            • {feat.featureTitle}
                          </p>
                        )
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {cleanCategories(project.category).map((cat, i) => (
                      <span key={i} className="bg-[#1E9994] text-white text-xs px-3 py-1 rounded-[8px]">
                        {cat}
                      </span>
                    ))}
                  </div>

                  {project.paragraphs?.length > 0 && (
                    <p className="text-[12px] text-[#1E9994] mb-3">
                      {project.paragraphs.length} paragraph{project.paragraphs.length !== 1 ? 's' : ''} added
                    </p>
                  )}

                  <div className="flex justify-between mt-auto pt-2 border-t border-[#F0F0F0]">
                    <button
                      onClick={() => handleEdit(project)}
                      disabled={isBusy}
                      className="flex items-center gap-1 text-sm px-3 py-1 text-[#1E9994] poppins-medium-italic hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Edit <img src={editicon} className="w-4 h-4 ml-1" alt="Edit" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={isBusy}
                      className="flex items-center gap-1 text-sm px-3 py-1 text-red-500 poppins-medium-italic hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                      <img src={deleteicon} className="w-4 h-4 ml-1" alt="Delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {projects.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No portfolios found. Create your first portfolio above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;