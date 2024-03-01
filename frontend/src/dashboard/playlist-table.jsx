export function PlaylistTable({ playlists }) {
  const dummyPlaylists = [
    { name: "Chill Vibes", tracks: 42 },
    { name: "Workout Mix", tracks: 58 },
    { name: "Liked Songs", tracks: 2500 },
  ];

  return (
    <>
      <div className="playlist-container">
        <table className="playlist-table">
          <thead>
            <tr>
              <th><input className="checkbox" type="checkbox" /></th>
              <th>Playlist Name</th>
              <th>Number of Tracks</th>
              <th>{/*context menu here*/}</th>
            </tr>
          </thead>
          <tbody className="playlist-entry">
            {dummyPlaylists.map((playlist, index) => (
              <tr key={index}>
                <td><input className="checkbox" type="checkbox" /></td>
                <td>{playlist.name}</td>
                <td className="centered-text">{playlist.tracks}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <button className="sortify-music-btn staging-btn">
          Go to Staging Area
        </button>
      </div>
    </>
  );
}
