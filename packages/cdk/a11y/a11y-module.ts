import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';

import { CdkMonitorFocus, FOCUS_MONITOR_PROVIDER } from './focus-monitor/focus-monitor';


@NgModule({
  imports: [PlatformModule],
  declarations: [CdkMonitorFocus],
  exports: [CdkMonitorFocus],
  providers: [
    FOCUS_MONITOR_PROVIDER
  ]
})
export class A11yModule {}
