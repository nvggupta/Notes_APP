import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

export interface Note {
  id: string;
  title: string;
  body: string;
  lastEdited: number;
}

interface NoteEditorProps {
  note: Partial<Note>;
  onChange: (note: Partial<Note>) => void;
  onSave: () => void;
}

const NoteEditor =  ({ note, onChange, onSave }: NoteEditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Note>>({
    defaultValues: {
      title: note.title || "",
      body: note.body || "",
    },
  });
  useEffect(() => {
    reset({
      title: note.title || "",
      body: note.body || "",
    });
  }, [note, reset]);



  const onSubmit = (data: Partial<Note>) => {
    const updatedNote = { ...note, ...data };
  
    onChange(updatedNote); 
    onSave(updatedNote);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 bg-white p-4 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Input
          placeholder="Note Title"
          {...register("title", { required: "Title is required" })}
       
          
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Note Body"
          {...register("body", { required: "Body is required" })}
        
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" variant="secondary">
        {note.id ? "Update Note" : "Add Note"}
      </Button>
    </motion.form>
  );
};

export default NoteEditor;
