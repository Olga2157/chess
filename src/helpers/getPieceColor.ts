export const getPieceColor = (piece: string) => {
  let pieceParts = piece.split("-");
  return pieceParts[0];
}