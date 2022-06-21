import { useState } from "react";
import type { Lobby } from "boardgame.io/react";

type Props = Parameters<
  NonNullable<ConstructorParameters<typeof Lobby>[0]["renderer"]>
>[0];

const enum LobbyStage {
  nameSelect,
  gameSelect,
}

function LobbyWrapper({
  children,
}: {
  children: Array<JSX.Element> | JSX.Element;
}) {
  return (
    <div
      style={{ backgroundColor: "#ffedb6" }}
      className="h-screen w-screen justify-center items-center flex"
    >
      <div className="space-y-6">
        <div className="text-center text-4xl font-bold">Spiel des Justus</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function NameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [name, setName] = useState("");
  return (
    <div className="text-center">
      <input
        type="input"
        placeholder="Spielername"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        onClick={() => {
          props.handleEnterLobby(name);
          props.setLobbyStage(LobbyStage.gameSelect);
        }}
      >
        Okay
      </button>
    </div>
  );
}

function GameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [matchID, setMatchID] = useState("");
  const [playerID, setPlayerID] = useState("");
  return (
    <div className="text-center">
      <ul>
        {props.matches.map((match, i) => (
          <div key={match.matchID}>
            <li>
              Match {i + 1} (
              {match.players
                .filter((player) => player.name)
                .map((player) => player.name)
                .join(", ")}
              )
            </li>
            <button
              onClick={async () => {
                const pID = match.players
                  .filter((player) => player.name)
                  .length.toString();
                await props.handleJoinMatch("justus", match.matchID, pID);
                setPlayerID(pID);
                setMatchID(match.matchID);
              }}
            >
              Beitreten
            </button>
            &nbsp;
            <button onClick={() => props.handleLeaveMatch("justus", matchID)}>
              Verlassen
            </button>
            &nbsp;
            <button
              onClick={() => {
                props.handleStartMatch("justus", {
                  matchID,
                  numPlayers: 2,
                  playerID,
                });
              }}
            >
              Start
            </button>
          </div>
        ))}
      </ul>
      <button onClick={() => props.handleCreateMatch("justus", 2)}>
        Match erstellen
      </button>
    </div>
  );
}

export default function GameLobby(props: Props) {
  const [lobbyStage, setLobbyStage] = useState<LobbyStage>(
    LobbyStage.nameSelect
  );

  return (
    <LobbyWrapper>
      {lobbyStage == LobbyStage.nameSelect ? (
        <NameSelect {...props} setLobbyStage={setLobbyStage} />
      ) : (
        <GameSelect {...props} setLobbyStage={setLobbyStage} />
      )}
    </LobbyWrapper>
  );
}
