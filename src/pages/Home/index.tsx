import React, {
  useState,
  FormEvent,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  googleSvg,
  illustrationSvg,
  logoSvg,
} from '../../assets/images';

import { useAuth } from '../../hooks';
import { Button } from '../../components';

import '../../styles/auth.scss'
import { database } from '../../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = useCallback(async () => {
    if (!user) {
      await singInWithGoogle();
    }
    history.push('/rooms/new');
  }, [user, history, singInWithGoogle]);
  const handleJoinRoom = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (roomCode.trim().length <= 0) return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('Essa sala não existe!');
      return;
    }
    if (roomRef.val().closedAt) {
      alert('Essa sala já foi encerrada!');
      return;
    }
    history.push(`/rooms/${roomCode.trim()}`);
  }, [history, roomCode]);

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationSvg} alt="Ilustração simbolizando perguntas e resposta" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoSvg} alt="LetMeAsk" />
          <Button
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleSvg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em sua sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
