import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private apiKey = 'AIzaSyBcBju9cc0sn_2QhMp32NxzXosKssKTjKE';
  private spreadsheetId = '1muugcW0Tq5QWTahQSTFWAmApHf7G0HD0wOX5lh_hf5k';
  private range = 'Sheet1!B:B';

  constructor(private http: HttpClient) {}

  checkUserExists(userId: string) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
    return this.http.get(url);
  }
}
