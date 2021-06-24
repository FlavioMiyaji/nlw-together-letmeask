import { useEffect, useState } from "react";

import { database } from '../services/firebase';

type Author = {
  name: string;
  avatar: string;
};

type QuestionType = {
  id: string;
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type FirebaseQuestions = Record<string, {
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>;

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    // TODO - Check - Read Event Types (Child Added/Changed/Removed/Moved)
    // once -> on
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parseQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        const {
          author,
          content,
          isAnswered,
          isHighlighted,
        } = value;
        return {
          id: key,
          author,
          content,
          isAnswered,
          isHighlighted,
        };
      });
      setTitle(databaseRoom.title);
      setQuestions(parseQuestions);
    });
  }, [roomId]);
  return {
    questions,
    title,
  };
};
