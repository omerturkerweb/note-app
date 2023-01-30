import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  Fab,
  IconButton,
  Popover,
  Rating,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiFillEdit,
  AiFillDelete,
  AiOutlineCloseCircle,
} from "react-icons/ai";
export default function Notes({
  note,
  notes,
  setNotes,
  setEditingNote,
  editingNote,
}) {
  const [deleteNoteDialog, setDeleteNoteDialog] = useState(false);
  const [snackDeleted, setSnackDeleted] = useState(false);
  const deleteNote = (id) => {
    setNotes([...notes.filter((note) => note.id !== id)]);
  };
  useEffect(() => {
    const noteCard = document.querySelector(".note_card");
    noteCard.classList.toggle("card_editing");
    console.log(editingNote);
  }, [editingNote]);
  return (
    <div className="note_card transition-all duration-300  bg-white shadow-xl w-[250px] h-[300px] my-5 mx-3 rounded-md border border-gray-200">
      <Snackbar
        open={snackDeleted}
        autoHideDuration={4000}
        onClose={() => {
          setSnackDeleted(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackDeleted(false);
          }}
          severity="warning"
        >
          Your note has been successfully deleted please check it!
        </Alert>
      </Snackbar>
      <Dialog open={deleteNoteDialog}>
        <div className="delete_note_dialog_content flex flex-col items-center justify-center gap-y-3  p-10 ">
          <div className="close_delete_dialog_icon absolute right-2 top-2">
            <Tooltip className="self-end" title="Delete">
              <IconButton onClick={() => setDeleteNoteDialog(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>

          <Alert severity="warning">
            <AlertTitle>Are you sure want to delete this note?</AlertTitle>
          </Alert>
          <div className="pt-4">
            <Button
              onClick={() => {
                setSnackDeleted(true);
                setDeleteNoteDialog(false);
                deleteNote(note.id);
              }}
              color="primary"
              title="Accept"
            >
              Accept
            </Button>
          </div>
        </div>
      </Dialog>
      <div className="note_card_top  border-b border-gray-200 flex flex-row items-center justify-between pr-3 pt-1 font-semibold">
        <h3 className="font-app_base_font p-3">
          {note.subject.length > 13
            ? note.subject.slice(0, 13) + "..."
            : note.subject}
        </h3>

        <div className="note_actions flex flex-row items-center justify-center gap-x-1">
          <Fab
            onClick={() => {
              editingNote ? setEditingNote(false) : setEditingNote(true);
            }}
            size="small"
            color="primary"
          >
            <AiFillEdit size={15} />
          </Fab>
          <Fab
            onClick={() => {
              setDeleteNoteDialog(true);
            }}
            size="small"
            color="error"
          >
            <AiFillDelete size={15} />
          </Fab>
        </div>
      </div>
      <div className="note_card_body select-none cursor-pointer  !h-[65%] ">
        <p className="font-app_base_font p-2 break-words  tracking-tighter ">
          {note.note.length > 200 ? note.note.slice(0, 200) + "..." : note.note}
        </p>
      </div>
      <div className="  note_card_bottom pt-3 flex flex-row items-center justify-between px-2">
        <div className="star_rate">
          <Rating value={note.priority} disabled></Rating>
        </div>
        <span className="font-app_base_font text-sm text-gray-400">
          {note.date}
        </span>
      </div>
    </div>
  );
}
