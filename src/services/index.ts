import { URL } from '../constants'

const getData = (ang) => {
  let lines: Array<string> = [],
    allLines: string = '',
    shabads: Array<string> = [],
    shabads_new : Array<string> = [];

  return fetch(URL + ang + '/G')
    .then(response => response.json())
    .then(json => {
      for (let i = 0; i < json.page.length; i++) {
        lines.push(json.page[i].verse.unicode);
      }
      allLines = lines.join(' ');
      shabads = allLines.split(' ');

      for (let i = 0; i < shabads.length; i++) {
        shabads_new.push(shabads[i]);
      }
      return shabads_new;
    })
    .catch(error => console.error(error));
};

export const appService = {
  getData,
};
