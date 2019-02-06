export const UPDATE_CURRENT_ANG = 'UPDATE_CURRENT_ANG';
export const ADD_ANG_TO_CACHE = 'ADD_ANG_TO_CACHE';
const receiveAng = (ang, source, verses) => ({
  type: ADD_ANG_TO_CACHE,
  ang,
  source,
  verses,
});

export const fetchAngAction = (ang, source) => async (dispatch) => {
  const response = await fetch(`https://api.banidb.com/v2/angs/${ang}/${source}`);
  const json = await response.json();
  const verses = json.page.map(verse => ({
    ID: verse.verseId,
    ShabadID: verse.shabadId,
    verse: verse.verse.unicode,
  }));
  dispatch(receiveAng(ang, source, verses));
};
