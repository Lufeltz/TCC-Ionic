import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    redirectTo: 'homepage/feed',
    pathMatch: 'full',
  },
  {
    path: 'pref-notif',
    redirectTo: 'homepage/pref-notif',
    pathMatch: 'full',
  },
  {
    path: 'privacidade',
    redirectTo: 'homepage/privacidade',
    pathMatch: 'full',
  },
  {
    path: 'perfil-usuario',
    redirectTo: 'homepage/perfil-usuario',
    pathMatch: 'full',
  },
  {
    path: 'perfil-outro-usuario',
    redirectTo: 'homepage/perfil-outro-usuario',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./auth/cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'homepage',
    loadComponent: () =>
      import('./pages/homepage/homepage.page').then((m) => m.HomepagePage),
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('./pages/feed/feed.page').then((m) => m.FeedPage),
      },
      {
        path: 'modalidades',
        loadComponent: () =>
          import('./pages/modalidades/modalidades.page').then(
            (m) => m.ModalidadesPage
          ),
      },
      {
        path: 'campeonatos',
        loadComponent: () =>
          import('./pages/campeonatos/campeonatos.page').then(
            (m) => m.CampeonatosPage
          ),
      },
      {
        path: 'metas',
        loadComponent: () =>
          import('./pages/metas/metas.page').then((m) => m.MetasPage),
      },
      {
        path: 'pref-notif',
        loadComponent: () =>
          import('./pages/pref-notif/pref-notif.page').then(
            (m) => m.PrefNotifPage
          ),
      },
      {
        path: 'privacidade',
        loadComponent: () =>
          import('./pages/privacidade/privacidade.page').then(
            (m) => m.PrivacidadePage
          ),
      },
      {
        path: 'perfil-usuario',
        loadComponent: () =>
          import('./pages/perfil-usuario/perfil-usuario.page').then(
            (m) => m.PerfilUsuarioPage
          ),
      },
      {
        path: 'perfil-outro-usuario',
        loadComponent: () =>
          import('./pages/perfil-outro-usuario/perfil-outro-usuario.page').then(
            (m) => m.PerfilOutroUsuarioPage
          ),
      },
    ],
  },
];
