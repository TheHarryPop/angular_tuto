import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [
    FormsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  userEmail!: string;
  // Pour montrer la liaison double sens, on peut utiliser la ligne ci-dessous. 'youyou' sera affiché dans le champ au chargement de la page
  // userEmail: string ='youyou';

  constructor(private router: Router) {
  }

  onContinue(): void {
   void this.router.navigateByUrl("facesnaps");
  }

  // La méthode ci-dessous ne fonctionne qu'avec le retour d'une seule valeur (voir premier formulaire de landing-page.component.html)
  // onSubmitForm(): void {
  //   console.log(this.userEmail);
  // }

  // La méthode ci-dessous capte la totalité des infos retournées par le formulaire (voir deuxième formulaire de landing-page.component.html)
  onSubmitForm(form: NgForm): void {
    console.log(form.value);
  }

}
