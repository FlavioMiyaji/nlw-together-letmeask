import React, {
  useState,
  FormEvent,
  useCallback,
} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Images } from '../../assets';

import { database } from '../../services/firebase';
import { Button } from '../../components';

import '../../styles/auth.scss'
import { useAuth } from '../../hooks';

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const handleCreateRoom = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (newRoom.trim().length <= 0) return;
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom.trim(),
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
  }, [history, newRoom, user?.id]);

  return (
    <div id="page-auth">
      <aside>
        <img src={Images.illustration} alt="Ilustração simbolizando perguntas e resposta" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={Images.logo} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
