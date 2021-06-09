import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ProvidersService } from '../providers.service';
import { ProviderType } from '../provider-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wh-provider',
  templateUrl: './provider.component.html',
})
export class ProviderComponent implements OnInit, OnDestroy {
  providers: MenuItem[];
  selectedProvider: string;
  isProviderFormVisible = false;
  isProviderSelectorVisible = false;
  subscription: Subscription;

  constructor(public providersService: ProvidersService) { }

  ngOnInit(): void {
    this.providers = [
      {
        icon: 'pi pi-angle-right',
        label: ProviderType.AzureDevOps.toLocaleUpperCase(),
        command: () => this.showDialog(ProviderType.AzureDevOps),
      },

      {
        icon: 'pi pi-angle-right',
        label: ProviderType.GitLab.toLocaleUpperCase(),
        command: () => this.showDialog(ProviderType.GitLab),
      },
      {
        icon: 'pi pi-angle-right',
        label: ProviderType.GitHub.toLocaleUpperCase(),
        command: () => this.showDialog(ProviderType.GitHub),
      },
    ];

    this.subscription = this.providersService.formClosed$.subscribe(providersForm => {
      providersForm.reset();
      this.isProviderFormVisible = false;
    });
  }

  showDialog(providerName: string) {
    this.isProviderFormVisible = true;
    this.selectedProvider = providerName;
    this.isProviderSelectorVisible = false;
  }

  openProviderSelector() {
    this.isProviderSelectorVisible = true;
    this.isProviderFormVisible = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
