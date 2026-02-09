import { forwardRef } from 'react'
import { GIRL_NAME } from '../../constants/index.js'

// Grid: row1 = image top-left, note top-right; row2 = note middle-left, image middle-right; row3 = image bottom-left, note bottom-right
export function renderBookPageContent(pageContent) {
  if (!pageContent) return <div className="notebook-page-blank" />
  if (pageContent.dedication) {
    return (
      <div className="notebook-page dedication-page">
        <p className="dedication-for">Made with love</p>
        <p className="dedication-for">For My Love</p>
        <p className="dedication-name">{GIRL_NAME}</p>
        <p className="dedication-hearts">💕</p>
      </div>
    )
  }
  if (pageContent.letter) {
    const formatBold = (text) =>
      text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )
    return (
      <div className="notebook-page letter-page">
        {pageContent.title && <h2 className="notebook-letter-title">{pageContent.title}</h2>}
        {pageContent.lines.map((line, i) => (
          <p
            key={i}
            className={`notebook-letter-line ${i === pageContent.lines.length - 1 ? 'notebook-letter-signature' : ''}`}
          >
            {formatBold(line)}
          </p>
        ))}
      </div>
    )
  }
  if (pageContent.blank) {
    return <div className="notebook-page notebook-page-blank" />
  }
  const imageUrls = pageContent.imageUrls || []
  const notes = pageContent.notes || []
  const allRows = [
    { imageFirst: true, imageSlot: 0, noteSlot: 0 },
    { imageFirst: false, imageSlot: 1, noteSlot: 1 },
    { imageFirst: true, imageSlot: 2, noteSlot: 2 },
  ]
  let rows = allRows.filter((row) => imageUrls[row.imageSlot])
  if (pageContent.skipMiddleRow && rows.length === 3) rows = [rows[0], rows[2]]

  if (rows.length === 1) {
    const row = rows[0]
    return (
      <div className="notebook-page notebook-page-single">
        <div className="notebook-single-image-wrap">
          <div className="notebook-image-slot">
            <img
              src={imageUrls[row.imageSlot]}
              alt=""
              className="notebook-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="notebook-single-note-wrap">
          {notes[row.noteSlot] && (
            <div className="notebook-note">
              <span className="notebook-note-icon">📌</span>
              {notes[row.noteSlot]}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="notebook-page">
      <div className="notebook-grid">
        {rows.map((row, ri) => (
          <div key={ri} className="notebook-grid-row">
            {row.imageFirst ? (
              <>
                <div className="notebook-image-slot">
                  <img
                    src={imageUrls[row.imageSlot]}
                    alt=""
                    className="notebook-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="notebook-note-slot">
                  {notes[row.noteSlot] && (
                    <div className="notebook-note">
                      <span className="notebook-note-icon">📌</span>
                      {notes[row.noteSlot]}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="notebook-note-slot">
                  {notes[row.noteSlot] && (
                    <div className="notebook-note">
                      <span className="notebook-note-icon">📌</span>
                      {notes[row.noteSlot]}
                    </div>
                  )}
                </div>
                <div className="notebook-image-slot">
                  <img
                    src={imageUrls[row.imageSlot]}
                    alt=""
                    className="notebook-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const BookPage = forwardRef(({ pageContent }, ref) => (
  <div ref={ref} className="flip-book-page">
    {renderBookPageContent(pageContent)}
  </div>
))

export { BookPage }
