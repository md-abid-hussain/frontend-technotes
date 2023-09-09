import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    console.log(error);
    content = <p className="errmsg">{error?.data.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;

    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (nodeId) => entities[nodeId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <table className="table table_notes">
        <thead className="table_head">
          <tr>
            <th scope="col" className="table_th note_status">
              Status
            </th>
            <th scope="col" className="table_th note_created">
              Created
            </th>
            <th scope="col" className="table_th note_updated">
              Updated
            </th>
            <th scope="col" className="table_th note_title">
              Title
            </th>
            <th scope="col" className="table_th note_owner">
              Owner
            </th>
            <th scope="col" className="table_th note_edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return <section>{content}</section>;
};

export default NotesList;
