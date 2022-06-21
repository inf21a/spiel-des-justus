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

  function submit() {
    props.handleEnterLobby(name);
    props.setLobbyStage(LobbyStage.gameSelect);
  }

  return (
    <div className="text-center space-y-8">
      <p>
        <input
          type="input"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="text-2xl p-2"
          onKeyDown={(ev) => ev.key == "Enter" && submit()}
        />
      </p>
      <p>
        <button
          onClick={submit}
          disabled={!name}
          className="bg-green-500 p-4 text-xl disabled:bg-slate-200"
        >
          Zur Lobby
        </button>
      </p>
    </div>
  );
}

function GameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [matchID, setMatchID] = useState<string>();
  const [playerID, setPlayerID] = useState<string>();

  return (
    <div className="text-center">
      <ul>
        {props.matches.map((match, i) => (
          <div key={match.matchID}>
            <li>
              Match {i + 1} (
              {match.players.filter((player) => player.name).length < 1
                ? "Keine Spieler"
                : match.players
                    .filter((player) => player.name)
                    .map((player) => player.name)
                    .join(", ")}
              )
            </li>
            {!matchID && (
              <button
                onClick={async () => {
                  const seat = match.players.find((player) => !player.name);
                  const pID = seat ? seat.id.toString() : undefined;
                  if (pID)
                    await props.handleJoinMatch("justus", match.matchID, pID);
                  setPlayerID(pID);
                  setMatchID(match.matchID);
                }}
              >
                Beitreten
              </button>
            )}
            {matchID == match.matchID && (
              <button
                onClick={() => {
                  if (matchID) {
                    props.handleLeaveMatch("justus", matchID);
                    setMatchID(undefined);
                  }
                }}
              >
                Verlassen
              </button>
            )}
          </div>
        ))}
      </ul>
      {matchID ? (
        <button
          onClick={() =>
            props.handleStartMatch("justus", {
              matchID,
              numPlayers: 2,
              playerID,
            })
          }
          className="bg-green-500 p-2 my-4"
        >
          Match starten
        </button>
      ) : (
        <button
          onClick={() => props.handleCreateMatch("justus", 2)}
          className="bg-purple-500 p-2 my-4"
        >
          Neues Match
        </button>
      )}
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
