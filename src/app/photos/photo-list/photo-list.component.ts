import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photos } from 'src/app/photo.interface';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: Photos[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>
  hasMore:boolean = true;
  currentPage: number = 1;
  userName:string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService:PhotoService
  ) {}
  
  onKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.debounce.next(target.value);
    }
  }
  
  ngOnInit(): void {
    this.userName=this.activatedRoute.snapshot.params['userName']
    this.photos=this.activatedRoute.snapshot.data['photos'];
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter=> this.filter = filter)
  }
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load(){
    this.photoService.listFromUserPaginated(this.userName,++this.currentPage).subscribe(photos=>{
      this.photos = this.photos.concat(photos);
      this.photos.push(...photos);
      if(!photos.length)this.hasMore=false
    })
  }
}
