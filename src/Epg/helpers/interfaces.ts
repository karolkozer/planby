export interface Program {
  channelUuid: string;
  id: string;
  title: string;
  description: string;
  since: string | number | Date;
  till: string | number | Date;
  image: string;
}

export interface Channel {
  uuid: string;
  logo: string;
}

export interface Theme {
  primary: {
    600: string;
    900: string;
  };
  grey: { 300: string };
  white: string;
  green: { 300: string };
  scrollbar: {
    border: string;
    thumb: {
      bg: string;
    };
  };
  gradient: {
    blue: {
      300: string;
      600: string;
      900: string;
    };
  };

  text: {
    grey: {
      300: string;
      500: string;
    };
  };
  timeline: {
    divider: {
      bg: string;
    };
  };
}
