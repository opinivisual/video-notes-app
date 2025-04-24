import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export default function VideoNotesApp() {
  const videoRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, 'notes');
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map(doc => doc.data());
      setNotes(notesList);
    };
    fetchNotes();
  }, []);

  const handlePause = () => {
    setNoteText('');
    setShowNoteInput(true);
  };

  const handlePlay = () => {
    setShowNoteInput(false);
  };

  const saveNote = async () => {
    if (noteText.trim() !== '') {
      const currentTime = videoRef.current.currentTime.toFixed(1);
      await addDoc(collection(db, 'notes'), { time: currentTime, text: noteText });
      setNotes([...notes, { time: currentTime, text: noteText }]);
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  const seekToTime = (time) => {
    videoRef.current.currentTime = time;
    videoRef.current.play();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Video Notes App</h1>
      <video ref={videoRef} onPause={handlePause} onPlay={handlePlay} controls className="w-full rounded-xl mb-4">
        <source src="/your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showNoteInput && (
        <div className="mb-4">
          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Write your note here..." className="w-full p-2 border rounded mb-2" rows="3" />
          <button onClick={saveNote} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Note</button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-2">Notes</h2>
        {notes.length === 0 ? <p className="text-gray-600">No notes yet.</p> :
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  <button onClick={() => seekToTime(note.time)} className="text-blue-600 font-semibold hover:underline mr-2">[{note.time}s]</button>
                  {note.text}
                </div>
              </li>
            ))}
          </ul>}
      </div>
    </div>
  );
}
