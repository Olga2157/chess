export const getPieceName = (piece: string) => {
  let pieceParts = piece.split("-");
  return pieceParts[1];
}