import { Component, OnInit } from '@angular/core';
import { ChessPieceService } from './chess-piece.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  pieceTypes = ['Pawn', 'King', 'Queen'];
  selectedPiece = 'Queen';
  position = 'D4';
  possibleMoves: string[] = [];
  errorMessage = '';

  constructor(private chessPieceService: ChessPieceService) {}
  ngOnInit() {
    this.calculateMoves();
  }

  calculateMoves() {
    this.errorMessage = '';
    try {
      this.possibleMoves = this.chessPieceService.getPossibleMoves(
        this.selectedPiece, // ['Pawn', 'King', 'Queen']
        this.position
      );
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      this.possibleMoves = [];
    }
  }
}
