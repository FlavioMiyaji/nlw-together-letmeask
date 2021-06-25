import { useEffect, useState } from "react";

import { database } from '../services/firebase';
import { useAuth } from "./useAuth";

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
  likeCount: number;
  likedId: string | undefined;
};

type FirebaseQuestions = Record<string, {
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
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
          likes,
        } = value;
        const likeList = Object.entries(likes ?? {});
        const likedId = likeList.find(([_, like]) => like.authorId === user?.id)?.[0];
        return {
          id: key,
          author,
          content,
          isAnswered,
          isHighlighted,
          likeCount: likeList.length,
          likedId,
        };
      });
      setTitle(databaseRoom.title);
      setQuestions(parseQuestions);
    });
    return () => roomRef.off('value');
  }, [roomId, user?.id]);
  return {
    questions,
    title,
  };
};
