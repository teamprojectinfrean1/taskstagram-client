const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "history",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H1", "H2", "Blockquote"],
  },
  fontSize: {},
  fontFamily: {},
  list: { inDropdown: true, options: ["unordered", "ordered"] },
  textAlign: { inDropdown: false, options: ["left", "center", "right"] },
  history: { inDropdown: false, options: ["undo", "redo"] },
};

export default toolbarOptions;
