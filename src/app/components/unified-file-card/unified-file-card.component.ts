import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoInfoDialogComponent } from 'app/dialogs/video-info-dialog/video-info-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { registerLocaleData } from '@angular/common';
import localeGB from '@angular/common/locales/en-GB';
import localeFR from '@angular/common/locales/fr';
import localeES from '@angular/common/locales/es';
import localeDE from '@angular/common/locales/de';
import localeZH from '@angular/common/locales/zh';
import localeNB from '@angular/common/locales/nb';
import { DatabaseFile } from 'api-types';
import { PostsService } from 'app/posts.services';
import { FileType } from 'api-types';

registerLocaleData(localeGB);
registerLocaleData(localeFR);
registerLocaleData(localeES);
registerLocaleData(localeDE);
registerLocaleData(localeZH);
registerLocaleData(localeNB);

@Component({
  selector: 'app-unified-file-card',
  templateUrl: './unified-file-card.component.html',
  styleUrls: ['./unified-file-card.component.scss']
})
export class UnifiedFileCardComponent implements OnInit {

  // required info
  file_title = '';
  file_length = '';
  file_thumbnail = '';
  type = null;
  elevated = false;

  // optional vars
  thumbnailBlobURL = null;

  streamURL = null;
  hide_image = false;

  // input/output
  @Input() loading = true;
  @Input() theme = null;
  @Input() file_obj = null;
  @Input() card_size = 'medium';
  @Input() use_youtubedl_archive = false;
  @Input() is_playlist = false;
  @Input() index: number;
  @Input() locale = null;
  @Input() baseStreamPath = null;
  @Input() jwtString = null;
  @Input() availablePlaylists = null;
  @Output() goToFile = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<DatabaseFile>();
  @Output() goToSubscription = new EventEmitter<any>();
  @Output() deleteFile = new EventEmitter<any>();
  @Output() addFileToPlaylist = new EventEmitter<any>();
  @Output() editPlaylist = new EventEmitter<any>();
  @Output() cloneFile = new EventEmitter<DatabaseFile>();


  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  /*
    Planned sizes:
    small: 150x175
    medium: 200x200
    big: 250x200
  */

  constructor(private dialog: MatDialog, private postsService: PostsService) { }

  ngOnInit(): void {
    if (!this.loading) {
      this.file_length = fancyTimeFormat(this.file_obj.duration);
    }

    if (this.file_obj && this.file_obj.thumbnailPath) {
      this.thumbnailBlobURL = `${this.baseStreamPath}thumbnail/${encodeURIComponent(this.file_obj.thumbnailPath)}?jwt=${this.jwtString}`;
    }

    if (this.file_obj) this.streamURL = this.generateStreamURL();
  }

  emitDeleteFile(blacklistMode = false) {
    this.deleteFile.emit({
      file: this.file_obj,
      index: this.index,
      blacklistMode: blacklistMode
    });
  }

  emitAddFileToPlaylist(playlist_id) {
    this.addFileToPlaylist.emit({
      file: this.file_obj,
      playlist_id: playlist_id
    });
  }

  navigateToFile(event) {
    this.goToFile.emit({file: this.file_obj, event: event});
  }

  navigateToSubscription() {
    this.goToSubscription.emit(this.file_obj);
  }

  openFileInfoDialog() {
    const dialogRef = this.dialog.open(VideoInfoDialogComponent, {
      data: {
        file: this.file_obj,
      },
      minWidth: '50vw'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.file_obj = dialogRef.componentInstance.file;
    });
  }

  emitEditPlaylist() {
    this.editPlaylist.emit({
      playlist: this.file_obj,
      index: this.index
    });
  }

  // 克隆视频文件
  cloneVideoFile() {
    if (!this.file_obj) {
      this.postsService.openSnackBar('无法克隆：文件信息不存在', '关闭');
      return;
    }

    // 创建克隆文件对象
    const clonedFile = {
      ...this.file_obj,
      uid: this.generateNewUID(),
      title: `${this.file_obj.title} (克隆)`,
      registered: new Date().toISOString(),
      local_view_count: 0,
      favorite: false,
      auto: false,
      sub_id: null // 克隆文件不属于任何订阅
    };

    // 移除一些不应该克隆的字段
    delete clonedFile._id;
    delete clonedFile.id;

    // 发送克隆事件
    this.cloneFile.emit(clonedFile);

    this.postsService.openSnackBar('视频文件已克隆！', '关闭');
  }

  // 生成新的UID
  private generateNewUID(): string {
    return 'cloned_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // 重新下载文件
  redownloadFile() {
    if (!this.file_obj || !this.file_obj.url) {
      this.postsService.openSnackBar('无法重新下载：文件URL不存在', '关闭');
      return;
    }

    // 验证URL格式
    try {
      new URL(this.file_obj.url);
    } catch (e) {
      this.postsService.openSnackBar('无法重新下载：URL格式无效', '关闭');
      return;
    }

    // 确定文件类型
    const fileType: FileType = this.file_obj.isAudio ? FileType.AUDIO : FileType.VIDEO;

    // 显示开始下载的消息
    this.postsService.openSnackBar(`正在添加重新下载任务: ${this.file_obj.title}`, '关闭');

    // 使用默认质量设置重新下载
    this.postsService.downloadFile(
      this.file_obj.url,
      fileType,
      '', // 默认质量
      '', // 自定义质量配置
      null, // 自定义参数
      null, // 额外参数
      null, // 自定义输出
      null, // YouTube用户名
      null, // YouTube密码
      null  // 裁剪设置
    ).subscribe(
      (response) => {
        if (response.download) {
          this.postsService.openSnackBar(`✅ 重新下载已添加到队列: ${this.file_obj.title}`, '关闭');
        } else {
          this.postsService.openSnackBar('❌ 重新下载失败：服务器返回空响应', '关闭');
        }
      },
      (error) => {
        console.error('重新下载错误:', error);
        let errorMessage = '重新下载失败，请检查网络连接';

        // 根据错误类型提供更具体的消息
        if (error.status === 400) {
          errorMessage = '重新下载失败：请求参数错误';
        } else if (error.status === 403) {
          errorMessage = '重新下载失败：权限不足';
        } else if (error.status === 500) {
          errorMessage = '重新下载失败：服务器内部错误';
        }

        this.postsService.openSnackBar(`❌ ${errorMessage}`, '关闭');
      }
    );
  }

  onRightClick(event) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': {id: 1, name: 'hi'} };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  generateStreamURL() {
    const baseLocation = 'stream/';
    let fullLocation = this.baseStreamPath + baseLocation + `?test=test&uid=${this.file_obj['uid']}`;
    if (this.jwtString) {
      fullLocation += `&jwt=${this.jwtString}`;
    }

    fullLocation += '&t=,10';

    return fullLocation;
  }

  onMouseOver() {
    this.elevated = true;
    setTimeout(() => {
      if (this.elevated) {
        this.hide_image = true;
      }
    }, 500);
  }

  onMouseOut() {
    this.elevated = false;
    this.hide_image = false;
  }

  emitToggleFavorite() {
    this.toggleFavorite.emit(this.file_obj);
  }

}

function fancyTimeFormat(time) {
  if (typeof time === 'string') {
    return time;
  }
  // Hours, minutes and seconds
  const hrs = ~~(time / 3600);
  const mins = ~~((time % 3600) / 60);
  const secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}
