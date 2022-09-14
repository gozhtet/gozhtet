export type Theme = {
  name: string;
  type: 'light' | 'dark';
  colors: {
    primary: string;
    border: string;
    panel: string;
    overlay: string;
    background: string;
    text: string;
    title: string;
    subtitle: string;
    red: string;
  };
  vars: {
    borderRadius: number;
    shadow: string;
    transition: string;
  };
};
