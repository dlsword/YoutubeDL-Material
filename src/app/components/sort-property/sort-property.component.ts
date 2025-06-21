import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Sort } from 'api-types';

@Component({
  selector: 'app-sort-property',
  templateUrl: './sort-property.component.html',
  styleUrls: ['./sort-property.component.scss']
})
export class SortPropertyComponent {
  sortProperties = {
    'registered': {
      'key': 'registered',
      'label': $localize`Download Date`
    },
    'upload_date': {
      'key': 'upload_date',
      'label': $localize`Upload Date`
    },
    'title': {
      'key': 'title',
      'label': $localize`Name`
    },
    'size': {
      'key': 'size',
      'label': $localize`File Size`
    },
    'duration': {
      'key': 'duration',
      'label': $localize`Duration`
    },
    'random': {
      'key': 'random',
      'label': $localize`Random`
    }
  };

  @Input() sortProperty = 'registered';
  @Input() descendingMode = true;

  @Output() sortPropertyChange = new EventEmitter<string>();
  @Output() descendingModeChange = new EventEmitter<boolean>();
  @Output() sortOptionChanged = new EventEmitter<Sort>();

  toggleModeChange(): void {
    this.descendingMode = !this.descendingMode;
    this.emitSortOptionChanged();
  }

  emitSortOptionChanged(): void {
    if (!this.sortProperty || !this.sortProperties[this.sortProperty]) {
      return;
    }

    // 对于随机排序，使用特殊的排序参数
    if (this.sortProperty === 'random') {
      this.sortOptionChanged.emit({
        by: 'random',
        order: 0  // 随机排序不需要方向
      });
    } else {
      this.sortOptionChanged.emit({
        by: this.sortProperty,
        order: this.descendingMode ? -1 : 1
      });
    }
  }
}
