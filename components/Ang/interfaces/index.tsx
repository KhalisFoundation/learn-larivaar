export interface AngProps {
  page: number;
  larivaarAssist: boolean;
}

export interface AngData {
  source: {
    sourceId: string;
    gurmukhi: string;
    unicode: string;
    english: string;
    pageNo: number;
  };
  count: number;
  navigation: {
    previous: number;
    next: number;
  };
  page: Array<Page>;
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
