import { TestBed } from '@angular/core/testing';

import { ChessPieceService } from './chess-piece.service';

describe('ChessPieceService', () => {
  let service: ChessPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
