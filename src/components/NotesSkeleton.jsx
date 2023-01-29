import { Fab, Rating } from "@mui/material";
import { AiFillStar, AiFillEdit, AiFillDelete } from "react-icons/ai";
export default function NotesSkeleton() {
  return (
    <div className="notes_skeleton_main cursor-pointer">
      <div className="skeleton_card bg-white shadow-xl w-[250px] h-[300px] absolute top-[5%] rounded-xl left-[2%]">
        <div className="skeleton_card_top border-b border-gray-200 flex flex-row items-center justify-between px-3 font-semibold">
          <h3 className="font-app_base_font text-gray-400 p-3">
            My future ideas
          </h3>
          <div className="note_actions flex flex-row items-center justify-center gap-x-1">
            <Fab size="small" disabled>
              <AiFillEdit size={15} />
            </Fab>
            <Fab size="small" disabled>
              <AiFillDelete size={15} />
            </Fab>
          </div>
        </div>
        <div className="skeleton_card_body">
          <p className="font-app_base_font text-gray-400 p-2 overflow-auto h-[220px] tracking-tighter">
            “Stay away from those people who try to disparage your ambitions.
            Small minds will always do that, but great minds will give you a
            feeling that you can become great too.” — Mark Twain
          </p>
        </div>
        <div className="skeleton_card_bottom flex flex-row items-center justify-between px-2">
          <div className="star_rate">
            <Rating value={3} disabled></Rating>
          </div>
          <span className="font-app_base_font text-sm text-gray-400">
            29.01.2023 14.33
          </span>
        </div>
      </div>
    </div>
  );
}
