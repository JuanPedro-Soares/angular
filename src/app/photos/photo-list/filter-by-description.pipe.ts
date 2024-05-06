import { Pipe, PipeTransform } from '@angular/core';
import { Photos } from 'src/app/photo.interface';

@Pipe({name: 'filterbyDescription'})
export class FilterByDescription implements PipeTransform{
  transform(photos:Photos[],descriptionQuery:string) {
    
    descriptionQuery=descriptionQuery.trim().toLowerCase()

    if(descriptionQuery){
      return photos.filter(photo=>
       photo.descricao
      .toLowerCase()
      .includes(descriptionQuery))
    }
    else{
      return photos;
    }
  }

}