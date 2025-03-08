import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NameConvertPipe } from '../../pipes/name-convert.pipe';
import { ApiService } from '../../services/api-service.service';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import moment from 'moment-timezone';

interface ImageData {
  name: string;
  path: string;
}

interface IRequestData {
  userId: string;
  time: string;
  votedImages: String[];
}

@Component({
  selector: 'app-vote-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NameConvertPipe],
  providers: [ApiService, GoogleSheetsService],
  templateUrl: './vote-page.component.html',
  styleUrl: './vote-page.component.scss',
})
export class VotePageComponent {
  userId: string = '';
  userExists: boolean = false;
  request!: IRequestData;
  images: ImageData[] = [];
  isModalOpen: boolean = false;
  selectedImage: string = '';

  votedImages: String[] = [];
  telegram = inject(TelegramService);

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private googleSheetsService: GoogleSheetsService
  ) {
    this.telegram.ready();
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {
    this.googleSheetsService
      .checkUserExists(this.userId)
      .subscribe((data: any) => {
        const values = data.values;
        this.userExists = values && values.flat().includes(this.userId);
        this.http
          .get<ImageData[]>('assets/data/dataImage.json')
          .subscribe((data) => {
            this.images = data;
          });
      });
  }

  votedImagesAdd(str: String) {
    this.votedImages.push(str);
  }

  toggleVote(imageName: string) {
    const index = this.votedImages.indexOf(imageName);
    if (index === -1) {
      this.votedImages.push(imageName);
    } else {
      this.votedImages.splice(index, 1);
    }
  }

  isVoted(imageName: string): boolean {
    return this.votedImages.includes(imageName);
  }

  sendData(): void {
    const currentDate = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = moment(currentDate).tz(timeZone).format();
    this.request = {
      userId: this.userId,
      time: formattedDate.slice(0, -6),
      votedImages: this.votedImages,
    };
    this.apiService.postData(this.request).subscribe((res) => {
      console.log(res);
    });
    this.userExists = true;
  }

  openModal(imagePath: string): void {
    this.selectedImage = imagePath;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
