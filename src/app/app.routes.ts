import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { AddTaskComponent } from './content-container/add-task/add-task.component';
import { BoardComponent } from './content-container/board/board.component';
import { ContactsComponent } from './content-container/contacts/contacts.component';
import { HelpSiteComponent } from './content-container/help-site/help-site.component';
import { PrivacyPolicyComponent } from './content-container/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './content-container/legal-notice/legal-notice.component';
import { SummaryComponent } from './content-container/summary/summary.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'main', component: MainContentComponent, children: [
            { path: 'add-task', component: AddTaskComponent },
            { path: 'board', component: BoardComponent },
            { path: 'contacts', component: ContactsComponent },
            { path: 'help', component: HelpSiteComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'legal-notice', component: LegalNoticeComponent },
            { path: 'summary', component: SummaryComponent },
            { path: '', redirectTo: 'summary', pathMatch: 'full' }
        ]
    },


];
