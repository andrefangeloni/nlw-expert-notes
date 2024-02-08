import { useState } from 'react'

import logo from './assets/logo-nlw-expert.svg'

import { NewNoteCard, NoteCard } from './components'

type Note = {
  id: string
  date: Date
  content: string
}

export const App = () => {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('nlw-expert@notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const data = [newNote, ...notes]

    setNotes(data)

    localStorage.setItem('nlw-expert@notes', JSON.stringify(data))
  }

  const filteredNotes = search.length
    ? notes.filter((note) =>
        note.content.toLowerCase().includes(search.toLowerCase()),
      )
    : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="" />

      <form>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} date={note.date} content={note.content} />
        ))}
      </div>
    </div>
  )
}
