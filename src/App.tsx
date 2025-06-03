// QuickNote Web App - 40% Complete (React + Tailwind + TypeScript + shadcn/ui)

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

type Note = {
  id: string;
  title: string;
  body: string;
  lastEdited: number;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem("quicknote-notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quicknote-notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!title.trim() || !body.trim()) return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      lastEdited: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setBody("");
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">QuickNote</h1>

      {/* Search Bar */}
      <Input
        placeholder="Search notes by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Note Form */}
      <div className="space-y-2">
        <Input
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Note Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>

      {/* Notes List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredNotes.map(note => (
          <Card key={note.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <Button variant="destructive" onClick={() => handleDelete(note.id)}>Delete</Button>
              </div>
              <p className="text-sm text-gray-700">
                {note.body.length > 100 ? note.body.slice(0, 100) + '...' : note.body}
              </p>
              <p className="text-xs text-gray-500">
                Last edited {formatDistanceToNow(new Date(note.lastEdited), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
