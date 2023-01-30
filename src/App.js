import * as Yup from "yup";
import { IoAdd } from "react-icons/io5";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Rating,
  Snackbar,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import NotesSkeleton from "./components/NotesSkeleton";

function App() {
  const [newNoteDialog, setNewNoteDialog] = useState(false);
  const [rateStar, setRateStar] = useState(1);
  const [notes, setNotes] = useState([]);
  const [touchedNoteInput, setTouchedNoteInput] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [idGenerator, setIdGenerator] = useState(0);
  const [editingNote, setEditingNote] = useState(false);
  const handleClickOpen = () => {
    setNewNoteDialog(true);
  };

  const handleClose = () => {
    setNewNoteDialog(false);
  };

  const snackSuccessHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackSuccess(false);
  };

  const currentDate = new Date();
  return (
    <div className="App ">
      <div className="add_note fixed bottom-5 right-5">
        <Fab onClick={handleClickOpen} variant="extended" color="primary">
          <IoAdd size={20} />
          <h3 className="font-app_base_font font-sembiold text-sm ">
            new note
          </h3>
        </Fab>
      </div>
      <Snackbar
        open={snackSuccess}
        autoHideDuration={4000}
        onClose={snackSuccessHandleClose}
      >
        <Alert onClose={snackSuccessHandleClose} severity="success">
          Your note has been successfully saved please check it out!
        </Alert>
      </Snackbar>

      <div className="add_new_note_dialog">
        <Dialog
          fullWidth={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={handleClose}
          open={newNoteDialog}
        >
          <DialogTitle className="text-center">{`add new note`}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                subject: "",
                note: "",
                priority: 0,
              }}
              validationSchema={Yup.object({
                subject: Yup.string().required("Subject can't be empty!"),
                note: Yup.string().required("Note can't be empty!"),
              })}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                values.priority = rateStar;
                setNotes((note) => [
                  ...note,
                  {
                    id: idGenerator,
                    subject: values.subject,
                    note: values.note,
                    priority: values.priority,
                    date: `${currentDate.getDate()}.${
                      currentDate.getMonth() + 1
                    }.${currentDate.getFullYear()} ${currentDate.getHours()}.${currentDate.getMinutes()}`,
                  },
                ]);
                setIdGenerator(idGenerator + 1);
                handleClose();
                setSnackSuccess(true);
              }}
            >
              {({
                dirty,
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,
              }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col items-center justify-center gap-y-2 "
                  >
                    <input
                      required
                      id="subject"
                      className={
                        errors.subject
                          ? "shadow border font-semibold border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight transition-all placeholder:text-[13px] duration-200  outline-none focus:border focus:border-blue-300"
                          : "shadow border font-semibold rounded w-full py-2 px-3 text-gray-700 leading-tight  border-gray-300 transition-all placeholder:text-[13px] duration-300  outline-none focus:border focus:border-blue-300"
                      }
                      type="text"
                      placeholder="Enter your note's subject ..."
                      onChange={handleChange}
                    ></input>

                    <Alert
                      className={`${
                        errors.subject
                          ? "transition-all  duration-300 w-[100%] h-[30px] flex flex-row items-center justify-center"
                          : "transition-all duration-300 !hidden"
                      }`}
                      color="error"
                      variant="filled"
                    >
                      {errors.subject}
                    </Alert>
                    <textarea
                      onClick={() => {
                        setTouchedNoteInput(true);
                      }}
                      required
                      id="note"
                      placeholder="Enter your note content here..."
                      rows={20}
                      className=" font-base-font shadow resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-gray-300 transition-all placeholder:text-[13px] duration-200  outline-none focus:border focus:border-blue-300"
                      onChange={handleChange}
                    ></textarea>
                    <Alert
                      className={`${
                        errors.note && touchedNoteInput
                          ? "transition-all  duration-300 w-[100%] h-[30px] flex flex-row items-center justify-center"
                          : "transition-all duration-300 !hidden"
                      }`}
                      color="error"
                      variant="filled"
                    >
                      {errors.note}
                    </Alert>
                    <Rating
                      id="priority"
                      onChange={(e, newValue) => {
                        setRateStar(newValue);
                      }}
                      value={rateStar}
                      name="simple-controlled"
                    ></Rating>
                    <Button
                      type="submit"
                      className="self-end"
                      disabled={!dirty}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={
          notes.length > 0
            ? "notes_main !bg-notes_bg rounded-xl border border-gray-200 shadow-xl w-[1140px] mx-auto mt-[5%] relative px-5"
            : "notes_main !bg-notes_bg rounded-xl border border-gray-200 shadow-xl w-3/4 h-3/4 mx-auto mt-[5%] relative px-5"
        }
      >
        {notes.length > 0 ? (
          <div className="notes_main flex flex-row items-center justify-start flex-wrap">
            {notes
              .sort((a, b) => b.priority - a.priority)
              .map((note, index) => {
                return (
                  <Notes
                    editingNote={editingNote}
                    setEditingNote={setEditingNote}
                    setNotes={setNotes}
                    notes={notes}
                    note={note}
                    key={index}
                  ></Notes>
                );
              })}
          </div>
        ) : (
          <NotesSkeleton />
        )}
        <div
          onClick={handleClickOpen}
          className="add_note_container absolute bottom-5 right-5"
        >
          <Fab variant="extended" color="primary">
            <IoAdd size={20} />
          </Fab>
        </div>
      </div>
    </div>
  );
}

export default App;
