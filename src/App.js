import * as Yup from "yup";
import { IoAdd } from "react-icons/io5";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Rating,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";

function App() {
  const [newNoteDialog, setNewNoteDialog] = useState(false);
  const [rateStar, setRateStar] = useState(1);
  const [note, setNote] = useState([]);
  const handleClickOpen = () => {
    setNewNoteDialog(true);
  };

  const handleClose = () => {
    setNewNoteDialog(false);
  };

  useEffect(() => {
    console.log(note);
  }, [note]);

  return (
    <div className="App ">
      <div className="add_note absolute bottom-5 right-5">
        <Fab onClick={handleClickOpen} variant="extended" color="primary">
          <IoAdd size={20} />
          <h3 className="font-app_base_font font-sembiold text-sm ">
            new note
          </h3>
        </Fab>
      </div>
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
                setNote((note) => [
                  ...note,
                  {
                    subject: values.subject,
                    note: values.note,
                    priority: values.priority,
                  },
                ]);
                handleClose();
              }}
            >
              {({ dirty, handleChange, handleSubmit }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col items-center justify-center gap-y-2 "
                  >
                    <input
                      id="subject"
                      className="shadow border font-semibold   rounded w-full py-2 px-3 text-gray-700 leading-tight  border-gray-300 transition-all placeholder:text-[13px] duration-200  outline-none focus:border focus:border-blue-300"
                      type="text"
                      placeholder="Enter your note's subject ..."
                      onChange={handleChange}
                    ></input>
                    <textarea
                      id="note"
                      placeholder="Enter your note content here..."
                      rows={20}
                      className=" font-base-font shadow resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-gray-300 transition-all placeholder:text-[13px] duration-200  outline-none focus:border focus:border-blue-300"
                      onChange={handleChange}
                    ></textarea>
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
    </div>
  );
}

export default App;
