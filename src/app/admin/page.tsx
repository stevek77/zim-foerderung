"use client";

import { useState, useEffect } from "react";
import { Save, LogOut, Check, Loader2, ExternalLink } from "lucide-react";

// Content section definitions
const SECTIONS = [
  { key: "hero", label: "Hero", file: "content-hero.json" },
  { key: "overview", label: "ZIM Übersicht", file: "content-overview.json" },
  { key: "funding", label: "Fördersätze", file: "content-funding.json" },
  { key: "services", label: "Leistungen", file: "content-services.json" },
  { key: "testimonials", label: "Kundenstimmen", file: "content-testimonials.json" },
  { key: "about", label: "Über uns", file: "content-about.json" },
  { key: "cta", label: "CTA Section", file: "content-cta.json" },
  { key: "faq", label: "FAQ", file: "content-faq.json" },
  { key: "footer", label: "Footer", file: "content-footer.json" },
  { key: "nav", label: "Navigation", file: "content-nav.json" },
  { key: "meta", label: "SEO Meta", file: "content-meta.json" },
] as const;

const GITHUB_OWNER = "stevek77";
const GITHUB_REPO = "zim-foerderung";
const GITHUB_BRANCH = "main";
const CONTENT_PATH = "src/data";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [content, setContent] = useState<Record<string, any>>({});
  const [originalContent, setOriginalContent] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [githubToken, setGithubToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Simple password check (hash comparison)
  const handleLogin = () => {
    // Simple password - in production use env variable + hash
    if (password === "foerder2025!") {
      setAuthenticated(true);
      setLoginError("");
      // Load saved token from localStorage
      const saved = localStorage.getItem("admin_github_token");
      if (saved) setGithubToken(saved);
    } else {
      setLoginError("Falsches Passwort");
    }
  };

  // Load all content on mount
  useEffect(() => {
    if (!authenticated) return;
    loadAllContent();
  }, [authenticated]);

  const loadAllContent = async () => {
    const loaded: Record<string, any> = {};
    for (const section of SECTIONS) {
      try {
        // Fetch from GitHub to get latest
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}/${section.file}?ref=${GITHUB_BRANCH}`,
          {
            headers: githubToken
              ? { Authorization: `Bearer ${githubToken}` }
              : {},
          }
        );
        if (res.ok) {
          const data = await res.json();
          const decoded = JSON.parse(atob(data.content));
          loaded[section.key] = { data: decoded, sha: data.sha };
        }
      } catch {
        // Fallback: try direct fetch
        try {
          const res = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${CONTENT_PATH}/${section.file}`
          );
          if (res.ok) {
            const data = await res.json();
            loaded[section.key] = { data, sha: null };
          }
        } catch {
          console.error(`Failed to load ${section.file}`);
        }
      }
    }
    setContent(loaded);
    setOriginalContent(JSON.parse(JSON.stringify(loaded)));
  };

  // Save content to GitHub
  const handleSave = async () => {
    if (!githubToken) {
      setShowTokenInput(true);
      return;
    }

    setSaving(true);
    setSaveStatus("idle");

    const section = SECTIONS.find((s) => s.key === activeSection);
    if (!section || !content[activeSection]) return;

    try {
      const fileContent = JSON.stringify(content[activeSection].data, null, 2);
      const encoded = btoa(unescape(encodeURIComponent(fileContent)));

      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}/${section.file}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `content: update ${section.label} via Admin Dashboard`,
            content: encoded,
            sha: content[activeSection].sha,
            branch: GITHUB_BRANCH,
          }),
        }
      );

      if (res.ok) {
        const result = await res.json();
        // Update SHA for next save
        setContent((prev) => ({
          ...prev,
          [activeSection]: {
            ...prev[activeSection],
            sha: result.content.sha,
          },
        }));
        setOriginalContent((prev) => ({
          ...prev,
          [activeSection]: JSON.parse(
            JSON.stringify(content[activeSection])
          ),
        }));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        const err = await res.json();
        console.error("Save error:", err);
        setSaveStatus("error");
      }
    } catch (err) {
      console.error("Save failed:", err);
      setSaveStatus("error");
    }

    setSaving(false);
  };

  const saveGithubToken = () => {
    localStorage.setItem("admin_github_token", githubToken);
    setShowTokenInput(false);
  };

  // Update nested content value
  const updateValue = (path: string, value: any) => {
    setContent((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = updated[activeSection].data;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        obj = obj[key];
      }
      const lastKey = isNaN(Number(keys[keys.length - 1]))
        ? keys[keys.length - 1]
        : Number(keys[keys.length - 1]);
      obj[lastKey] = value;
      return updated;
    });
  };

  const hasChanges = () => {
    return (
      JSON.stringify(content[activeSection]) !==
      JSON.stringify(originalContent[activeSection])
    );
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface-soft flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm border border-border-DEFAULT">
          <div className="text-center mb-6">
            <img
              src="/logo-foerder-kompass-cropped.jpeg"
              alt="Förder-Kompass"
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold text-heading">
              Admin Dashboard
            </h1>
            <p className="text-body-light text-sm mt-1">
              Inhalte verwalten
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
              autoFocus
            />
            {loginError && (
              <p className="text-red-500 text-sm mt-2">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark justify-center"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentData = content[activeSection]?.data;

  // Main Dashboard
  return (
    <div className="min-h-screen bg-surface-soft">
      {/* Top Bar */}
      <header className="bg-white border-b border-border-DEFAULT sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo-foerder-kompass-cropped.jpeg"
              alt="Förder-Kompass"
              className="h-8"
            />
            <span className="text-sm font-medium text-body-light">
              Content Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-sm text-body-light hover:text-primary-DEFAULT flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Seite ansehen
            </a>
            {!githubToken && (
              <button
                onClick={() => setShowTokenInput(true)}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                GitHub Token fehlt
              </button>
            )}
            <button
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
              }}
              className="text-sm text-body-light hover:text-red-500 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* GitHub Token Modal */}
      {showTokenInput && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-lg mb-2">GitHub Token</h3>
            <p className="text-body-light text-sm mb-4">
              Wird benötigt um Änderungen zu speichern. Token wird nur lokal
              gespeichert.
            </p>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 mb-4 font-mono"
            />
            <div className="flex gap-3">
              <button
                onClick={saveGithubToken}
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark text-sm"
              >
                Speichern
              </button>
              <button
                onClick={() => setShowTokenInput(false)}
                className="btn-pill border border-border-DEFAULT text-body hover:bg-surface-soft text-sm"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-white border-r border-border-DEFAULT min-h-[calc(100vh-64px)] sticky top-16 p-4">
          <p className="text-xs font-medium text-body-light uppercase tracking-wider mb-3 px-3">
            Sektionen
          </p>
          <nav className="space-y-0.5">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === section.key
                    ? "bg-primary-DEFAULT/10 text-primary-DEFAULT font-medium"
                    : "text-body hover:bg-surface-soft"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-heading">
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </h2>
            <div className="flex items-center gap-3">
              {saveStatus === "saved" && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Gespeichert & Deploy gestartet
                </span>
              )}
              {saveStatus === "error" && (
                <span className="text-sm text-red-500">
                  Fehler beim Speichern
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges()}
                className={`btn-pill text-sm ${
                  hasChanges()
                    ? "bg-primary-DEFAULT text-white hover:bg-primary-dark"
                    : "bg-surface-soft text-body-light cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Speichert..." : "Speichern & Deploy"}
              </button>
            </div>
          </div>

          {/* Content Editor */}
          {currentData ? (
            <div className="space-y-6">
              {renderEditor(currentData, "", updateValue, activeSection)}
            </div>
          ) : (
            <div className="text-center py-20 text-body-light">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary-DEFAULT" />
              <p>Inhalte werden geladen...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Recursive editor renderer
function renderEditor(
  data: any,
  path: string,
  updateValue: (path: string, value: any) => void,
  sectionKey: string
) {
  if (typeof data === "string") {
    const isLong = data.length > 100;
    return isLong ? (
      <textarea
        value={data}
        onChange={(e) => updateValue(path, e.target.value)}
        rows={Math.min(Math.ceil(data.length / 80), 8)}
        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 resize-y"
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => updateValue(path, e.target.value)}
        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30"
      />
    );
  }

  if (typeof data === "boolean") {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={data}
          onChange={(e) => updateValue(path, e.target.checked)}
          className="w-4 h-4 rounded border-border-DEFAULT text-primary-DEFAULT focus:ring-primary-DEFAULT/30"
        />
        <span className="text-sm text-body">{data ? "Ja" : "Nein"}</span>
      </label>
    );
  }

  if (typeof data === "number") {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => updateValue(path, Number(e.target.value))}
        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30"
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((item, idx) => {
          const itemPath = path ? `${path}.${idx}` : `${idx}`;
          if (typeof item === "string") {
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-body-light w-6 shrink-0">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateValue(itemPath, e.target.value)}
                  className="flex-1 border border-border-DEFAULT rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30"
                />
              </div>
            );
          }
          return (
            <div
              key={idx}
              className="bg-white border border-border-DEFAULT rounded-lg p-5"
            >
              <div className="text-xs font-medium text-body-light mb-3 uppercase tracking-wider">
                Eintrag {idx + 1}
              </div>
              <div className="space-y-3">
                {renderEditor(item, itemPath, updateValue, sectionKey)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          const fieldPath = path ? `${path}.${key}` : key;
          // Skip icon fields (not editable)
          if (key === "icon") return null;
          // Nice label from key
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase())
            .replace(/_/g, " ");
          return (
            <div key={key}>
              <label className="block text-sm font-medium text-heading mb-1.5">
                {label}
              </label>
              {renderEditor(value, fieldPath, updateValue, sectionKey)}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
