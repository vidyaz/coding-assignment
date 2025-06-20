import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChessPieceService {
  private validPieces = ['pawn', 'king', 'queen'];
  private validColumns = 'ABCDEFGH';
  private validRows = '12345678';

  getPossibleMoves(pieceType: string, position: string): string[] {
    pieceType = pieceType.toLowerCase();
    position = position.toUpperCase();
    this.validateInput(pieceType, position);
    const col = position[0];
    const row = parseInt(position[1], 10);
    const moves: string[] = [];

    switch (pieceType) {
      case 'pawn':
        this.generatePawnMoves(col, row, moves);
        break;
      case 'king':
        this.generateKingMoves(col, row, moves);
        break;
      case 'queen':
        this.generateQueenMoves(col, row, moves);
        break;
    }

    return this.sortMoves(moves);
  }

  private validateInput(pieceType: string, position: string): void {
    if (!this.validPieces.includes(pieceType)) {
      throw new Error("Invalid piece type. Must be 'pawn', 'king', or 'queen'");
    }

    if (!this.isValidPosition(position)) {
      throw new Error('Invalid position. Must be in format A1-H8');
    }
  }

  private isValidPosition(position: string): boolean {
    if (position.length !== 2) return false;
    const col = position[0];
    const row = position[1];
    return this.validColumns.includes(col) && this.validRows.includes(row);
  }

  private generatePawnMoves(col: string, row: number, moves: string[]): void {
    const newRow = row + 1;
    if (newRow <= 8) moves.push(`${col}${newRow}`);
  }

  private generateKingMoves(col: string, row: number, moves: string[]): void {
    for (let dc = -1; dc <= 1; dc++) {
      for (let dr = -1; dr <= 1; dr++) {
        if (dc === 0 && dr === 0) continue;
        const newCol = String.fromCharCode(col.charCodeAt(0) + dc);
        const newRow = row + dr;
        if (this.isValidPosition(`${newCol}${newRow}`)) {
          moves.push(`${newCol}${newRow}`);
        }
      }
    }
  }

  private generateQueenMoves(col: string, row: number, moves: string[]): void {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0], // vertical/horizontal
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1], // diagonal
    ];

    directions.forEach(([dc, dr]) => {
      let newCol = col;
      let newRow = row;
      while (true) {
        newCol = String.fromCharCode(newCol.charCodeAt(0) + dc);
        newRow += dr;
        const newPos = `${newCol}${newRow}`;
        if (this.isValidPosition(newPos)) {
          moves.push(newPos);
        } else {
          break;
        }
      }
    });
  }

  private sortMoves(moves: string[]): string[] {
    return moves.sort((a, b) => {
      if (a[1] === b[1]) return a[0].localeCompare(b[0]);
      return parseInt(b[1], 10) - parseInt(a[1], 10); // Sort rows descending
    });
  }
}
