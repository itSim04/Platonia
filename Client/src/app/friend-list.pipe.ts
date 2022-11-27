import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendList'
})
export class FriendListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
