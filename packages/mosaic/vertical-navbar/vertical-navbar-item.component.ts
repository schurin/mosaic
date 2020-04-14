import { FocusMonitor } from '@angular/cdk/a11y';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    Directive,
    ElementRef,
    OnDestroy,
    Optional,
    Self
} from '@angular/core';
import { CanDisable, mixinDisabled, CanDisableCtor, mixinTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';


@Directive({
    selector: 'mc-vertical-navbar-item-icon',
    host: {
        class: 'mc-vertical-navbar__item-icon'
    }
})
export class McVerticalNavbarItemIcon {}


@Component({
    selector: 'mc-vertical-navbar-badge',
    template: `
        <span class="mc-badge mc-badge_light">
            <ng-content></ng-content>
        </span>
    `,
    host: {
        class: 'mc-vertical-navbar__badge'
    }
})
export class McVerticalNavbarItemBadge {}


class McVerticalNavbarItemBase {
    // tslint:disable-next-line:naming-convention
    constructor(public _elementRef: ElementRef) {}
}

// tslint:disable-next-line:naming-convention
export const McVerticalNavbarMixinBase: HasTabIndexCtor & CanDisableCtor & typeof McVerticalNavbarItemBase
    = mixinTabIndex(mixinDisabled(McVerticalNavbarItemBase), 0);


@Component({
    selector: 'a[mc-vertical-navbar-item], mc-vertical-navbar-item',
    templateUrl: './vertical-navbar-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./vertical-navbar-item.component.scss'],
    inputs: ['disabled', 'tabIndex'],
    host: {
        class: 'mc-vertical-navbar-item',
        '[attr.disabled]': 'disabled || null',
        '[attr.tabindex]': 'tabIndex'
    }
})
export class McVerticalNavbarItem extends McVerticalNavbarMixinBase implements CanDisable, OnDestroy {
    get hasDropdownAttached() {
        return !!this.trigger;
    }

    constructor(
        private element: ElementRef,
        private focusMonitor: FocusMonitor,
        @Optional() @Self() private trigger: McDropdownTrigger
    ) {
        super(element);

        this.focusMonitor.monitor(this.element.nativeElement).subscribe();
    }

    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
    }
}
