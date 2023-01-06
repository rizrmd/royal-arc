export const extractTextAlign = (value?: string) => {
  if (!value) return undefined;

  return css`
    ${value &&
    css`
      .text_ltr {
        text-align: ${value};
      }
    `}
  `;
};
