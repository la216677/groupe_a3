import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent {

  isOpened: boolean = false;
  
  toggleProfileDropdown() : void {
    this.isOpened = !this.isOpened;
  }

  clickOutside() : void {
    this.isOpened = false;
  }
}
export { Component };

