interface LegalSection {
  heading: string;
  clauses: string[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  lastUpdated?: string;
  sections: LegalSection[];
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#3D5A3E] mb-6">
          {doc.title}
        </h1>
        <p className="text-[#6B6560] text-lg max-w-xl mx-auto">{doc.intro}</p>
        {doc.lastUpdated && (
          <p className="text-[#8B7355] text-sm mt-4">
            Last updated: {doc.lastUpdated}
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8 space-y-6">
        {doc.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-serif text-xl text-[#3D5A3E] mb-3">
              {section.heading}
            </h2>
            <ul className="space-y-2">
              {section.clauses.map((clause, i) => (
                <li key={i} className="text-[#6B6560] leading-relaxed">
                  {clause}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
