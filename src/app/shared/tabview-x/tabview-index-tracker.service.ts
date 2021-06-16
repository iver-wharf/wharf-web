import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TabviewIndexTrackerService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly FIRST_TAB = 0;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly DEFAULT_QUERY_PARAM_KEY = 'tab';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  /**
   * Get the tabindex from the queryParams. if not found return index 0.
   *
   * @param paramKey defaults to 'tab'.
   */
  public getTabIndexFromQueryParams(paramKey = this.DEFAULT_QUERY_PARAM_KEY): number {
    return +this.route.snapshot.queryParamMap.get(paramKey) || this.FIRST_TAB;
  }

  /**
   * Updates the current set location with the tab index that has been requested.
   *
   * @param index the tab index requested.
   */
  public updateQueryParamsWithTabIndex(index: number, paramKey = this.DEFAULT_QUERY_PARAM_KEY): void {
    const queryParams = {};
    queryParams[paramKey] = index;
    const urlTree = this.router.createUrlTree(
      [],
      {
        queryParams,
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      },
    );
    this.location.replaceState(urlTree.toString());
  }
}
