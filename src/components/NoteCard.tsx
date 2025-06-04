import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export interface Note {
    id: string;
    title: string;
    body: string;
    lastEdited: number;
  };

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}


const NoteCard = ({ note, onDelete, onEdit }: NoteCardProps) => {
    
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-xl transition duration-300">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2
              className="font-semibold text-lg cursor-pointer text-blue-600 hover:underline"
              onClick={() => onEdit(note)}
            >
              {note.title}
            </h2>
            <Button variant="outline" onClick={() => onDelete(note.id)}>
              Delete
            </Button>
          </div>
          <p className="text-sm text-gray-700">
            {note.body.length > 100 ? note.body.slice(0, 100) + '...' : note.body}
          </p>
          <p className="text-xs text-gray-500">
            Last edited {formatDistanceToNow(new Date(note.lastEdited), { addSuffix: true })}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoteCard;