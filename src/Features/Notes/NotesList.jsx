import {useGetNotesQuery} from './notesApiSlice'
import Note from './Note'
 
const NotesList = () => {

  const {
    data:notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery()

  let content ;
  if(isLoading){
    content = <p>Loading...</p>
  }

  if(isError){
    content = <p className='errMsg'>{error?.error}</p>
  }

  if(isSuccess){
    const {ids} = notes

    const tableContent = ids?.length
          ? ids.map(noteId=><Note key={noteId} noteId={noteId}/>)
          : null

    content = (
      <table className='table table_notes'>
        <thead className='table_head'>
          <tr>
            <th scope='col' className='table_th note_status'>Status</th>
            <th scope='col' className='table_th note_created'>Created</th>
            <th scope='col' className='table_th note_updated'>Updated</th>
            <th scope='col' className='table_th note_title'>Title</th>
            <th scope='col' className='table_th note_owner'>Owner</th>
            <th scope='col' className='table_th note_edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return <section>
    {content}
  </section>
}

export default NotesList