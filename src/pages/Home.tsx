import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import NoteEditor from "@/components/NoteEditor";
import NoteCard from "@/components/NoteCard";

import { motion } from "framer-motion";

export interface Note {
  id: string;
  title: string;
  body: string;
  lastEdited: number;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Partial<Note>>({});
  const [search, setSearch] = useState("");
    console.log(currentNote);
  useEffect(() => {
    const storedNotes = localStorage.getItem("quicknote-notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("quicknote-notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleSave = (updatedNote?: Partial<Note>) => {
    const noteToSave = updatedNote || currentNote;
  
    if (!noteToSave.title || !noteToSave.body) return;
  
    if (noteToSave.id) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteToSave.id
            ? { ...note, ...noteToSave, lastEdited: Date.now() }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: noteToSave.title!,
        body: noteToSave.body!,
        lastEdited: Date.now(),
      };
      setNotes([newNote, ...notes]);
    }
  
    setCurrentNote({});
  };
  

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-4 space-y-6"
    >
      <h1 className="text-3xl font-bold text-center text-blue-700">
        QuickNote
      </h1>

      <SearchBar search={search} onSearchChange={setSearch} />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <NoteEditor
            note={currentNote}
            onChange={setCurrentNote}
            onSave={handleSave}
          />
        </div>
        <div className="w-full md:w-2/3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onEdit={setCurrentNote}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
