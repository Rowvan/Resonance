import { Account, Client, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.ods.resonance",
    projectID: "670ae71c000fffdfa3a8",
    databaseID: "670aec0f002ed83c9d15",
    userCollectionID: "670aec2a0037436453c2",
    artistCollectionID: "670b25ec000b7086260f",
    albumCollectionID: "670b26c800358a2fb4d1",
    songCollectionID: "670b252b003a7f65e3dc",
    resonanceCollectionID: "670b3e5c002a068efb37",
    statsCollectionID: "670b4e8900041a288ace",
    lyricsCollectionID: "670bb288003d4ff118b3"
}

const {
    endpoint,
    platform,
    projectID,
    databaseID,
    userCollectionID,
    artistCollectionID,
    albumCollectionID,
    songCollectionID,
    resonanceCollectionID,
    statsCollectionID,
    lyricsCollectionID
} = config

const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setPlatform(platform)

const demoaccount_email = "demoaccount@demoaccount.com";
const demoaccount_password = "demoaccount";
const demoaccount_username = "DemoUser"

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const signInAsDemoUser = async () => {
    try{
        const session = await account.createEmailPasswordSession(
            demoaccount_email,
            demoaccount_password
        );
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try { 
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountID', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

// Function to check if there is an active session

export const checkActiveSession = async () => {
    try {
      const session = await account.getSession('current'); // Get the current session
      return session !== null; // Return true if there is an active session
    } catch (error) {
      // If there's an error (e.g., no active session), handle it appropriately
      if (error.code === 401) {
        return false; // No active session
      }
      throw error; // Re-throw other unexpected errors
    }
};

  
// Function to delete all sessions for the current user

export const deleteSessions = async () => {
  try {
    // Get the list of all sessions
    const sessions = await account.listSessions();

    // Delete each session
    await Promise.all(
      sessions.sessions.map(async (session) => {
        await account.deleteSession(session.$id);
      })
    );

    console.log('All sessions deleted successfully');
  } catch (error) {
    console.error('Error deleting sessions:', error.message);
    //throw error; // Re-throw the error for further handling
  }
};

export const getSong = async (songID) => {
  try {
    console.log("song requested: ", songID);
    const posts = await databases.listDocuments(
      databaseID,
      songCollectionID,
      [Query.equal('$id', songID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getArtist = async (artistID) => {
  try {
    console.log("artist requested: ", artistID);
    const posts = await databases.listDocuments(
      databaseID,
      artistCollectionID,
      [Query.equal('$id', artistID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getAlbum = async (albumID) => {
  try {
    const posts = await databases.listDocuments(
      databaseID,
      albumCollectionID,
      [Query.equal('$id', albumID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getResonance = async (resID) => {
  try {
    const posts = await databases.listDocuments(
      databaseID,
      resonanceCollectionID,
      [Query.equal('$id', resID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getStats = async (statsID) => {
  try {
    const posts = await databases.listDocuments(
      databaseID,
      statsCollectionID,
      [Query.equal('$id', statsID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getUser = async (userID) => {
  try {
    const posts = await databases.listDocuments(
      databaseID,
      userCollectionID,
      [Query.equal('$id', userID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const getTopResonance = async () => {
  const data = [
    '670b27e8001afdb5ca07',
    '670b2804001ce6f37aca',
    '670b284f000f6e7a241f'
  ]

  await new Promise(r => setTimeout(r, 400));

  return data;
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error)
  }
}

export const getStatsBasic = async (statsID) => {
  try {
    const stats = await getStats(statsID);
    const topSong = await getSong(stats.top_song_today);
    const topArtist = await getArtist(stats.top_artist_today);

    return { stats, topSong, topArtist };
  } catch (error) {
    throw new Error(error);
  }
}

export const getLyrics = async (lyricsID) => {
  try {
    const posts = await databases.listDocuments(
      databaseID,
      lyricsCollectionID,
      [Query.equal('$id', lyricsID)]
    )
    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  } 
}

export const getDailyDataStr = async (statsID) => {
    let ret = "";

    const stats = await getStats(statsID);

    ret += "today, the user listened to {" + stats.streams_today + "} songs. about {" + stats.minutes_today + "} minutes. ";

    ret += "the user has lisnened to {" + stats.albums_today + "} albums today, and {" + stats.artists_today + "} different artists. ";

    ret += "the two songs the user listened to the most today were: "
    console.log("song IDs: ", stats.top_songs_today)
    for (let index = 0; index < stats.top_songs_today.length; ++index) {
      const songID = stats.top_songs_today[index];
      console.log("song ID: ", songID)
      const song_obj = await getSong(songID);
      const lyrics_obj = await getLyrics(song_obj.lyrics)

      ret += "name: {" + song_obj.name + "} lyrics: {" + lyrics_obj.lyrics_string + "}. and "
    }

    ret += " the two artists the user listened to the most today were: "
    for (let index = 0; index < stats.top_artists_today.length; ++index) {
      const artistID = stats.top_artists_today[index];
      const artist_obj = await getArtist(artistID);
      ret += "{" + artist_obj.name + "} and "
    }

    ret += "that is all. please give a daily 'resoanance'/review of this users daily listening habits in the format previously specified";
    
    //console.log("[QUERY]", ret);
    return ret;
}

export const getTotalDataStr = async (statsID) => {
  let ret = "";

  const stats = await getStats(statsID);

  ret += "overall, the user has listened to {" + stats.streams_total + "} songs. about {" + stats.minutes_total + "} total minutes. ";

  ret += "the user has lisnened to {" + stats.albums_total + "} albums overall, and {" + stats.artists_total + "} different artists. ";

  ret += "the two songs the user listened to the most overall were: "
  console.log("song IDs: ", stats.top_songs_total)
  for (let index = 0; index < stats.top_songs_total.length; ++index) {
    const songID = stats.top_songs_total[index];
    console.log("song ID: ", songID)
    const song_obj = await getSong(songID);
    const lyrics_obj = await getLyrics(song_obj.lyrics)

    ret += "name: {" + song_obj.name + "} lyrics: {" + lyrics_obj.lyrics_string + "}. and "
  }

  ret += " the two artists the user listened to the most overall were: "
  for (let index = 0; index < stats.top_artists_total.length; ++index) {
    const artistID = stats.top_artists_total[index];
    const artist_obj = await getArtist(artistID);
    ret += "{" + artist_obj.name + "} and "
  }

  ret += "that is all. please give an overall 'resoanance'/review of this users daily listening habits in the format previously specified";
  
  //console.log("[QUERY]", ret);
  return ret;
}