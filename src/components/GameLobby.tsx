import { useState, useEffect } from "react";
import type { Lobby } from "boardgame.io/react";

type Props = Parameters<
  NonNullable<ConstructorParameters<typeof Lobby>[0]["renderer"]>
>[0];

const enum LobbyStage {
  nameSelect,
  gameSelect,
  showCredits,
}

function LobbyWrapper({
  children,
}: {
  children: Array<JSX.Element> | JSX.Element;
}) {
  return (
    <div className="min-h-screen w-screen justify-center items-center flex bg-justusbg">
      <div className="flex flex-col items-center h-full">
        <div
          className="leading-none text-justusfont mt-20"
          style={{
            fontSize: "80pt",
            fontFamily: "Bebas Neue",
          }}
        >
          DAS SPIEL DES
        </div>
        <div
          className="leading-none text-justusfont"
          style={{
            fontSize: "157pt",
            fontFamily: "Bebas Neue",
          }}
        >
          JUSTUS
        </div>
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
}

function CreditsPage({
  setLobbyStage,
}: {
  setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
}) {
  return (
    <div className="text-center text-white space-y-2">
      <p>
        <button
          onClick={() => setLobbyStage(LobbyStage.nameSelect)}
          className="bg-lButton hover:bg-lButtonH rounded-2xl duration-150 transition text-white p-3"
        >
          Zurück
        </button>
      </p>
      <p>TODO: Add Credits</p>
    </div>
  );
}

function NameSelect(
  props: Props & {
    setLobbyStage: React.Dispatch<React.SetStateAction<LobbyStage>>;
  }
) {
  const [name, setName] = useState("");

  function handleNameChange(newName: string) {
    if (newName.length > 20) return;
    setName(newName);
  }

  function submit() {
    props.handleEnterLobby(name.trim());
    props.setLobbyStage(LobbyStage.gameSelect);
  }

  return (
    <div className="text-center">
      <div className="flex">
        <input
          className="bg-transparent text-white font-medium placeholder:text-gray-100 placeholder:font-normal border border-white rounded-xl px-4 py-3 outline-none caret-white"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
          onKeyDown={(ev) => ev.key == "Enter" && submit()}
        />
        <button
          className="text-white ml-4 bg-lButton px-3 rounded-xl font-normal hover:bg-lButtonH transition duration-150 disabled:bg-lButtonD"
          onClick={submit}
          disabled={!name.trim()}
        >
          Zur Lobby
        </button>
      </div>
      <button
        onClick={() => props.setLobbyStage(LobbyStage.showCredits)}
        className="mt-24 bg-lButton hover:bg-lButtonH rounded-2xl duration-150 transition text-white p-3"
      >
        Credits
      </button>
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
  const [playerCount, setPlayerCount] = useState(2);
  const [createdMatch, setCreatedMatch] = useState(false);

  const match = props.matches.find((match) => match.matchID == matchID);

  // auto join back matches
  useEffect(() => {
    console.log(props.playerName);
    const existingMatch = props.matches.find((match) =>
      match.players
        .filter((player) => player.name)
        .map((player) => player.name)
        .includes(props.playerName)
    );

    (async () => {
      if (existingMatch) {
        const player = existingMatch.players.find(
          (player) => player.name == props.playerName
        );
        await props.handleJoinMatch(
          "justus",
          existingMatch.matchID,
          player!.id.toString()
        );
        setPlayerID(player!.id.toString());
        setMatchID(existingMatch.matchID);
      }
    })();
  }, []);

  // auto-start match if lobby is full
  useEffect(() => {
    if (
      match &&
      playerID &&
      match.players.filter((player) => player.name).length ==
        match.players.length
    ) {
      props.handleStartMatch("justus", {
        matchID: match.matchID,
        playerID,
        numPlayers: match.players.length,
      });
    }
  }, [match]);

  // auto join self-created match
  useEffect(() => {
    if (createdMatch) {
      const match = props.matches.at(-1);
      if (!match) return;
      props.handleJoinMatch("justus", match.matchID, "0");
      setPlayerID("0");
      setMatchID(match.matchID);
      setCreatedMatch(false);
    }
  });

  return (
    <div className="flex flex-col items-center">
      {props.matches.filter((match) => !match.gameover).length >= 1 && (
        <div className="border border-white p-4 rounded-2xl text-white w-72 max-h-full">
          {props.matches
            .filter((match) => !match.gameover)
            .map((match, i) => {
              return (
                <div key={match.matchID}>
                  {!(i === 0) && (
                    <div className="h-px w-ful mt-4 mb-4 bg-white" />
                  )}
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="text-xl">
                        Match {i + 1} (
                        {match.players.filter((player) => player.name).length}/
                        {match.players.length} Spieler)
                      </div>
                      {match.players.filter((player) => player.name).length !=
                      match.players.length ? (
                        <>
                          {!matchID && (
                            <button
                              className="px-2 bg-lButton rounded-md ml-2 hover:bg-lButtonH transition duration-150"
                              onClick={async () => {
                                const seat = match.players.find(
                                  (player) => !player.name
                                );
                                const pID = seat
                                  ? seat.id.toString()
                                  : undefined;
                                if (pID)
                                  await props.handleJoinMatch(
                                    "justus",
                                    match.matchID,
                                    pID
                                  );
                                setPlayerID(pID);
                                setMatchID(match.matchID);
                              }}
                            >
                              Join
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          disabled
                          className="px-2 bg-lBred rounded-md ml-2 hover:bg-lBredH transition duration-150"
                        >
                          Voll
                        </button>
                      )}
                      {matchID == match.matchID && (
                        <button
                          className="px-2 bg-lBred rounded-md ml-2 hover:bg-lBredH transition duration-150"
                          onClick={() => {
                            if (matchID) {
                              props.handleLeaveMatch("justus", matchID);
                              setMatchID(undefined);
                            }
                          }}
                        >
                          Leave
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex">
                      {match.players.filter((player) => player.name).length < 1
                        ? "Keine Spieler"
                        : match.players
                            .filter((player) => player.name)
                            .map((player) => player.name)
                            .join(", ")}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {match ? (
        <button
          onClick={() =>
            props.handleStartMatch("justus", {
              matchID: match.matchID,
              numPlayers: match.players.length,
              playerID,
            })
          }
          disabled={
            match.players.filter((player) => player.name).length !=
            match.players.length
          }
          className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-xl p-3 mt-4 text-white"
        >
          {match.players.filter((player) => player.name).length !=
          match.players.length
            ? "Warte auf Spieler..."
            : "Match Starten!"}
        </button>
      ) : (
        <div className="text-white space-x-2">
          <select
            defaultValue="2"
            onChange={(event) => setPlayerCount(parseInt(event.target.value))}
            className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-2xl p-3.5 mt-4 outline-none"
            style={{ borderRight: "16px solid transparent" }}
          >
            {[2, 3, 4, 5, 6].map((count) => (
              <option key={count}>{count} Spieler</option>
            ))}
          </select>
          <button
            onClick={async () => {
              await props.handleCreateMatch("justus", playerCount);
              setCreatedMatch(true);
            }}
            className="bg-lButton hover:bg-lButtonH transition duration-150 rounded-2xl p-3 mt-4"
          >
            Lobby erstellen
          </button>
        </div>
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
      ) : lobbyStage == LobbyStage.gameSelect ? (
        <GameSelect {...props} setLobbyStage={setLobbyStage} />
      ) : (
        <CreditsPage setLobbyStage={setLobbyStage} />
      )}
    </LobbyWrapper>
  );
}
