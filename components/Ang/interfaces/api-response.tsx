export interface AngProps {
  page: number;
}

export interface AngsData {
  FirstLetterEng: string;
  FirstLetterLen: number;
  FirstLetterStr: string;
  Gurmukhi: string;
  ID: number;
  LineNo: number;
  MainLetters: string;
  PageNo: number;
  Raag: [Object];
  Shabads: Array<Page>;
  Source: [Object];
  Translations: string;
  Writer: [Object];
}

interface Page {
  verseId: number;
  shabadId: number;
  verse: {
    gurmukhi: string;
    unicode: string;
  };
  larivaar: {
    gurmukhi: string;
    unicode: string;
  };
  transliteration: {
    english: string;
    hindi: string;
    en: string;
    hi: string;
    ipa: string;
    ur: string;
  };
  translation: {
    en: {
      ssk: string;
      bdb: string;
      ms: string;
    };
    es: {
      sn: string;
    };
    pu: {
      ss: {
        gurmukhi: string;
        unicode: string;
      };
      ft: {
        gurmukhi: string;
        unicode: string;
      };
      bdb: {
        gurmukhi: string;
        unicode: string;
      };
      ms: {
        gurmukhi: string;
        unicode: string;
      };
    };
    hi: {
      ss: string;
      sts: string;
    };
  };
  pageNo: number;
  lineNo: number;
  updated: string;
  visraam: Object;
  writer: Object;
  raag: Object;
}
